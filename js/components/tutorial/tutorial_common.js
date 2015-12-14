define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.setFullScreen);
			self.trigger('initialize');
		},
		setFullScreen : function(){
			$('#globalHeader').hide();
			$('#globalFooter').hide();
			$('#footer').hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});



