define([
	'common/page',
	'components/equip/equip_control'
], function(
	PageClass,
	EquipControl
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '武具詳細',
			data_path : '/equip/detail',
			template_path : '/tmpl/equip/detail.html',
			style_path : '/css/equip.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'equip_control' : EquipControl
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
