define(function(){
	var page;
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsOtherRewardBtn' : 'scrollToRewardList',
			'touch .jsCautionBtn' : 'scrollToCautionSection'
		},
		initialize : function(){
			var self = this;
			page = self.page;
		},
		scrollToRewardList : function(){
			var y = $('.jsRewardList')[0].offsetTop;
			window.scrollTo(0, y);
		},
		scrollToCautionSection : function(){
			var y = $('.jsCautionSection')[0].offsetTop;
			window.scrollTo(0, y);
		}
	});
	return {
		Model : Model,
		View : View
	};
});