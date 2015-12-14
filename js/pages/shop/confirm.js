define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ショップ購入確認',
			data_path : '/shop/confirm',
			template_path : '/tmpl/shop/confirm.html',
			ajax_type : 'GET',
			style_path : '/css/shop.css',
			redirect_url : 'shop/list/'
		}
	});
	var View = PageClass.View.extend({
		components : {
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