define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ガチャ購入確認',
			data_path : '/gacha/buy/confirm',
			ajax_type : 'GET',
			template_path : '/tmpl/gacha/buy/confirm.html',
			style_path : '/css/gacha.css',
			redirect_url : 'gacha/buy/'
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