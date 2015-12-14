define(function(){
	var page;
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsNavico' : 'toggleNavico',
			'touch .jsNotifyIcon' : 'scrollToNoticeList',
			'touch .jsRankingBtn' : 'scrollToRanking',
			'touch #fullScreen>.pause' : 'showLoginBonusPopup'
		},
		initialize : function(){
			var self = this;
			page = self.page;
			self.on('initialize', self.checkLoginBonus);
			self.trigger('initialize');
		},
		toggleNavico : function(){
			$('.jsNavicoMessage').toggle();
		},
		scrollToNoticeList : function(){
			var $systemInfo = $('.adminNoticeFirst')[0];
			var y;
			if ($systemInfo){
				y = $('.adminNoticeFirst')[0].offsetTop;
			} else {
				y = $('.jsNoticeList')[0].offsetTop;
			}
			window.scrollTo(0, y);
		},
		scrollToRanking : function(){
			var y = $('.jsRanking')[0].offsetTop;
			window.scrollTo(0, y);
		},
		showLoginBonusPopup : function(e){
			var self = this;
			var data = page.model.get('page_data');
			if (data.ticket_animation_id || data.avatar_animation_id) return;
			_.delay(self.openLoginBonusPopup, 500);
		},
		checkLoginBonus : function(){
			var self = this;
			var data = page.model.get('page_data');
			if (data.login_bonus === null ||
				(data.guild_rank_result ||
				data.ticket_animation_id ||
				data.avatar_animation_id)) return;
			_.delay(self.openLoginBonusPopup, 700);
		},
		openLoginBonusPopup : function(){
			var self = this;
			var data = page.model.get('page_data');
			if (data.login_bonus === null) return;
			var date = data.login_bonus.login_date.split('/');
			var parameter = {
				title : 'ログインボーナス',
				template : '#jsTemplatePopupLoginBonus',
				local_data : _.extend(
					data.login_bonus, {
						month : date[0] - 0,
						day   : date[1] - 0
					}
				)
			}
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
