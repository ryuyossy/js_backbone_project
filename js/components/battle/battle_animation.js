define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		initializeAnimation : function(){
			var comp = page.components;
			var parameter = {
				playlist : [
					{
						component : comp.battle_canvas
					}
				]
			};
			page.trigger('setAnimation', parameter);
		},
		forward : function(){
			page.trigger('forwardAnimation');
		}
	});
	return {
		Model : Model,
		View : View
	};
});