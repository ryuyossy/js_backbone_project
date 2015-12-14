define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ヤツらの詳細',
			data_path : '/collection/boss/detail',
			template_path : '/tmpl/collection/boss/detail.html',
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