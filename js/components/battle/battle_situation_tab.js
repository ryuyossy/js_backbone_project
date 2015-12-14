define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '.jsBattleSituation',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var page_data = page.model.get('page_data');
			var parameter = [
				{
					template : '#jsTemplateBattleAllSituation',
					data_path : page.model.getDataPath('/battle/situation/list'),
					ajax_data : {
						date : page_data.date_param,
						round : page_data.round,
						me_flg : false
					},
					more_flg_name : 'more_flg',
					is_default : true,
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateBattleOwnSituation',
					data_path : page.model.getDataPath('/battle/situation/list'),
					ajax_data : {
						date : page_data.date_param,
						round : page_data.round,
						me_flg : true
					},
					more_flg_name : 'more_flg',
					is_reloadable : true,
					is_cacheable : true
				}
			];
			page.trigger('setTabs', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
