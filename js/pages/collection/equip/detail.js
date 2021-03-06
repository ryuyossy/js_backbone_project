define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '図鑑｜武具詳細',
			data_path : '/collection/equip/detail',
			template_path : '/tmpl/collection/equip/detail.html',
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