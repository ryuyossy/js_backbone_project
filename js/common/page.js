define([
	'common/popup',
	'common/tab',
	'common/list',
	'common/counter',
	'common/form',
	'common/error',
	'common/timer',
	'common/short_tutorial',
	'common/animation',
	'zepto',
	'lodash',
	'backbone',
	'backbone-helper',
	'backbone-super',
	'jsrender',
	'jsrender.helpers',
	'underscore.deferred'
], function(
	PopupClass,
	TabClass,
	ListClass,
	CounterClass,
	FormClass,
	ErrorClass,
	TimerClass,
	ShortTutorialClass,
	AnimationClass,
	$,
	_,
	Backbone
){
	var isLocal = !(/braveguardian\.jp$/.test(location.host));
	var Page, Popups, Tabs, Counter, Form, Button, Timer, Animation, ShortTutorial;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on({
				'change:page_template' : function(){
					self.checkAppVersion();
					self.setPageStyle();
					self.checkTutorial();
				},
				'proveNoTutorial' : function(){
					self.setImgUrlRoot();
					self.makeHeader();
					self.makeHTML();
				},
				'provePOST' : function(){
					self.replaceFormData();
					self.removeFormData();
				},
				'proveUnequalFormTarget' : self.removeFormData,
				'proveDeficientFormData' : self.removeFormData
			});
			self.trigger('initialize');
		},
		checkAppVersion : function(){
			var self = this;
			var type = self.get('ajax_type');
			if (type === 'POST' || type === 'post') return;
			var data = self.get('page_data');
			if(!data) return;
			var currentAppVersion = data.app_version;
			var oldAppVersion = RS.get('app_version', false);
			if (oldAppVersion === currentAppVersion || currentAppVersion === undefined) return;
			RS.put({
				app_version : currentAppVersion
			}, false);
			if (oldAppVersion === undefined) return;
			window.location.reload(true);
		},
		checkTutorial : function(){
			var self = this;
			var page_data = self.get('page_data');
			if( !self.has('data_path') || !page_data ){
				self.trigger('proveNoTutorial');
				return;
			}
			var tutorial_step = page_data.tutorial_step;
			var page_id = self.get('id');
			if(tutorial_step >= 0 && tutorial_step !== null && page_id!=='Tutorial'){
				self.set({
					'redirect_url' : 'tutorial/',
					'is_tutorial' : true
				});
			} else {
				self.trigger('proveNoTutorial');
			}
		},
		checkForm : function(){
			var self = this;
			var form_target = RS.get('form_target', false);
			var form_data = RS.get('form_data', false);
			var page_id = self.get('id');
			var is_target = (
				_.isString(form_target) &&
				form_target===page_id
			) || (
				_.isArray(form_target) &&
				_.find(form_target, function(t){return t===page_id;})
			);
			if( self.get('redirect_url') && !form_data ){
				self.trigger('proveNoFormData');
				return;
			}
			if( !is_target && form_target && form_data ){
				self.trigger('proveUnequalFormTarget');
			}
			if(
				(form_target && !form_data) ||
				(!form_target && form_data)
			){
				self.trigger('proveDeficientFormData');
			}
			self.trigger('checkForm');
		},
		checkPost : function(){
			var self = this;
			var ajax_type = self.get('ajax_type');
			if( ajax_type!=='POST' && ajax_type!=='post' ) return;
			self.trigger('provePOST');
		},
		replaceFormData : function(){
			this.set({
				'form_target' : RS.get('form_target', false),
				'form_data' : RS.get('form_data', false)
			});
		},
		removeFormData : function(){
			RS.remove('form_target', false);
			RS.remove('form_data', false);
		},
		setDummyFormData : function(form_target){
			if( !_.isArray(form_target) && !_.isString(form_target) ){
				throw new Error('"form_target" is not Array or String.');
			}
			RS.put({
				'form_target' : form_target,
				'form_data' : {
					'timestamp' : new Date/1000|0
				}
			}, false);
		},
		loadFirst : function(){
			var self = this;
			var deferred = isLocal ? _.when(
				// ローカルでは共通ヘッダを別JSONから読み込む
				self.loadPageData(),
				self.loadPageTemplate(),
				self.loadPageStyles(),
				self.loadCommonData()
			) : _.when(
				// サーバーでは共通ヘッダを同APIから読み込む
				self.loadPageData(),
				self.loadPageTemplate(),
				self.loadPageStyles()
			);
			deferred.then(
				self.setLoadedData,
				self.setErrorData
			);
		},
		setLoadedData : function(data, template, styles, common){
			var self = this;
			self.unset('error');
			if( self.has('data_path') ){
				self.set('page_data', _.extend({}, data, common));
			}
			self.set({
				page_template : template,
				page_styles : styles
			});
		},
		setErrorData : function(data){
			var self = this;
			var status;
			var errors = [];
			var redirect_url;
			if( data.errors || data.redirect_url ){
				status = data.status;
				errors = data.errors;
				redirect_url = data.redirect_url;
			} else if( data.status===200 ){
				status = 'Bad JSON';
			} else {
				status = data.status;
			}
			self.trigger('catchError', {
				status : status,
				errors : errors,
				redirect_url : redirect_url,
				is_page_load : true
			}, true);
		},
		getDataPath : function(path){
			if(!isLocal) return path;
			return '/json' + path + '.json';
		},
		getRevisionNumber : function(path){
			path = '.' + path;
			return (_.has(rev, path)) ? rev[path] : null;
		},
		loadCommonData : function(){
			var self = this;
			var dfd = new _.Deferred();
			var data_path = self.get('data_path');
			if( !data_path ){
				_.defer(dfd.resolve);
				return dfd.promise();
			}
			$.ajax({
				dataType : 'json',
				url : '/json/common.json',
				success : function(json){
					if( json.status === 200 ){
						dfd.resolve(json);
					} else {
						dfd.reject(json);
					}
				},
				error : function(e){
					dfd.reject(e);
				}
			});
			return dfd.promise();
		},
		loadPageData : function(){
			var self = this;
			var dfd = new _.Deferred();
			var data_path = self.get('data_path');
			if( !data_path ){
				_.defer(dfd.resolve);
				return dfd.promise();
			}
			var query = self.get('query') || {};
			var form_data = RS.get('form_data', false) || {};
			var data = self.get('ajax_data') || {};
			var type = self.get('ajax_type') || 'GET';
			type = type.match(/^POST$/i) ? 'POST' : 'GET';
			_.each(query, function(v, k){
				if( v === undefined ) delete query[k];
			});
			_.each(form_data, function(v, k){
				if( _.isArray(v) ) form_data[k] = v.join(",");
			});
			var oldTime = Date.now();
			$.ajax({
				type : type,
				data : _.extend(
					{timestamp : new Date/1000|0},
					data,
					query,
					form_data
				),
				dataType : 'json',
				url : self.getDataPath(data_path),
				timeout : 55 * 1000,
				success : function(json){
					RS.remove('sent', false);
					self.set({'roundTripTime' : Date.now() - oldTime});
					if( json.status === 200 ){
						dfd.resolve(json);
					} else {
						dfd.reject(json);
					}
				},
				error : function(e){
					dfd.reject(e);
				}
			});
			return dfd.promise();
		},
		loadPageTemplate : function(){
			var self = this;
			var dfd = new _.Deferred();
			var path = self.get('template_path');
			$.ajax({
				dataType : 'html',
				url : path,
				data : {rev : self.getRevisionNumber(path)},
				timeout : 55 * 1000,
				success : function(template){
					dfd.resolve(template);
				},
				error : function(e){
					dfd.reject(e);
				}
			});
			return dfd.promise();
		},
		setPageStyle : function(){
			var self = this;
			var manifest = self.get('page_styles');
			$('head>style.page_style').remove();
			manifest.forEach(function(href){
				$('<style class="page_style">' + self.get(href) + '</style>').appendTo('head');
			});
		},
		loadPageStyles : function(){
			var self = this;
			var dfd = new _.Deferred();
			var page_style = self.get('style_path');
			var manifest = ['/css/common_parts.css'];

			if(_.isArray(page_style)){
				manifest = manifest.concat(page_style);
			}else{
				manifest.push(page_style);
			}
			var promises = manifest.map(function(path){return self.loadStyle(path)});

			_.when.apply(_, promises).then(
				function(){
					dfd.resolve(manifest);
				},
				function(e){
					dfd.reject(e);
				}
			);
			return dfd.promise();
		},
		loadStyle : function(href){
			var self = this;
			var dfd = new _.Deferred();

			$.ajax({
				dataType : 'text',
				url : href,
				data : {rev : self.getRevisionNumber(href)},
				timeout : 55 * 1000,
				success : function(style){
					self.set(href, style);
					dfd.resolve();
				},
				error : function(e){
					dfd.reject(e);
				}
			});
			return dfd.promise();
		},
		setImgUrlRoot : function(){
			var self = this;
			var page_data = self.get("page_data");
			if( !page_data ) return;
			RS.put({
				'img_url_root' : page_data.img_url_root
			}, false);
		},
		makeHTML : function(){
			var self = this;
			var has_$header = !!$("#jsTemplateHeader")[0];
			if(
				!has_$header ||
				self.has('page_html') ||
				!self.has('page_template') ||
				( self.has('data_path') && !self.has('page_data') )
			) return;
			var template = self.get("page_template");
			var data = _.extend(
				{
					'PAGEID' : self.get('id'),
					'query' : self.get('query')
				},
				self.get('page_data'),
				self.get('extended_page_data') || {}
			);
			var html = $.templates(template).render(data);
			self.set({page_html : html});
		},
		makeHeader : function(){
			var self = this;
			var template = $("#jsTemplateHeader").html();
			if(
				!template ||
				self.has('header_html') ||
				( self.has('data_path') && !self.has("page_data") )
			) return;
			var data = self.get("page_data") || {'status': null};
			var html = $.templates(template).render(data);
			self.set({header_html : html});
		},
		addPageData : function(extended_page_data){
			var self = this;
			var page_data = self.get("page_data");
			extended_page_data = _.extend({}, page_data, extended_page_data);
			self.set({extended_page_data : extended_page_data});
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			Page = self;
			self.on('initialize', self.instantiatePopup);
			self.on('initialize', self.bindCommonEvents);
			self.on('initialize', self.setUserAgent);
			self.trigger('initialize');
		},
		list : function(parameter){
			ListClass.View = ListClass.View.extend({
				tabs : Tabs
			});
			ListClass.Model = ListClass.Model.extend({
				page : Page
			});
			return new ListClass.View({
				el : parameter.el,
				model : new ListClass.Model(
					_.omit(parameter, 'el')
				)
			});
		},
		instantiatePopup : function(){
			var self = this;
			PopupClass.View = PopupClass.View.extend({
				page : self
			});
			Popups = new PopupClass.View({
				collection : new PopupClass.Collection()
			});
		},
		bindCommonEvents : function(){
			var self = this;
			self.off('becomeCurrent render openPopup closePopup, catchError');
			self.model.off('checkForm proveNoFormData change:page_html catchError');
			self.on({
				'becomeCurrent' : self.model.checkForm,
				'render' : function(){
					self.model.checkPost();
					self.openFirstPopup();
					self.instantiateTab();
					self.initializeCounter();
					self.initializeForm();
					self.initializeTimer();
					self.initializeShortTutorial();
					self.preloadImages();
					self.instantiateAnimation();
					self.instantiateComponents();
					self.resetFullScreen();
					self.bindEvents();
					self.initDeka();
					self.loadCamp();
				},
				'submitDummy' : self.model.setDummyFormData,
				'openPopup' : Popups.add,
				'closePopup' : Popups.remove,
				'closeAllPopup' : Popups.removeAll,
				'catchError' : self.initializeError
			});
			self.once({'retryInitDeka' : self.initDeka});
			self.model.on({
				'change:is_tutorial' : function(){
					self.redirect();
					self.reload();
				},
				'change:page_html' : self.render,
				'change:header_html' : self.renderHeaderAndFooter,
				'proveNoFormData' : self.redirect,
				'checkForm' : self.model.loadFirst,
				'catchError' : function(option, is_page){
					self.trigger('catchError', option, is_page);
				}
			});
		},
		render : function(){
			var self = this;
			var html = self.model.get('page_html');
			$('#jsContents *').off().remove();
			$('#jsContents').html(html);
			_.delay(function(){
				window.scrollTo(0, 0);
			}, 100);
			self.trigger('render');
		},
		renderHeaderAndFooter : function(){
			var html = this.model.get('header_html');
			$('#globalHeader *').off().remove();
			$('#globalHeader').html(html).show();
			$('#globalFooter').show();
		},
		reload : function(){
			window.location.reload(true);
		},
		redirect : function(){
			var self = this;
			var redirect_url = self.model.get('redirect_url');
			self.trigger('changeURL', redirect_url, true);
		},
		instantiateTab : function(){
			var self = this;
			var func = function(){
				var current = Tabs.model.get('current');
				self.model.set({current_tab : current});
			};
			TabClass.Model = TabClass.Model.extend({
				page : self
			});
			Tabs = new TabClass.View({
				model : new TabClass.Model(),
				collection : new TabClass.Collection()
			});
			self.on('setTabs', Tabs.setTabs);
			self.on('setTabFilter', Tabs.model.set);
			Tabs.model.on('change:current', func);
			Tabs.on('restoreCache', func);
		},
		initializeCounter : function(){
			if( !$('.jsCounter')[0] ) return;
			Counter = new CounterClass();
		},
		initializeForm : function(){
			if( !$('.jsForm')[0] ) return;
			Form = new FormClass();
		},
		initializeTimer : function(){
			var self = this;
			var data = self.model.get('page_data');
			var rtt  = self.model.get('roundTripTime');
			if( !data ) return;
			Timer = new TimerClass({
				 pageData : data
				,roundTripTime: rtt
			});
			Timer.on('battleStart', Popups.add);
			Timer.on('battleFinish', Popups.add);
			self.on('navigate', Timer.model.removeTimer);
		},
		initializeShortTutorial : function(){
			var page_data = this.model.get('page_data');
			if( !page_data || !page_data.first_access_flg ) return;
			ShortTutorial = new ShortTutorialClass();
		},
		preloadImages : function(){
			var page_data = this.model.get('page_data');
			if( !page_data ) return;
			var img_path = page_data.img_url_root;
			var preloadJS = new createjs.PreloadJS();
			preloadJS.loadManifest([
				{
					id : 'popupBG',
					src : img_path + '/parts/bg_popup.png'
				}
			]);
		},
		instantiateAnimation : function(){
			if(!$('canvas')[0]) return;
			var self = this;
			AnimationClass.Model = AnimationClass.Model.extend({
				page : self
			});
			Animation = new AnimationClass.View({
				model : new AnimationClass.Model()
			});
			self.on('setAnimation', Animation.setAnimation);
			self.on('forwardAnimation', Animation.next);
		},
		destroyAnimation : function(){
			if($('canvas')[0]) Animation.destructor();
		},
		instantiateComponents : function(){
			var self = this;
			var components = {};
			_.each(self.components, function(component, name){
				component.Model = component.Model.extend({
					page : self
				});
				component.View = component.View.extend({
					page : self
				});
				components[name] = new component.View({
					model : new component.Model()
				});
			});
			self.components = components;
		},
		resetFullScreen : function(){
			if( $('#fullScreen')[0] || $('#jsTutorial')[0] ){
				$('#globalHeader').hide();
				$('#globalFooter').hide();
			} else {
				$('.onComplete').hide();
				$('#globalHeader').show();
				$('#globalFooter').show();
				$('#footer').show();
			}
		},
		initializeError : function(option, is_page){
			var self = this;
			if( is_page ){
				var callbacks = self.model.callbacks || {};
				if( _.isNumber(option.status) && option.status !== 401){
					var callback = callbacks[option.status];
				}
				if( callback ){
					if( _.isFunction(callback) ){
						callback.call(self.model, option);
					} else if( _.isString(callback) ){
						self.model[callback].call(self.model, option);
					}
					return;
				}
			}
			if( !_.isObject(option) ){
				option = {
					'status' : '"dataType" is not JSON'
				};
			}
			ErrorClass.View = ErrorClass.View.extend({
				page : self
			});
			var Error = new ErrorClass.View({
				model : new ErrorClass.Model(option)
			});
		},
		closeAllPopup : function(){
			this.trigger('closeAllPopup');
		},
		openFirstPopup : function(){
			var self = this;
			var first_popup = RS.get('first_popup', false);
			if( !first_popup ) return;
			self.trigger('openPopup', first_popup);
			RS.remove('first_popup', false);
		},
		setUserAgent : function(){
			if(!$.os.android) return;
			$('body').addClass('android' + $.os.version.substr(0,1))
		},
		bindEvents : function(){},
		unbindEvents : function(){
			var self = this;
			$('#jsPage').off();
			self.undelegateEvents();
			self.stopListening();
			_.each(self.components, function(comp){
				if( comp.View ) return; // インスタンスでない場合は処理しない
				comp.undelegateEvents();
				comp.stopListening();
				comp.model.stopListening();
				comp = undefined;
			});
			[
				Popups,
				Tabs,
				Counter,
				Form,
				Button,
				Timer,
				ShortTutorial,
				Animation
			].forEach(function(common_part){
				if(!common_part) return;
				if(common_part.model){
					common_part.model.stopListening();
					common_part.model.off();
					common_part.model = undefined;
				}
				common_part.undelegateEvents();
				common_part.stopListening();
				common_part.off();
				common_part = undefined;
			});
		},
		unbindEvent : function(obj){
			obj.undelegateEvents();
			obj.stopListening();
			obj.model.stopListening();
		},
		initDeka : function(){
			var self = this;
			var page_data = self.model.get('page_data');
			var $el = $('#initDeka');
			if( !window.AMB ){
				_.delay(function(){
					self.trigger('retryInitDeka');
				}, 10000);
				return;
			}
			if(
				$el.attr('data-is-initialized')==='true' ||
				!page_data
			) return;
			var token = page_data.token;
			$el.attr('data-is-initialized', 'true');
			// 初期化
			AMB.configure({
				clientId: AMB.braveguardianClientId,
				token: token
			});
			// フッタの挿入
			AMB.footer('#footer', {
				banner: true,
				category: 'game'
			});
		},
		loadCamp : function(){
			var self = this;
			var is_prod = /braveguardian\.jp$/.test(location.host);
			if( !is_prod ) return;
			var PAGEID = self.model.get('id');
			var page_data = self.model.get('page_data');
			if(
				(PAGEID==='Tutorial' && page_data.tutorial_step===0) ||
				PAGEID==='TutorialComplete'
			){
				require(['http://sp.ca-mpr.jp/ss.js'], self.initCamp);
			}
		},
		initCamp : function(){
			var self = this;
			var PAGEID = self.model.get('id');
			var page_data = self.model.get('page_data');
			if( PAGEID==='Tutorial' && page_data.tutorial_step===0 ){
				createCvTag("10", "224"); // デカ認可後
			} else if( PAGEID==='TutorialComplete'){
				createCvTag("10", "225"); // チュートリアル突破
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
