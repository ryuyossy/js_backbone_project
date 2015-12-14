define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クイズ',
			template_path : '/tmpl/quiz/top.html',
			data_path : '/quiz/top',
			style_path : '/css/quiz.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
		},
		binedEvents : function(){
			var self = this;
			var top = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});