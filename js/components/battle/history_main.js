define(function(){
	var page;
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#jsBattleHistory',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;

			var parameter = {
				el : '#jsBattleHistory',
				template : '#jsTemplateBattleHistoryList',
				data_path : page.model.getDataPath('/battle/history/list'),
				ajax_type : 'GET',
				more_flg_name : 'more_flg'
			};
			var list = new page.list(parameter);

			self.trigger('initialize');
		}
	});
	return {
		Model : Model,
		View : View
	};
});