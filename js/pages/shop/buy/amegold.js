define([
	'common/page',
	'components/item/item_use'
], function(
	PageClass,
	ItemUse
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '購入完了',
			data_path : '/shop/buy/amegold',
			template_path : '/tmpl/shop/complete.html',
			ajax_type : 'POST',
			style_path : '/css/shop.css',
			redirect_url : 'shop/list/',
			extended_page_data : {
				'payment' : 'amegold'
			}
		}
	});
	var View = PageClass.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			
			self._super();
		},
		components : {
			'item_use': ItemUse
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});