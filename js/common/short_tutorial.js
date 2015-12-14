define(function(){
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonCloseShortTutorial' : 'closeShortTutorial'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		closeShortTutorial : function(){
			$('.jsShortTutorial').remove();
			$('.jsNormalView').show();
			window.scrollTo(0, 0);
		}
	});
	return View;
});
