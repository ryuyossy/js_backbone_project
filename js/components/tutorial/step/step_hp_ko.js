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
			'renderMessageNavico',
			'renderMessageNavico2',
			'spotButtonHealing',
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
			$('.jsTutorialBattleBP').text(2225);
			$('.jsTutorialBattle').show();
			routing.trigger('setCombo', {
				num : 5,
				is_chance : false,
				time : '09:58'
			});
			routing.trigger('setGuide', {
				'character' : 'elder',
				'is_blackout' : true,
				'text' : 'すっかりサマになってきたな！今の攻撃で、相手が気絶したみたいだぞ！'
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
			routing.trigger('setSpotlight', {
				x : 175,
				y : 2390,
				radius : 106,
				scaleY : 0.15
			});
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : '攻撃を受けてHPが0になると、気絶して行動することが出来なくなっちゃうの。'
			});
			routing.trigger('waitAction');
		},
		renderMessageNavico2 : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'is_blackout' : true,
				'exist_button' : true,
				'text' : 'もし自分が気絶したら、HP回復ボタンを押せば、気絶から回復する事が出来るわよ。'
			});
			routing.trigger('waitAction');
		},
		spotButtonHealing : function(){
			routing.trigger('setSpotlight', {
				x : 252,
				y : 545,
				radius : 60,
				scaleY : 0.5
			});
			routing.trigger('waitInput');
			routing.trigger('wait', 2000);
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
