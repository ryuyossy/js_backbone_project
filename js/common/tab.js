define(function(){
	var isLocal = !(/braveguardian\.jp$/.test(location.host));
	var page;
	var TabsCollection = Backbone.Collection;
	var TabModel = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.trigger('initialize');
		}
	});
	var TabsModel = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.trigger('initialize');
			self.on('change:filter', function(){
				self.set({filtered : true});
			});
		},
		setIsFirst : function(){
			var self = this;
			var current = self.get('current');
			var index = current.get('index');
			var $el = $('.jsTabContents').children('li').hide().eq(index);
			$el.find('.jsListAll').html('');
			current.set({'is_first' : true});
		},
		getTabTemplate : function(){
			var self = this;
			var current = self.get('current');
			var template_id = current.get('template');
			var template = $(template_id).html();
			self.set({tab_template : template}, {silent : true});
		},
		getData : function(){
			var self = this;
			var current = self.get('current');
			var data = current.get('local_data') || current.get('ajax_data') || '';
			var type = current.get('ajax_type') || 'GET';
			type = type.match(/^POST$/i) ? 'POST' : 'GET';
			if(
				current.get('is_default') &&
				current.get('is_first') &&
				!current.get('is_reloading')
			){
				current.set({tab_data : self.page.model.get("page_data")});
				self.trigger('getFirstDefaultTab');
				self.trigger('succeedLoading');
				return;
			}
			else if( current.has('local_data') ){
				current.set({tab_data : data});
				self.trigger('succeedLoading');
				return;
			}
			self.trigger('startLoading');
			var deferred = isLocal ? _.when(
				// ローカルでは共通ヘッダを別JSONから読み込む
				self.loadTabData(),
				self.loadCommonData()
			) : _.when(
				// サーバーでは共通ヘッダを同APIから読み込む
				self.loadTabData()
			);
			deferred.then(
				function(tab_data, common_data){
					current.set({
						tab_data : _.extend(tab_data, common_data)
					});
					self.trigger('succeedLoading');
				},
				function(tab_data){
					self.trigger('failLoading', _.extend(
						{'error' : self.get('error')}, tab_data
					));
				}
			);
			current.unset('is_reloading');
		},
		loadCommonData : function(){
			var self = this;
			var dfd = new _.Deferred();
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
		loadTabData : function(){
			var self = this;
			var current = self.get('current');
			var data_path = current.get('data_path');
			var data = current.get('local_data') || current.get('ajax_data') || '';
			var type = current.get('ajax_type') || 'GET';
			type = type.match(/^POST$/i) ? 'POST' : 'GET';
			var dfd = new _.Deferred();
			$.ajax({
				type : type,
				data : _.extend(
					{timestamp : new Date/1000|0},
					self.get('filter') || {},
					data
				),
				dataType : 'json',
				url : data_path,
				success : function(json){
					if( isLocal || json.status === 200 ){
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
		}
	});
	var TabsView = Backbone.View.extend({
		el : '.jsTabs',
		events : {
			'touch .jsTabButtons li' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.model.page;
			self.collection.off();
			self.off();
			self.on('getElement', self.checkStatus);
			self.on('getElement', self.changeButtons);
			self.on('reload', self.model.getTabTemplate);
			self.on('reload', self.model.getData);
			self.on('restoreCache', self.renderTab);
			self.on('restoreCache', self.showMoreButton);
			self.on('render', self.callbackSuccess);
			self.model.on('getFirstDefaultTab', self.changeButtons);
			self.model.on('change:current', self.model.getTabTemplate);
			self.model.on('change:current', self.model.getData);
			self.model.on('startLoading', self.renderLoading);
			self.model.on('succeedLoading', self.renderTab);
			self.model.on('succeedLoading', self.showMoreButton);
			self.model.on('failLoading', page.openErrorPopup);
		},
		setTabs : function(tabs){
			var self = this;
			$('.jsTabContents').after('<div class="jsLoaderA"></div>');
			_.each(tabs, function(tab, k){
				var model = new TabModel(_.extend(tab, {index : k}));
				self.collection.add(model);
				model.set({is_first : true});
				$('.jsTabButtons').find('li').eq(k).attr('data-cid', model.cid);
				model.get('is_default') && self.model.set({current : model});
			});
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		checkStatus : function($el){
			var self = this;
			var cid = $el.attr('data-cid');
			var current = self.collection.get({cid : cid});
			// タップしたタブが既に選択状態の場合
			if( $el.find('button').hasClass('select') ){
				// リロード可能な場合
				if( current.get('is_reloadable') ){
					current.set({'is_reloading' : true});
					self.trigger('reload');
				}
			}
			// タップしたタブが非選択状態の場合
			else{
				// キャッシュONかつ最初の読み込み時でなくフィルタ変更もしていない場合
				if(
					current.get('is_cacheable') &&
					!current.get('is_first') &&
					!self.model.get('filtered')
				){
					self.model.set({current : current}, {silent : true});
					self.trigger('restoreCache');
				} else {
					self.model.set({current : current});
				}
			}
		},
		changeButtons : function($el){
			var self = this;
			var current = self.model.get('current');
			var index = current.get('index');
			var $buttons = $('.jsTabButtons');
			if(!$el) $el = $buttons.find('li').eq(index);
			$buttons.find('button').removeClass('select');
			$el.find('button').addClass('select');
		},
		renderLoading : function(){
			$('.jsTabInner').find('.jsLoaderA').show();
			$('.jsTabContents').children('li').hide();
		},
		renderTab : function(){
			var self = this;
			var current = self.model.get('current');
			var index = current.get('index');
			var $el = $('.jsTabContents').children('li').hide().eq(index).show();
			// キャッシュOFFまたは最初の読み込み時またはフィルタ変更時の場合
			if(
				!current.get('is_cacheable') ||
				current.get('is_first') ||
				self.model.has('filtered')
			){
				self.model.unset('filtered');
				var data = current.get('tab_data');
				var template = self.model.get('tab_template');
				var html = $.templates(template).render(_.extend(
					{
						'PAGEID' : self.model.page.model.get('id'),
						'local_data' : current.get('local_data') || '',
						'ajax_data' : current.get('ajax_data') || ''
					},
					data
				));
				var is_list = $el.find('.jsListAll')[0];
				var is_clear_all = current.get('is_clear_all');
				if( is_list && !is_clear_all ){
					$el.find('.jsListAll').html(html);
				} else {
					$el.html(html);
				}
				current.set({is_first : false});
			}
			$('.jsTabInner').find('.jsLoaderA').hide();
			self.trigger('render');
		},
		callbackSuccess : function(){
			var self = this;
			var current = self.model.get('current');
			var callback = current.get('success');
			callback && callback();
		},
		showMoreButton : function(){
			var self = this;
			var current = self.model.get('current');
			var more_flg = current.get('more_flg_name');
			if( !more_flg ) return;
			var tab_data = current.get('tab_data') || page.model.get('page_data');
			var $more = self.$('.jsListMore');
			if( !$more ) return;
			if( tab_data[more_flg] ){
				$more.show();
			} else {
				$more.hide();
			}
		}
	});
	return {
		Collection : TabsCollection,
		Model : TabsModel,
		View : TabsView
	};
});
