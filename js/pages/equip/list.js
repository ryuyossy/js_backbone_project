define([
	'common/page',
	'components/equip/equip_list'
], function(
	PageClass,
	EquipList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '武具',
			data_path : '/equip/list',
			template_path : '/tmpl/equip/list.html',
			style_path : '/css/equip.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'equip_list' : EquipList
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
