define([
	'common/page',
	'components/shop/shop_buy'
], function(
	PageClass,
	ShopBuy
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ショップ',
			data_path : '/shop/list',
			template_path : '/tmpl/shop/list.html',
			style_path : '/css/shop.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'buy' : ShopBuy
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