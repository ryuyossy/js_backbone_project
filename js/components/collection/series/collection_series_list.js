define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var parameter = {
				el : '.jsSeriesList',
				template : '#jsTemplateSeries',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/collection/series/list')
			};
			var series_list = new page.list(parameter);
			self.model.set({series_list : series_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



