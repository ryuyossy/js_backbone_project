define(function(){
	var isLocal = !(/braveguardian\.jp$/.test(location.host));
	var page;
	var Collection = Backbone.Collection;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('initialize', self.setIsClosable);
			self.on('initialize', self.makeFrameHTML);
			self.trigger('initialize');
		},
		setIsClosable : function(){
			var self = this;
			self.set({
				is_closable : self.get('is_closable')!=false ? true : false
			});
		},
		getPopupTemplate : function(){
			var self = this;
			var template_id = self.get('template') || '#jsTemplatePopupDefault';
			var template = $(template_id).html();
			self.set({'popup_template_contents' : template}, {silent : true});
		},
		getData : function(){
			var self = this;
			var data = self.get('local_data') || self.get('ajax_data') || '';
			if( !self.has('data_path') ){
				self.set({popup_data : data}, {silent : true});
				self.trigger('succeedLoading');
				return;
			}
			var deferred = isLocal ? _.when(
				// ローカルでは共通ヘッダを別JSONから読み込む
				self.loadPopupData(),
				self.loadCommonData()
			) : _.when(
				// サーバーでは共通ヘッダを同APIから読み込む
				self.loadPopupData()
			);
			deferred.then(
				function(){
					self.trigger('succeedLoading');
				},
				function(popup_data){
					self.trigger('failLoading', _.extend(
						{
							'error_parameter' : self.get('error_parameter'),
							'error_func' : self.get('error')
						}, popup_data
					));
				}
			);
		},
		loadCommonData : function(){
			var self = this;
			var dfd = new _.Deferred();
			$.ajax({
				dataType : 'json',
				url : '/json/common.json',
				success : function(json){
					self.set({
						'popup_data' : _.extend(
							json,
							self.get('popup_data') || {}
						)
					});
					if( json.status === 200 ){
						dfd.resolve();
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
		loadPopupData : function(){
			var self = this;
			var data_path = self.get('data_path');
			var data = self.get('ajax_data') || '';
			var type = self.get('ajax_type') || 'GET';
			type = type.match(/^POST$/i) ? 'POST' : 'GET';
			var dfd = new _.Deferred();
			$.ajax({
				type : type,
				data : _.extend(
					{'timestamp' : new Date/1000|0},
					data
				),
				dataType : 'json',
				url : data_path,
				success : function(json){
					self.set({
						'popup_data' : _.extend(
							json,
							self.get('popup_data') || {}
						)
					}, {silent : true});
					if( json.status === 200 ){
						dfd.resolve();
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
		makeFrameHTML : function(){
			var self = this;
			var template = $('#jsTemplatePopup').html();
			var local_data = self.get('local_data');
			var is_closable = self.get('is_closable');
			var html = $.templates(template).render({
				cid : self.cid,
				title : self.get('title') || self.get('titles')[0],
				is_closable : is_closable,
				local_data : _.extend(
					{
						is_closable : is_closable,
						is_local : !self.has('data_path')
					},
					local_data || {}
				),
				tmpl : self.get('template') || '#jsTemplatePopupDefault'
			});
			self.set({popup_html : html});
		},
		makeContentsHTML : function(){
			var self = this;
			var template = self.get('popup_template_contents');
			var data = self.get('popup_data');
			var is_closable = self.get('is_closable');
			if( is_closable===undefined ) is_closable = true;
			var local_data = self.get('local_data');
			var message = self.get('message') || '';
			var html = $.templates(template).render(
				_.extend(
					{
						message : message,
						is_closable : is_closable
					},
					data,
					local_data
				)
			);
			self.set({popup_html : html});
			self.trigger('makeContentsHTML');
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPopups',
		events : {
			'touch #jsPopupBG' : 'getCurrentElement',
			'touch .jsClosePopup' : 'getCloseElement',
			'touch .jsCloseAllPopup' : 'removeAll'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.collection.off();
			self.off();
			self.collection.on('add', self.bindEvents);
			self.collection.on('add', self.renderLoading);
			self.on('start', self.renderBG);
			self.on('render', self.runSuccessCallback);
			self.on('getCloseElement', self.offEvents);
			self.on('getCloseElement', self.remove);
		},
		add : function(option){
			var self = this;
			self.trigger('start');
			_.delay(function(){
				var model = new Model(option);
				self.collection.add(model);
			}, 100);
		},
		bindEvents : function(){
			var self = this;
			var current = _.last(self.collection.models);
			current.off();
			current.on('succeedLoading', current.makeContentsHTML);
			current.on('failLoading', self.offEventsAll);
			current.on('failLoading', self.removePopups);
			current.on('failLoading', page.initializeError);
			current.on('makeContentsHTML', self.render);
			self.off('renderLoading');
			if( !current.has('data_path') ){
				self.on('renderLoading', self.runSuccessCallback);
				return;
			}
			self.on('renderLoading', current.getPopupTemplate);
			self.on('renderLoading', current.getData);
		},
		renderBG : function(){
			var $jsPopupBG = this.$el.show().find('#jsPopupBG');
			$jsPopupBG.css({'opacity' : '0.5'});
			if( $jsPopupBG.css('display') == 'block' ) return;
			$jsPopupBG.css({
				'top' : window.pageYOffset+'px',
				'height' : window.screen.height+'px'
			}).show();
		},
		renderLoading : function(){
			var self = this;
			var current = _.last(self.collection.models);
			var html = current.get('popup_html');
			var $bg = $('#jsPopupBG');
			self.$el.append(html).show();
			$bg.show().css({'opacity' : '0.5'});
			$('.jsPopup').last().show().css({
				'top' : window.pageYOffset + Math.floor($(window).height()/2 - $('.jsPopup').height()/2) + 'px',
				'left' : Math.floor(window.innerWidth/2 - 320/2 + 8) + 'px',
				'-webkit-transform' : 'scale(1)'
			});
			_.delay(function(){
				self.trigger('renderLoading');
			}, 200);
			_.delay(function(){
				$bg.css({
					'top' : '0',
					'height' : '100%',
					'opacity' : '0.5'
				});
			}, 500);
		},
		render : function(){
			var self = this;
			var current = _.last(self.collection.models);
			var html = current.get('popup_html');
			var top, $jsPopup = $('.jsPopup');
			var titles = current.get('titles');
			if( titles ) $jsPopup.last().find('h1').text(titles[1]);
			$jsPopup.last().children('.jsPopupContents').html(html);
			top = window.pageYOffset + Math.floor($(window).height()/2 - $('.jsPopup').height()/2) + 'px';
			$jsPopup.css({
				'top' : top
			});
			self.trigger('render');
		},
		runSuccessCallback : function(){
			var self = this;
			var current = _.last(self.collection.models);
			var success = current.get('success') || current.get('callback');
			success && success(current.get('popup_data'));
		},
		getCloseElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsPopup');
			self.trigger('getCloseElement', $el);
		},
		getCurrentElement : function(){
			var self = this;
			var $el = $('.jsPopup').last();
			if(!$el[0]) return;
			self.trigger('getCloseElement', $el);
		},
		offEvents : function($el){
			var self = this;
			var cid = $el.attr('data-cid');
			if(!cid) return;
			var current = self.collection.get({cid : cid});
			current.off();
			current.on('remove', self.hide);
			self.off('renderLoading', current.getPopupTemplate);
			self.off('renderLoading', current.getData);
		},
		offEventsAll : function(){
			var self = this;
			_.each(self.collection.models, function(model){
				model.off();
				model.on('remove', self.hide);
				self.off('renderLoading', model.getPopupTemplate);
				self.off('renderLoading', model.getData);
			});
		},
		remove : function($el){
			var self = this;
			var cid = $($el).attr('data-cid');
			var current;
			if( cid ){
				current = self.collection.get({cid : cid});
				if( !current.get('is_closable') ) return;
				$el.remove();
				self.collection.remove(current);
			} else {
				$('.jsPopup').remove();
				self.hide();
			}
		},
		removePopups : function(){
			var self = this;
			$('.jsPopup').remove();
			self.collection.reset();
		},
		removeAll : function(){
			var self = this;
			$('.jsPopup').remove();
			self.collection.reset();
			self.hide();
		},
		hide : function(){
			if( $('.jsPopup').length ) return;
			var $bg = $('#jsPopupBG');
			$bg.css('opacity', '0');
			_.delay(function(){
				if( $('.jsPopup').length ) return;
				$bg.hide();
				$('#jsPopups').hide();
			}, 400);
		}
	});
	return {
		Collection : Collection,
		Model : Model,
		View : View
	};
});
