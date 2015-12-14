define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.validateGuild);
			self.trigger('initialize');
		},
		validateGuild : function(){
			var self = this;
			var data = page.model.get('page_data');
			if (data.guild_id !== data.user.guild_id) return;
			_.delay(function(){
				page.trigger('changeURL', 'guild/', true);
			}, 20);
		}
	});
	return {
		Model : Model,
		View : View
	};
});