define(function(){
	// ボス準備ページに遷移
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonJumpToBossReady' : 'jumpToBossReady'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
		},
		jumpToBossReady : function(e){
			var form_target = [
				'MissionBossReady',
				'MissionBossResult',
				'MissionPartnerAdd',
				'MissionPartnerChange'
			];
			var $el = $(e.currentTarget);
			var url = 'mission/boss/ready/';
			url += page_data.stage.stage_id + '/';
			url += $el.attr('data-field-id') + '/';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});