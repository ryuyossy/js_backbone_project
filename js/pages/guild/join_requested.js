define([
	'common/page',
	'components/guild/guild_join_requested_list',
	'components/guild/guild_join_accept'
], function(
	PageClass,
	GuildJoinRequestedList,
	GuildjoinAccept
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド加入希望者一覧',
			data_path : '/guild/invite/user/list',
			template_path : '/tmpl/guild/join_requested.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'list' : GuildJoinRequestedList,
			'join_accept' : GuildjoinAccept
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