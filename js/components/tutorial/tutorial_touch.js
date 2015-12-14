define(function(){
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsTutorialTouch',
		events : {
			'touchstart #jsTutorialTouch' : 'cancelScroll',
			'touch [data-touchable="true"]' : 'touch'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on({
				'touch' : self.disableTouch,
				'initialize' : self.initializeTouchElement
			});
			self.trigger('initialize');
		},
		initializeTouchElement : function(){
			this.$el.css({
				'position' : 'absolute',
				'top' : '0',
				'left' : '0',
				'width' : window.innerWidth,
				'height' : window.innerHeight
			});
		},
		cancelScroll : function(){
			event.preventDefault();
		},
		touch : function(){
			this.trigger('touch');
		},
		enableTouch : function(){
			var self = this;
			_.delay(function(){
				self.$el.attr('data-touchable', 'true');
			}, 800);
		},
		disableTouch : function(){
			this.$el.attr('data-touchable', 'false');
		},
		show : function(){
			this.$el.show();
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
