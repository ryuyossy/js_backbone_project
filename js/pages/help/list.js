define([
	'common/page',
	'components/help/help_accordion'
], function(
	PageClass,
	HelpAccordion
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ヘルプ',
			data_path : '/help/top',
			template_path : '/tmpl/help/list.html',
			style_path : '/css/others.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'accordion' : HelpAccordion
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