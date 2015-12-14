define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsTutorialSpotlight',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on({
				'initialize' : self.initializeCanvas
			});
			self.trigger('initialize');
		},
		initializeCanvas : function(){
			var self = this;
			self.$el.attr({
				'width' : '320',
				'height' : '480'
			});
			self.model.set({
				'ctx' : self.el.getContext('2d')
			});
		},
		renderBlackout : function(){
			var self = this;
			var ctx = self.model.get('ctx');
			self.$el.show();
			ctx.clearRect(0, 0, 320, 480);
			self.el.width = '320';
			self.el.height = '480';
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillRect(0, 0, 320, 480);
		},
		renderSpotlight : function(option){
			var self = this;
			var ctx = self.model.get('ctx');
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = 'rgba(0, 0, 0, 1)';
			ctx.scale(option.scaleX || 1, option.scaleY || 1);
			ctx.beginPath();
			ctx.arc(option.x, option.y, option.radius, 0, Math.PI*2, false);
			ctx.fill();
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
