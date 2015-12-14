define([
	'zepto',
	'lodash',
	'backbone',
	'backbone-helper'
], function(
	$,
	_,
	Backbone
){
	var Model = Backbone.Model;
	var View = Backbone.View.extend({
		el : '#jsLoader',
		$inner : $('#jsLoaderInner'),
		$animation : $('#jsLoaderAnimation'),
		$text : $('#jsLoaderText'),
		$elS : $('#jsLoaderS'),
		$innerS : $('#jsLoaderInnerS'),
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.$el.on('touchstart', function(){
				event.preventDefault();
			});
		},
		startLoading : function(){
			var self = this;
			var is_first = self.model.get('is_first');
			if( is_first ){
				self.startLoadingL();
			} else {
				self.startLoadingS();
			}
		},
		startLoadingL : function(){
			var self = this;
			$('#jsLoaderTransparent').show();
			self.$el.show();
			self.$inner.show().css({
				'top' : window.scrollY + window.innerHeight/2 - 60/2 - 20 + 'px',
				'left' : window.innerWidth/2 - 120/2 - 10 + 'px'
			});
			self.$animation.css({
				'top' : '10px',
				'left' : '10px'
			});
			self.$text.css({
				'top' : '72px',
				'left' : '10px'
			});
		},
		startLoadingS : function(){
			var self = this;
			$('#jsLoaderTransparent').show().css({
				'height' : document.body.scrollHeight + 'px'
			});
			self.$elS.show().css({
				'top' : window.scrollY + window.innerHeight/2 - 64/2 - 20 + 'px',
				'left' : window.innerWidth/2 - 64/2 + 'px'
			});
		},
		endLoading : function(){
			var self = this;
			self.$inner.hide();
			self.$el.hide();
			self.$elS.hide();
			$('#jsLoaderTransparent').hide();
			window.scrollTo(0, 0);
		}
	});
	return {
		Model : Model,
		View : View
	};
});