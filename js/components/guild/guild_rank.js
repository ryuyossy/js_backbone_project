define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var parameter = {
				el : '.jsRankingList',
				template : '#jsTemplateRanking',
				more_flg_name : 'rank_more_flg',
				data_path : page.model.getDataPath('/guild/rank/more_list')
			};
			var Ranking = new page.list(parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



