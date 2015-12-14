define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.validateUser);
			self.trigger('initialize');
		},
		validateUser : function(){
			var self = this;
			var data = page.model.get('page_data');
			if (data.user_id !== data.user.user_id) return;
			_.delay(function(){
				page.trigger('changeURL', 'profile/', true);
			}, 20);
		}
	});
	return {
		Model : Model,
		View : View
	};
});