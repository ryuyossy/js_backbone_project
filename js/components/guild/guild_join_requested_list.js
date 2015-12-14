define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
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
				el : '#jsGuildJoinRequestedList',
				template : '#jsTemplateGuildJoinRequestedList',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/guild/invite/user/list')
			};
			var join_requested_list = new page.list(parameter);
			self.model.set({join_requested_list : join_requested_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



