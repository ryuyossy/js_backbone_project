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
			'renderMessageNavicoJEX',
			'renderMessageBeCarefulMember',
			'renderMessageTouchReload',
			'spotButtonReload',
			'showLoading',
			'spotCombo',
			'renderMessageElder',
			'renderMessageLetsAttack',
			'spotButtonAttack',
			'renderGauge',
			'playComboAnimation',
			'playGetAbilityAnimation',
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
				'spotCombo' : function(){
					routing.renderReloadTime();
				},
				'initialize' : function(){
					self.model.setIsLoaded();
					routing.renderReloadTime();
				}
			});
			self.trigger('initialize');
		},
		start : function(){
			$('.jsTutorialBattleBP').text(256);
			$('.jsTutorialBattle').show();
			routing.trigger('setCombo', {
				num : 1,
				is_chance : false,
				time : '09:58'
			});
			routing.trigger('setSpotlight', {
				x : 118,
				y : 798,
				radius : 50,
				scaleY : 0.5
			});
			routing.trigger('setGuide', {
				'character' : 'elder',
				'text' : '良い攻撃だ。<br>バトル中に行動を起こすと、JExを獲得出来るぞ！'
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
		renderMessageNavicoJEX : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'is_blackout' : true,
				'text' : 'JExがたまるとアビリティを覚えたり、新しいジョブに転職できたりするのよ！'
			});
			routing.trigger('waitAction');
		},
		renderMessageBeCarefulMember : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'バトルでは他メンバーの動きにも注意が必要だ！常に戦況を最新に保つよう心がけろ！'
			});
			routing.trigger('waitAction');
		},
		renderMessageTouchReload : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : '上にある更新ボタンを押せば、バトルの戦況が、最新の状態に更新されるのよ！'
			});
			routing.trigger('waitAction');
		},
		spotButtonReload : function(){
			routing.trigger('setSpotlight', {
				x : 160,
				y : 35,
				radius : 35,
				scaleY : 1
			});
			routing.trigger('setArrow', {
				x : 126,
				y : 85,
				is_up : true
			});
			routing.trigger('waitInput');
			routing.trigger('waitAction');
		},
		showLoading : function(){
			$('#jsLoader').css('background-color', '#544123');
			page.trigger('startDummyLoading');
			routing.trigger('waitInput');
			routing.trigger('wait', 2000);
		},
		spotCombo : function(){
			$('#jsLoader').css('background-color', '');
			page.trigger('endDummyLoading');
			$('.jsTutorialBattleBP').text(1561);
			routing.trigger('setCombo', {
				num : 2,
				is_chance : true,
				time : '09:58'
			});
			routing.trigger('setSpotlight', {
				x : 40,
				y : 300,
				radius : 60,
				scaleY : 0.6
			});
			routing.trigger('waitInput');
			routing.trigger('wait', 2000);
			this.trigger('spotCombo');
		},
		renderMessageElder : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'おっ！<br>仲間が攻撃したみたいだな！'
			});
			routing.trigger('waitAction');
		},
		renderMessageLetsAttack : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : true,
				'is_blackout' : true,
				'text' : '残り時間内に攻撃を仕掛けると、コンボが発生するぞ！<br>さぁもう一度攻撃だ！'
			});
			routing.trigger('waitAction');
		},
		spotButtonAttack : function(){
			routing.trigger('setSpotlight', {
				x : 67,
				y : 545,
				radius : 60,
				scaleY : 0.5
			});
			routing.trigger('setArrow', {
				x : 35,
				y : 170
			});
			routing.trigger('waitInput');
			routing.trigger('waitAction');
		},
		renderGauge : function(){
			var self = this;
			var user = page.model.get('user') || page_data;
			var src = page_data.img_url_root + '/assets/attackgauge_id';
			src += user.avatar_id + '.png';
			$('.jsTutorialGaugeAvatar').attr('src', src);
			$('.jsTutorialGauge').show();
			self.$el.hide();
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		playComboAnimation : function(){
			$('.jsTutorialGauge').hide();
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		playGetAbilityAnimation : function(){
			routing.trigger('playAnimation');
			routing.trigger('waitInput');
		},
		end : function(){
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
