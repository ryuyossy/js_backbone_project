define(function(){
	// ボス準備ページに遷移
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonJumpToSellNormalBulk' : 'jumpToSellNormalBulk'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
		},
		jumpToSellNormalBulk : function(){
			var form_target = [
				'EquipSellNormalBulkConfirm',
				'EquipSellComplete'
			];
			var url = 'equip/sell/normal-bulk-confirm/';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});