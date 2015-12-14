define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '装備解除完了',
			data_path : '/deck/equip/change_execute',
			template_path : '/tmpl/deck/equip/complete.html',
			ajax_type : 'POST',
			style_path : '/css/equipage.css'
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
