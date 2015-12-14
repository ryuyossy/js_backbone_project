define([
	'common/page'
], function(
	PageClass
){
	// チュートリアル完了ページ
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'チュートリアル完了',
			ajax_type : 'POST',
			data_path : '/tutorial/complete',
			template_path : '/tmpl/tutorial/tutorial_complete.html',
			style_path : '/css/tutorial.css'
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