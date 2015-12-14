define([
	'common/page',
	'components/guild/guild_invite',
	'components/guild/guild_candidate_list'
], function(
	PageClass,
	GuildInvite,
	GuildCandidateList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'おすすめユーザー一覧',
			data_path : '/guild/candidate/user/list',
			template_path : '/tmpl/guild/candidate.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'invite' : GuildInvite,
			'list' : GuildCandidateList
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