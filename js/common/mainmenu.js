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
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsMainmenuOpen' : 'openMenu',
			'touch .jsMainmenuClose' : 'closeMenu',
			'touchstart .jsMainmenu, .jsMainmenuBG' : 'cannotScroll'
		},
		cannotScroll : function(){
			event.preventDefault();
		},
		openMenu : function(){
			var $el = $('.jsMainmenu');
			$el.show().css({
				'top' : window.pageYOffset + 'px',
				'-webkit-transform' : 'translate(0px, 0px)'
			});
			$('.jsMainmenuBG').show().css({
				'top' : window.pageYOffset+'px',
				'height' : window.screen.height+'px'
			});
			if( window.pageYOffset === 0 ) window.scrollTo(0, 0);
		},
		closeMenu : function(){
			var $el = $('.jsMainmenu');
			if( $el.css('display')=='none' ) return;
			$el.css({
				'-webkit-transform' : 'translate(0px, -400px)'
			});
			$('.jsMainmenuBG').hide();
			_.delay(function(){
				$el.hide();
			}, 300);
		}
	});
	return View;
});
