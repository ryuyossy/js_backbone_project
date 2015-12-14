define(function(){
	// ノーマルガチャ引くページに遷移
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonJumpToNormalGacha' : 'jumpToNormalGacha'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		jumpToNormalGacha : function(e){
			var form_target = [
				'GachaNormalDrawSingle',
				'GachaNormalDrawMulti'
			];
			var $el = $(e.currentTarget);
			var equip_num = $el.attr('data-equip-num');
			var url = 'gacha/normal/draw-';
			url += equip_num-0 > 1 ? 'multi/' : 'single/';
			url += $el.attr('data-gacha-id') + '/';
			url += equip_num ? equip_num + '/' : '';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});