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
			'renderMessageElder',
			'spotButtonAttack',
			'renderGauge',
			'playAttackAnimation',
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
			$('.jsTutorialPresentEquip').hide();
			$('.jsTutorialBattle').show();
			routing.trigger('wait', 3000);
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
		renderMessageElder : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : true,
				'is_blackout' : true,
				'text' : 'ここが戦場だ！<br>さっそく実践練習といくぞ！<br>まずは攻撃を仕掛けてみろ！'
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
		playAttackAnimation : function(){
			$('.jsTutorialGauge').hide();
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
