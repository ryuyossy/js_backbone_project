define([
	'common/page',
	'components/guild/guild_settings',
	'components/guild/guild_bbs',
	'components/guild/guild_bbs_remove',
	'components/guild/guild_leave'
], function(
	PageClass,
	GuildSettings,
	GuildBBS,
	GuildBbsRemove,
	GuildLeave
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド',
			data_path : '/guild/top/self',
			template_path : '/tmpl/guild/guild.html',
			style_path : ['/css/guild.css', '/css/short_tutorial.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			'settings' : GuildSettings,
			'bbs' : GuildBBS,
			'bbs_remove' : GuildBbsRemove,
			'leave' : GuildLeave
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