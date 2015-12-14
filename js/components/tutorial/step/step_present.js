define(function(){
	var page, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialEquip',
		events : {
			'touch .jsTutorialEquip' : 'end'
		},
		frames : [
			'renderIntroductionElder',
			'renderIntroductionNavico',
			'renderMessageElderBeforeBattle',
			'renderMessageElderPresent',
			'renderPresents'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			self.on('initialize', self.model.setIsLoaded);
			self.trigger('initialize');
		},
		start : function(){
			var user = page.model.get('user') || page.model.get('page_data');
			var user_name = user.user_name;
			$('.jsTutorialMain').show();
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : user_name + 'さんかぁ〜。<br>良い名前だね！'
			});
			routing.trigger('waitAction');
		},
		renderIntroductionElder : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'text' : '申し遅れたが俺の名はアラン！新人ガーディアンの研修を担当している。'
			});
			routing.trigger('waitAction');
		},
		renderIntroductionNavico : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : 'あたしはフィオよ。<br>ガーディアンのことなら何でも知ってるんだから！'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderBeforeBattle : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'text' : 'よし、さっそくバトルの研修を始めるぞ。'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderPresent : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : true,
				'text' : 'まずは入隊記念に武具をプレゼントしよう。<br>これを装備して戦場へ向かうぞ！'
			});
			routing.trigger('waitAction');
		},
		renderPresents : function(){
			$('.jsTutorialMain').hide();
			$('.jsTutorialPresentEquip').show();
			routing.trigger('waitInput');
		},
		end : function(){
			$('.jsTutorialMain').hide();
			routing.trigger('submit');
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
