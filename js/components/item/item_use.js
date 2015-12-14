define(function(){
	//アイテム使用
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonItemUseConfirm' : 'getElement',
			'touch .jsButtonJumpToItemUse' : 'jumpToItemUse'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			page = self.page;
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		openPopup : function($el){
			var self = this;
			var parameter = {
				titles : ['アイテム情報取得中...', 'アイテム使用確認'],
				template : '#jsTemplateUseItem',
				is_closable : true,
				data_path : page.model.getDataPath('/item/confirm'),
				ajax_type : 'GET',
				ajax_data : {
					'item_id' : $el.attr('data-item-id')
				}
			};
			page.trigger('openPopup', parameter);
		},
		jumpToItemUse : function(e){
			var $el = $(e.currentTarget);
			RS.put({
				'form_data' : {
					'item_id' : $el.attr('data-item-id')
				},
				'form_target' : 'ItemUse'
			}, false);
			page.trigger('changeURL', 'item/use/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});