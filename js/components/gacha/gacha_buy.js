define(function(){
	// ガチャ購入確認ページに遷移
	var page, page_data;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonJumpToBuyGacha' : 'jumpToBuyGacha',
			'touch .jsButtonUseGachaTicket' : 'useGachaTicket'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
		},
		jumpToBuyGacha : function(e){
			var form_target = [
				'GachaBuyConfirm',
				'GachaBuyDrawSingle',
				'GachaBuyDrawMulti'
			];
			var $el = $(e.currentTarget);
			var url = 'gacha/buy/confirm/';
			url += $el.attr('data-gacha-id') + '/';
			url += $el.attr('data-equip-num') + '/';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		},
		useGachaTicket : function(e){
			var form_target = [
				'GachaBuyDrawSingle',
				'GachaBuyDrawMulti'
			];
			var $el = $(e.currentTarget);
			var equip_num = $el.attr('data-equip-num');
			var url = 'gacha/buy/draw-';
			url += equip_num-0 > 1 ? 'multi/' : 'single/';
			url += $el.attr('data-gacha-id') + '/';
			url += 'TICKET/';
			url += equip_num-0 > 1 ? equip_num + '/' : '';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});