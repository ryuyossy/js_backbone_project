define([
	'common/page',
	'components/greet/greet',
	'components/guild/guild_invite',
	'components/battle/cheer_members',
	'components/profile/other'
], function(
	PageClass,
	Greet,
	GuildInvite,
	CheerMembers,
	Other
){
	// 他人のプロフィール
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'プロフィール',
			data_path : '/prof/else_user',
			template_path : '/tmpl/profile/other.html',
			style_path : '/css/prof.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'greet' : Greet,
			'invite' : GuildInvite,
			'cheer' : CheerMembers,
			'other' : Other
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});