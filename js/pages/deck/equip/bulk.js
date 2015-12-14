define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '一括装備完了',
			data_path : '/deck/equip/bulk',
			template_path : '/tmpl/deck/equip/bulk_complete.html',
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
