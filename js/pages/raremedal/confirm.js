define([
	'common/page',
	'components/raremedal/raremedal_confirm'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'レアメダル交換確認',
			data_path : '/raremedal/confirm',
			template_path : '/tmpl/raremedal/confirm.html',
			style_path : '/css/raremedal.css'
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