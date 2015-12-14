define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '問題',
			template_path : '/tmpl/quiz/question.html',
			data_path : '/quiz/progress',
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