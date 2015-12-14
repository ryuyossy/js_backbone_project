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
			var self = this;
			var parameter = {
				el : '#newArrival',
				template : '#jsTemplateNewArrival',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/new_user/more_list')
			};
			var new_users = new page.list(parameter);
			self.model.set({new_users : new_users});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



