define(function(){
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialTapArrow',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.trigger('initialize');
		},
		render : function(option){
			var self = this;
			self.$el.show().css({
				'left' : option.x + 'px',
				'top' : option.y + 'px'
			});
			if( option.is_up ){
				self.$el.addClass('tapArrow_up').removeClass('tapArrow');
			} else {
				self.$el.addClass('tapArrow').removeClass('tapArrow_up');
			}
			if( _.isNumber(option.rotate) ) return;
			self.$el.css({
				'-webkit-transform' : 'rotate(' + option.rotate + 'deg)'
			});
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
