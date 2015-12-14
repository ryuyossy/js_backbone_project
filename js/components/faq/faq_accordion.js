define(function(){
	//よくあるご質問アコーディオン
	var page;
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsAccordionButton' : 'accordion',
			'touchstart .jsAccordionButton' : 'addOnClass',
			'touchend .jsAccordionButton' : 'removeOnClass'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		accordion : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			var $inner = $el.find('.jsAccordionInner');
			var isOpen = $el.hasClass('open');
			$el.removeClass(isOpen ? 'open' : 'close').addClass('on');
			isOpen ? $inner.hide() : $inner.show();
			$el.removeClass('on').addClass(isOpen ? 'close' : 'open');
		},
		addOnClass : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			$el.addClass('on');
		},
		removeOnClass : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			$el.removeClass('on');
		}
	});
	return {
		Model : Model,
		View : View
	};
});



