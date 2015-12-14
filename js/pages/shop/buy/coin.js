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
			data_path : '/shop/buy/coin',
			template_path : '/tmpl/shop/complete.html',
			ajax_type : 'POST',
			style_path : '/css/shop.css',
			redirect_url : 'shop/list/',
			extended_page_data : {
				'payment' : 'coin'
			}
		}
	});
	var View = PageClass.View.extend({
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