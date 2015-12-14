define([
	'common/page',
	'components/faq/faq_accordion'
], function(
	PageClass,
	FaqAccordion
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'よくあるご質問',
			template_path : '/tmpl/faq/faq.html',
			data_path : '/faq/top',
			style_path : '/css/others.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'accordion' : FaqAccordion
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