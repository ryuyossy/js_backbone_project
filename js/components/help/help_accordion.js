define(function(){
	//ヘルプ一覧アコーディオン
	var page;
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#help',
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
			var $el = $(e.currentTarget);
			var $accordion = $el.parents('.jsAccordion');
			var $inner = $accordion.find('.jsAccordionInner');
			var isOpen = $accordion.hasClass('open');
			$accordion.removeClass(isOpen ? 'open' : 'close');
			isOpen ? $inner.hide() : $inner.show();
			$accordion.addClass(isOpen ? 'close' : 'open');
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
