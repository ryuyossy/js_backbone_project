define(function(){
	var page, page_data, routing;
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
			'renderMessageNavico',
			'renderMessageUseAbility',
			'spotCombo',
			'renderMessageComboChance',
			'spotButtonAbility',
			'spotButtonAbilityInner',
			'renderGauge',
			'playAbilityAnimation',
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
		start : function(){
			$('.jsTutorialBattleBP').text(1769);
			$('.jsTutorialBattle').show();
			routing.trigger('setCombo', {
				num : 4,
				is_chance : true,
				time : '09:58'
			});
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'すごいじゃないか！<br>さっそくアビリティを覚えるとは、なかなか優秀だ！！'
			});
			routing.trigger('waitAction');
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
		renderMessageNavico : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'is_blackout' : true,
				'text' : 'アビリティは、強力なダメージを与えるものから仲間を助けるものまで色々あるのよ。'
			});
			routing.trigger('waitAction');
		},
		renderMessageUseAbility : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : '本当はバトルが始まる前に装備してなくちゃいけないんだが、今回は特別に使えるようにしてやろう。'
			});
			routing.trigger('waitAction');
		},
		spotCombo : function(){
			routing.trigger('setSpotlight', {
				x : 40,
				y : 300,
				radius : 60,
				scaleY : 0.6
			});
			routing.trigger('waitInput');
			routing.trigger('wait', 2000);
		},
		renderMessageComboChance : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : 'ちょうどコンボチャンスだ。<br>さっそく覚えたアビリティで、コンボを繋いでみろ！'
			});
			routing.trigger('waitAction');
		},
		spotButtonAbility : function(){
			routing.trigger('setSpotlight', {
				x : 160,
				y : 545,
				radius : 60,
				scaleY : 0.5
			});
			routing.trigger('setArrow', {
				x : 128,
				y : 170
			});
			routing.trigger('waitInput');
			routing.trigger('waitAction');
		},
		spotButtonAbilityInner : function(){
			$('.ability_close').removeClass('ability_close').addClass('ability_open')
			.removeClass('off').addClass('on');
			$('.jsAbilityList').show();
			routing.trigger('setSpotlight', {
				x : 250,
				y : 805,
				radius : 60,
				scaleY : 0.5
			});
			routing.trigger('setArrow', {
				x : 218,
				y : 300
			});
			routing.trigger('waitInput');
			routing.trigger('waitAction');
		},
		renderGauge : function(){
			var self = this;
			var user = page.model.get('user') || page_data;
			var src_avatar = page_data.img_url_root + '/assets/attackgauge_id';
			src_avatar += user.avatar_id + '.png';
			$('.jsTutorialGaugeAvatar').attr('src', src_avatar);
			var src_title = page_data.img_url_root + '/assets/gauge_abilityTitle_';
			src_title += '118.png';
			$('.jsTutorialGaugeTitle').attr('src', src_title);
			$('.jsTutorialGauge').show();
			self.$el.hide();
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		playAbilityAnimation : function(){
			$('.jsTutorialGauge').hide();
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		end : function(){
			$('.ability_open').addClass('ability_close').removeClass('ability_open')
			.addClass('off').removeClass('on');
			$('.jsAbilityList').hide();
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
