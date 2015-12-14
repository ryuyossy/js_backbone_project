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
				el : '.jsGuildInvitedList',
				template : '#jsTemplateGuildInvitedList',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/guild/invite/guild/list')
			};
			var invited_list = new page.list(parameter);
			self.model.set({invited_list : invited_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



