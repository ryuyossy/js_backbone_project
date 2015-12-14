define([
	'common/page',
	'components/equip/equip_sell_list',
	'components/equip/equip_sell_submit',
	'components/equip/equip_sell_normal_bulk'
], function(
	PageClass,
	EquipSellList,
	EquipSellSubmit,
	EquipSellNormalBulk
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '一括売却',
			data_path : '/equip/list',
			ajax_data : {
				'sort_type' : 'RARITY_ASC'
			},
			template_path : '/tmpl/equip/sell/list.html',
			style_path : '/css/equip.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'equip_sell_list' : EquipSellList,
			'equip_sell_submit' : EquipSellSubmit,
			'equip_sell_normal_bulk' : EquipSellNormalBulk
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