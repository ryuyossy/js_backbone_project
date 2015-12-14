define(function(){
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialCombo',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.trigger('initialize');
		},
		render : function(option){
			var template = $('#jsTemplateTutorialCombo').html();
			var html = $.templates(template).render(option);
			this.$el.html(html).show();
		},
		hide : function(){
			this.$el.hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});
