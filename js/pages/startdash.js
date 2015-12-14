define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'スタートダッシュ',
			template_path : '/tmpl/startdash.html',
			style_path : '/css/others.css'
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