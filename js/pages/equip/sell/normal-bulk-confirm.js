define([
	'common/page',
	'components/equip/equip_sell_confirm_list'
], function(
	PageClass,
	EquipSellConfirmList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ノーマル以下一括売却確認',
			data_path : '/equip/sell/normal_bulk_confirm',
			template_path : '/tmpl/equip/sell/confirm.html',
			style_path : '/css/equip.css',
			redirect_url : 'equip/sell/list/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'equip_sell_confirm_list' : EquipSellConfirmList
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