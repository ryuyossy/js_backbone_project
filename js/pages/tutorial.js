define([
	'common/page',
	'components/tutorial/tutorial_routing',
	'components/tutorial/tutorial_common',
	'components/tutorial/tutorial_touch',
	'components/tutorial/tutorial_guide',
	'components/tutorial/tutorial_spotlight',
	'components/tutorial/tutorial_arrow',
	'components/tutorial/tutorial_combo',
	'components/tutorial/tutorial_animation'
], function(
	PageClass,
	TutorialRouting,
	TutorialCommon,
	TutorialTouch,
	TutorialGuide,
	TutorialSpotlight,
	TutorialArrow,
	TutorialCombo,
	TutorialAnimation
){
	// ＜チュートリアルToDo＞
	// ・エラー処理
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'チュートリアル',
			template_path : '/tmpl/tutorial/tutorial.html',
			data_path : '/tutorial/get',
			style_path : ['/css/tutorial.css', '/css/battle.css', '/css/gauge.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			routing : TutorialRouting,
			common : TutorialCommon,
			touch : TutorialTouch,
			guide : TutorialGuide,
			spotlight : TutorialSpotlight,
			arrow : TutorialArrow,
			combo : TutorialCombo,
			animation : TutorialAnimation
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			comp.touch.on({
				'touch' : function(){
					comp.spotlight.hide();
					comp.arrow.hide();
					comp.routing.model.goToNextFrame();
				}
			});
			comp.routing.on({
				'waitAction' : function(){
					comp.touch.enableTouch();
					comp.touch.show();
				},
				'waitInput' : function(){
					comp.touch.hide();
					comp.guide.hide();
				},
				'waitTouchButton' : comp.touch.hide,
				'submit' : comp.touch.show,
				'setGuide' : function(option){
					comp.guide.render(option);
					if( option.is_blackout ) comp.spotlight.renderBlackout();
				},
				'setSpotlight' : function(option){
					comp.spotlight.renderBlackout();
					comp.spotlight.renderSpotlight(option);
				},
				'setArrow' : comp.arrow.render,
				'setCombo' : comp.combo.render,
				'playAnimation' : function($next){
					comp.animation.showFullScreen($next);
					comp.animation.play($next);
				},
				'goToNextStep' : function(){
					comp.animation.hideFullScreen();
					comp.guide.hide();
					comp.routing.model.goToNextStep();
				},
				'join' : function(){
					comp.animation.model.setAnimationData();
					comp.animation.initAnimation();
				}
			});
			comp.routing.model.on({
				'change:current_step' : function(){
					var current_step = comp.routing.model.get('current_step');
					var max_step = comp.routing.model.get('steps').length - 1;
					comp.guide.renderGerge(current_step, max_step);
				},
				'setStep' : function(){
					var current_step = comp.routing.model.get('current_step');
					var max_step = comp.routing.model.get('steps').length - 1;
					comp.guide.renderGerge(current_step, max_step);
				}
			});
			comp.animation.model.on({
				'endAnimation' : comp.routing.model.goToNextFrame
			});
			comp.animation.on({
				'touchButton' : comp.routing.model.goToNextFrame
			});
			self.on({
				'bindEvents' : function(){
					comp.routing.model.setStep();
					comp.touch.initializeTouchElement();
				}
			});
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});