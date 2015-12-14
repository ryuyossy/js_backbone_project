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
				el : '#messageList',
				template : '#jsTemplateMessage',
				more_flg_name : 'messages_more_flg',
				data_path : page.model.getDataPath('/message/more_list')
			};
			var message_list = new page.list(parameter);
			self.model.set({message_list : message_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



