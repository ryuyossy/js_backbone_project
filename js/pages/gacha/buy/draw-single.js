define([
	'common/page',
	'components/gacha/gacha_animation',
	'components/gacha/gacha_canvas',
	'components/gacha/season_avatar_emblem_get_canvas',
	'components/gacha/season_avatar_get_canvas',
	'components/equip/equip_control'
], function(
	PageClass,
	GachaAnimation,
	GachaCanvas,
	SeasonAvatarEmblemGetCanvas,
	SeasonAvatarGetCanvas,
	EquipControl
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'レアガチャ',
			data_path : '/gacha/buy/draw',
			template_path : '/tmpl/gacha/buy/draw-single.html',
			style_path : '/css/gacha.css',
			ajax_type : 'POST',
			redirect_url : 'gacha/buy/'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				type : 'rare'
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : GachaAnimation,
			gacha_canvas : GachaCanvas,
			season_avatar_emblem_get_canvas : SeasonAvatarEmblemGetCanvas,
			season_avatar_get_canvas0 : SeasonAvatarGetCanvas,
			season_avatar_get_canvas1 : SeasonAvatarGetCanvas,
			season_avatar_get_canvas2 : SeasonAvatarGetCanvas,
			equip_control : EquipControl
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