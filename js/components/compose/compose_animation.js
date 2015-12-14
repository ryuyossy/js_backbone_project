define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
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
						component : comp.compose_canvas,
						after : {
							type : 'element',
							dest : '#jsComposeResult'
						},
						height : 480
					}
				]
			};
			page.trigger('setAnimation', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});