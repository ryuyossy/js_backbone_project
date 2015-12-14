define(function(){
	var page;
	var isLocal = !(/braveguardian\.jp$/.test(location.host));
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.set({
				filter : self.get('ajax_data')
			});
			self.on('initialize', self.getTemplate);
			self.trigger('initialize');
		},
		getTemplate : function(){
			var self = this;
			var template_id = self.get('template');
			var template = $(template_id).html();
			self.set({'template' : template});
		},
		getData : function(){
			var self = this;
			var deferred = isLocal ? _.when(
				// ローカルでは共通ヘッダを別JSONから読み込む
				self.loadListData(),
				self.loadCommonData()
			) : _.when(
				// サーバーでは共通ヘッダを同APIから読み込む
				self.loadListData()
			);
			deferred.then(
				function(){
					self.trigger('succeedLoading');
				},
				function(tab_data){
					self.trigger('failLoading', _.extend(
						{'error' : self.get('error')}, tab_data
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
						'list_data' : _.extend(
							json,
							self.get('list_data') || {}
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
		loadListData : function(){
			var self = this;
			var dfd = new _.Deferred();
			var current_tab = page.model.get('current_tab');
			var tab_data = current_tab ? current_tab.get('ajax_data') : {};
			var base_id = self.has('is_more') ? self.get('base_id') : {};
			var type = page.model.get('ajax_type') || 'GET';
			type = type.match(/^POST$/i) ? 'POST' : 'GET';
			$.ajax({
				type : type,
				data : _.extend(
					{timestamp : new Date/1000|0},
					page.model.get('query') || {},
					RS.get('form_data', false) || {},
					page.model.get('ajax_data') || {},
					tab_data,
					self.get('filter') || {},
					base_id ? {'base_id' : base_id} : {}
				),
				dataType : 'json',
				url : self.get('data_path'),
				success : function(json){
					var flg = self.get('more_flg_name');
					self.set({
						'list_data' : _.extend(
							{},
							self.get('list_data') || {},
							json
						),
						'more_flg' : json[flg]
					}, {silent : true});
					if( isLocal || json.status === 200 ){
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
		makeHTML : function(){
			var self = this;
			var template = self.get('template');
			var data = _.extend(
				{'PAGEID' : self.page.model.get('id')},
				self.has('is_more') ? {'is_more' : self.get('is_more')} : {},
				self.get('list_data')
			);
			var html = $.templates(template).render(data);
			self.set({html : html});
			self.trigger('makeHTML');
		}
	});
	var View = Backbone.View.extend({
		events : {
			'touch .jsListMore' : 'readMore'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('initialize', self.insertLoader);
			self.on('initialize', self.addListClass);
			self.on('initialize', self.checkListId);
			self.on('initialize', self.bindEvents);
			self.trigger('initialize');
		},
		insertLoader : function(){
			var self = this;
			var parent = self.$el.find('.jsListAll').parent();
			if( parent.children('.jsLoaderA')[0] ) return;
			var $loader = $('<div class="jsLoaderA"></div>');
			$loader.appendTo(parent).hide();
			var style_class = self.model.get('style_class');
			style_class && $loader.addClass(style_class);
		},
		addListClass : function(){
			var self = this;
			var $list = self.$el.find('.jsList');
			if( $list[0] ) return;
			$list = self.$el.find('.jsListAll').children();
			$list.addClass('jsList');
		},
		checkListId : function(){
			var self = this;
			var $list = self.$el.find('.jsList');
			var $more = self.$el.find('.jsListMore')[0];
			if( !$more || !$list[0] || $list.attr('data-list-id') ) return;
			console.log('データがない状態でmore_flgがtrueになっています。');
		},
		bindEvents : function(){
			var self = this;
			self.off();
			self.model.on('succeedLoading', self.model.makeHTML);
			self.model.on('makeHTML', self.render);
			self.model.on('makeHTML', self.showMoreButton);
			self.on('filter', self.showLoading);
			self.on('filter', self.resetCount);
			self.on('readMore', self.showLoading);
			self.on('showLoading', self.model.getData);
			self.on('endLoading', self.hideLoading);
		},
		filter : function(parameter){
			var self = this;
			self.model.unset('filter', {silent : true});
			self.model.set({
				filter : parameter
			});
			self.trigger('filter');
		},
		resetCount : function(){
			$('.jsCountChecked').text(0);
		},
		readMore : function(){
			var self = this;
			var base_id = self.$el.find('.jsList').last().attr('data-list-id');
			self.model.set({
				base_id : base_id,
				is_more : true
			});
			self.trigger('readMore');
		},
		showLoading : function(){
			var self = this;
			var $jsListAll = self.$('.jsListAll');
			var $loader = $jsListAll.siblings('.jsLoaderA');
			var is_cleared = !self.model.has('base_id');
			if( is_cleared ) $jsListAll.html('');
			$jsListAll.after($loader);
			$loader.show();
			self.$el.find('.jsListMore').hide();
			_.delay(function(){
				self.trigger('showLoading');
			}, 100);
		},
		hideLoading : function(){
			var self = this;
			var $loader = self.$el.find('.jsLoaderA');
			$loader.hide();
		},
		render : function(){
			var self = this;
			var html = self.model.get('html');
			var $listAll = self.$('.jsListAll');
			var is_more = self.model.get('is_more') || false;
			self.trigger('endLoading');
			if( is_more ){
				$listAll.append(html);
			} else {
				$listAll.html(html);
			}
			self.model.unset('is_more');
			self.trigger('render');
		},
		showMoreButton : function(){
			var self = this;
			var more_flg = self.model.get('more_flg_name');
			if( !more_flg ) return;
			var list_data = self.model.get('list_data') || page.model.get('page_data');
			var $more = self.$('.jsListMore');
			if( !$more ) return;
			if( list_data[more_flg] ){
				$more.show();
			} else {
				$more.hide();
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
