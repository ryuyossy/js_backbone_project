define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'レアメダル交換完了',
			data_path : '/raremedal/result',
			template_path : '/tmpl/raremedal/result.html',
			style_path : '/css/raremedal.css',
			ajax_type : 'POST'
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