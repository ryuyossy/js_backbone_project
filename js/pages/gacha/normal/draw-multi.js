define([
	'common/page',
	'components/gacha/gacha_animation',
	'components/gacha/gacha_canvas',
	'components/gacha/gacha_sell'
], function(
	PageClass,
	GachaAnimation,
	GachaCanvas,
	GachaSell
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ガチャ結果',
			data_path : '/gacha/normal/draw',
			template_path : '/tmpl/gacha/normal/draw-multi.html',
			style_path : ['/css/gacha.css', '/css/equip.css'],
			ajax_type : 'POST',
			redirect_url : 'gacha/'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				type : 'normal'
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : GachaAnimation,
			gacha_canvas : GachaCanvas,
			sell : GachaSell
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.on('bindEvents', comp.animation.initializeAnimation);
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});