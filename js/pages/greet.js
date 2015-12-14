define([
	'common/page',
	'components/greet/greet'
], function(
	PageClass,
	Greet
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'あいさつ',
			data_path : '/greet/top',
			template_path : '/tmpl/greet/list.html',
			style_path : '/css/prof.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'greet' : Greet
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