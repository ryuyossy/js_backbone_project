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
			'playElderAbilityAnimation',
			'renderMessageElderAfterAbility',
			'renderMessageNavicoBP',
			'renderMessageElderLast',
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
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : 'お前の攻撃を見ていたら、体がうずいてきたぜ！<br>俺も先輩らしい所を見せないとなっ！'
			});
			routing.trigger('waitAction');
		},
		playElderAbilityAnimation : function(){
			var self = this;
			self.$el.hide();
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		renderMessageElderAfterAbility : function(){
			$('.jsTutorialBattleBP').text(22223);
			$('.jsTutorialBattle').show();
			routing.trigger('setCombo', {
				num : 6,
				is_chance : true,
				time : '09:58'
			});
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'ははは！どうだ！<br>大量BP獲得だ！'
			});
			routing.trigger('playAnimation', this.$el);
			routing.trigger('waitAction');
		},
		renderMessageNavicoBP : function(){
			routing.trigger('setSpotlight', {
				x : 60,
				y : 70,
				radius : 60,
				scaleY : 0.4
			});
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : 'アラン、さすがね！<br>バトル中に多くのBPを獲得した方のギルドが勝利するのよ。'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderLast : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : 'お前もバトルで腕を磨いて行けばどんどん強力なアビリティを覚えることが出来るぞ！'
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
