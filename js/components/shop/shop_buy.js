define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonBuy' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.jumpToConfirm);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsItems');
			self.model.set({
				'shop_item_id' : $el.attr('data-item-id'),
				'num' : $el.find('.jsCounterNum').val()
			});
			self.trigger('getElement');
		},
		jumpToConfirm : function(){
			var self = this;
			var num = self.model.get('num');
			RS.put({
				'form_data' : {
					'buy_num' : num,
					'shop_item_id' : self.model.get('shop_item_id')
				},
				'form_target' : ['ShopConfirm', 'ShopBuyCoin', 'ShopBuyAmegold']
			}, false);
			page.trigger('changeURL', 'shop/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



