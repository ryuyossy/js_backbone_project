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
						component : comp.alchemy_canvas,
						after : {
							type : 'element',
							dest : '#jsAlchemyResult'
						},
						height : 320,
						end_frame : -20
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