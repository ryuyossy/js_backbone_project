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
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
		}
	});
	var View = Backbone.View.extend({
		model : new Model(),
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('initialize', self.bindEvents);
			self.trigger('initialize');
		},
		// パフォーマンス優先のためeventsを利用せず直書きで
		bindEvents : function(){
			var self = this;
			$('body')
			.on('touchstart', '[data-href]', self.changeToOnImage)
			.on('touchmove', '[data-href]', function(e){
				self.changeToOffImage(e);
				self.model.set({'is_moved' : true});
			})
			.on('touchend', '[data-href]', function(e){
				self.model.set({'is_moved' : false});
				_.delay(function(){
					self.changeToOffImage(e);
				}, 1000);
			})
			
			.on('touchstart', '.link:not([data-href]), .btn:not([data-href]), .btn_l:not([data-href]), button:not([data-href])', self.changeToOnImage)
			.on('touchmove', '.link:not([data-href]), .btn:not([data-href]), .btn_l:not([data-href]), button:not([data-href])', function(e){
				self.changeToOffImage(e);
			})
			.on('touchend', '.link:not([data-href]), .btn:not([data-href]), .btn_l:not([data-href]), button:not([data-href])', function(e){
				self.changeToOffImage(e);
			});
		},
		changeToOnImage : function(e){
			$(e.currentTarget).addClass('on');
		},
		changeToOffImage : function(e){
			var is_moved = this.model.get('is_moved');
			if( is_moved ) return;
			$(e.currentTarget).removeClass('on');
		}
	});
	return View;
});