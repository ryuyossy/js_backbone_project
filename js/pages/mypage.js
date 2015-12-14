define([
	'common/page',
	'components/common/labi',
	'components/mypage/mypage_top',
	'components/mypage/waiting_notice',
	'components/mypage/mypage_animation',
	'components/mypage/season_avatar_canvas',
	'components/mypage/guild_rank_canvas',
	'components/guild/guild_bbs',
	'components/guild/guild_bbs_remove',
	'components/greet/greet'
], function(
	PageClass,
	Labi,
	MypageTop,
	WaitingNotice,
	MypageAnimation,
	SeasonAvatarCanvas,
	GuildRankCanvas,
	GuildBbs,
	GuildBbsRemove,
	Greet
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'マイページ',
			data_path : '/mypage/get',
			template_path : '/tmpl/mypage.html',
			style_path : ['/css/mypage.css', '/css/tutorial.css']
		},
		initialize : function(){
			var self = this;
			self._super();
//			this.set({
//				ajax_data : {
//					user_name : this.user.get('user_name')
//				}
//			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			labi : Labi,
			top : MypageTop,
			waiting_notice : WaitingNotice,
			animation : MypageAnimation,
			season_avatar_canvas: SeasonAvatarCanvas,
			guild_rank_canvas: GuildRankCanvas,
			guild_bbs : GuildBbs,
			guild_bbs_remove : GuildBbsRemove,
			greet : Greet
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



