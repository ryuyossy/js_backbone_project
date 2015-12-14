define(function(){
	var page, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialBattle',
		events : {
		},
		frames : [
			'renderMessageElderBattleEnd',
			'renderMessageElderBattleTime',
			'renderMessageNavico',
			'end'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'ready' : function(){
					self.renderUserData();
					self.startAnimation();
				},
				'initialize' : function(){
					self.model.setIsLoaded();
					routing.renderReloadTime();
				}
			});
			self.trigger('initialize');
		},
		renderUserData : function(){
			var user = page.model.get('user') || page_data;
			var user_name = user.user_name;
			var img_root = RS.get('img_url_root', false);
			var img_src = img_root + '/avatar/' + user.avatar_id + '_140.png';
			$('.jsTutorialBattleUserName').text(user_name);
			$('.jsTutorialBattleAvatar').attr('src', img_src);
		},
		startAnimation : function(){
			routing.trigger('playAnimation', this.$el);
		},
		start : function(){
			$('.jsTutorialBattle').show();
			routing.trigger('wait', 2000);
		},
		renderMessageElderBattleEnd : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'よし、今日は研修ということでここらでバトル終了だ。'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderBattleTime : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : '毎日４回決まった時間に１時間のバトルがあるから、忘れずに参加してくれよ。'
			});
			routing.trigger('waitAction');
		},
		renderMessageNavico : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : '参加するだけでも報酬をもらえるのよ。もちろん、勝った方が良いものをもらえるけどね！'
			});
			routing.trigger('waitAction');
		},
		end : function(){
			$('.jsTutorialBattle').hide();
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
