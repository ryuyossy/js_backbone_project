define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '図鑑｜秘宝シリーズ',
			data_path : '/collection/treasure/list',
			template_path : '/tmpl/collection/treasure/list.html',
			style_path : '/css/collection.css'
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