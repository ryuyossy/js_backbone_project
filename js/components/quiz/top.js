define(function(){
	// クイズトップ
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .quizListCnt' : 'applyTouchedEffect'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		applyTouchedEffect : function(e){
		}
	});
	return {
		Model : Model,
		View : View
	};
});
