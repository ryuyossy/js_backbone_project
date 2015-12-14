define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '答え',
			template_path : '/tmpl/quiz/answer.html',
			data_path : '/quiz/answer',
			ajax_type : 'POST',
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