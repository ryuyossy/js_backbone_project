define(function(){
	// レアメダル交換機能
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsExchangeButton' : 'getElement',
			'touch .jsExchangeSubmitButton' : 'jumpToExchangeResult'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		openPopup : function($el){
			var self = this;
			var raremedal_item_id = $el.parents('.jsItems').attr('data-item-id');
			var qty = $el.parents('.numControl').find('.qty').val();
			var parameter = {
				title : 'レアメダル交換確認',
				template : '#jsTemplatePopupRaremedal',
				is_closable : true,
				data_path : page.model.getDataPath('/raremedal/confirm'),
				ajax_type : 'GET',
				ajax_data : {
					rare_medal_item_id : raremedal_item_id,
					qty : qty
				}
			};
			page.trigger('openPopup', parameter);
		},
		jumpToExchangeResult : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var itemId = $el.attr('data-raremedal-item-id');
			var qty = $el.attr('data-qty');
			RS.put({
				'form_data' : {
					'rare_medal_item_id' : itemId,
					'qty' : qty
				},
				'form_target' : ['RaremedalResult']
			}, false);
			page.trigger('changeURL', 'raremedal/result/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
