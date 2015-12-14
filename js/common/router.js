define([
	'common/router-pages',
	'common/user',
	'common/mainmenu',
	'common/loader',
	'common/button'
], function(
	Pages,
	User,
	Mainmenu,
	Loader,
	Button
){
	var ticker;
	var URLs = {};
	_.each(Pages, function(page, key){
		URLs[page.url] = key;
	});
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
		},
		loadCommonTemplates : function(){
			var self = this;
			_.when(
				self.loadTemplate('list'),
				self.loadTemplate('parts'),
				self.loadTemplate('popup')
			).then(
				function(){
					var template = [].slice.apply(arguments).join("");
					self.set({template : template});
				},
				function(){
					self.trigger('errorLoadingTemplate');
				}
			);
		},
		loadTemplate : function(type){
			var dfd = new _.Deferred();
			var url = 'tmpl/common/' + type + '.html';
			var path = './' + url;
			$.ajax({
				dataType : 'html',
				data : {
					cb : (_.has(rev, path)) ? rev[path] : null
				},
				url : url,
				timeout : 55 * 1000,
				success : function(tmpl){
					dfd.resolve(tmpl);
				},
				error : function(e){
					dfd.reject(e);
				}
			});
			return dfd.promise();
		}
	});
	var Operator = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.model.on('change:template', self.insertCommonTemplate);
			self.on('loadPage', self.unsetTicker);
			self.on('loadPage', self.initPage);
			self.on('loadPage', self.bindPageEvents);
			self.on('startLoadingPage', self.makeQuery);
			self.on('startLoadingPage', self.loadPage);
			self.on('initialize', self.bindLinks);
			self.on('initialize', self.initCommonParts);
			self.on('initialize', self.bindEvents);
			self.on('initialize', self.setRouterPages);
			self.on('initialize', self.model.loadCommonTemplates);
			self.trigger('initialize');
		},
		bindLinks : function(){
			var self = this;
			$('body').on('touch', '[data-href]', function(){
				var href = $(this).attr('data-href');
				var linked = $(this).attr('data-linked');
				if(linked==='false') return;
				self.trigger('touchLink', href, true);
			}).on('touch', '[data-role=backpage]', function(){
				self.trigger('touchBack');
			});
		},
		initCommonParts : function(){
			this.model.set({
				loader : new Loader.View({
					model : new Loader.Model()
				}),
				mainmenu : new Mainmenu(),
				button : new Button(),
				user : new User()
			});
		},
		bindEvents : function(){
			var self = this;
			var mainmenu = self.model.get('mainmenu');
			self.on({
				'startLoadingPage' : mainmenu.closeMenu
			});
			self.model.on({
				'errorLoadingTemplate' : self.showErrorPopup
			});
		},
		setRouterPages : function(){
			var self = this;
			var RouterPages = {};
			var loader = self.model.get('loader');
			_.each(Pages, function(page, key){
				RouterPages[key] = function(){
					loader.model.set({
						'is_first' : !self.model.has('current')
					});
					loader.startLoading();
					self.model.set({
						page : page,
						key : key,
						query : arguments
					});
					self.trigger('startLoadingPage');
				};
			});
			self.model.set({
				router_pages : RouterPages
			});
		},
		makeQuery : function(){
			var self = this;
			var page = self.model.get('page');
			var query = self.model.get('query');
			var keys = page.url.match(/\:(.+?)\//g);
			keys = _.map(keys, function(key){
				return key.replace(/[:/]/g, '');
			});
			self.model.set({
				query : _.object(keys, query)
			});
		},
		loadPage : function(){
			var self = this;
			var page = self.model.get('page');
			var cb = rev['./js/' + page.path + '.js'];
			var page_dep = deps[page.path.replace('pages/')];
			if(page_dep) cb += page_dep.join('');
			requirejs.onError = self.showErrorPopup;
			require({urlArgs : cb}, [page.path], function(Page){
				self.trigger('loadPage', Page);
			});
		},
		initPage : function(Page){
			if( !Page ) return;
			var self = this;
			var key = self.model.get('key');
			var user = self.model.get('user');
			var query = self.model.get('query');
			Page.Model = Page.Model.extend({
				user : user
			});
			Page = new Page.View({
				model : new Page.Model({
					id : key,
					query : query
				})
			});
			self.model.set({
				current : Page
			});
		},
		bindPageEvents : function(){
			var self = this;
			var Page = self.model.get('current');
			var loader = self.model.get('loader');
			self.once('startLoadingPage', function(){
				Page.closeAllPopup();
				Page.destroyAnimation();
				Page.unbindEvents();
				Page.model = undefined;
				Page = undefined;
			});
			Page.listenTo(self, 'insertCommonTemplate', Page.model.checkTutorial);
			Page.on('loadCreateJSAnimation', self.setTicker);
			Page.on('startDummyLoading', loader.startLoading);
			Page.on('endDummyLoading', loader.endLoading);
			Page.on('incompleteBgLoading', loader.startLoading);
			Page.on('completeBgLoading', loader.endLoading);
			Page.on('startInnerLoading', loader.startLoadingS);
			Page.on('endInnerLoading', loader.endLoading);
			Page.on('catchError', loader.endLoading);
			Page.on('render', loader.endLoading);
			Page.on('changeURL', self.changeURL);
			Page.model.on('changeURL', self.changeURL);
			Page.trigger('becomeCurrent');
		},
		changeURL : function(scene, direct){
			this.trigger('changeURL', scene, direct);
		},
		insertCommonTemplate : function(){
			var self = this;
			var template = self.model.get('template');
			var $el = $('#jsTemplates');
			$el.html(template);
			self.trigger('insertCommonTemplate');
		},
		unsetTicker : function(){
			if( !ticker ) ticker = createjs.Ticker._handleTimeout;
			createjs.Ticker._handleTimeout = undefined;
		},
		setTicker : function(){
			if( !ticker ) return;
			createjs.Ticker._handleTimeout = ticker;
			createjs.Ticker.timeoutID = setTimeout(
				createjs.Ticker._handleTimeout, 0
			);
			ticker = undefined;
		},
		showErrorPopup : function(err){
			var self = this;
			var text;
			if( self.model.has('is_error') ){
				return;
			} else {
				self.model.set('is_error', true);
			}
			if( err ){
				text = err.requireType + ' "' + err.requireModules + '"';
			} else {
				text = 'CommonTemplate Load Error';
			}
			console.log(text);
			_.delay(function(){
				window.location.reload(true);
			}, 5000);
			if( window.confirm('通信エラーが発生しました。再度通信しますか？') ){
				window.location.reload(true);
			}
		}
	});
	var Router = Backbone.Router.extend({
		urls : URLs,
		routes : _.extend({}, URLs, {"*path": "showNotFound"}),
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('notFound', self.showNotFound);
			self.on('backPage', self.backPage);
			self.on('initialize', self.setURLs);
			self.on('initialize', self.bindEvents);
			self.trigger('initialize');
		},
		setURLs : function(){
			var self = this;
			var reverse_urls = [];
			_.each(self.urls, function(v, k){
				reverse_urls[v] = k;
			});
			self.urls = reverse_urls;
		},
		bindEvents : function(){
			var self = this;
			self.operator.on({
				'touchLink' : self.changeURL,
				'touchBack' : self.backPage,
				'changeURL' : self.changeURL
			});
		},
		changeURL : function(scene, direct){
			var self = this;
			var current = location.hash.replace('#', '');
			if(current===scene){
				window.location.reload(true);
				return;
			}
			scene = direct ? scene : self.urls[scene];
			if( !scene ){
				self.trigger('notFound');
				return;
			}
			self.navigate(scene, {trigger: true});
		},
		backPage : function(){
			window.history.back();
		},
		showNotFound : function(){
			this.changeURL('404/', true);
		}
	});
	return {
		Model : Model,
		Operator : Operator,
		Router : Router
	};
});
