define([
	'common/page',
	'components/guild/guild_bbs',
	'components/guild/guild_bbs_remove'
], function(
	PageClass,
	GuildBbs,
	GuildBbsRemove
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド掲示板',
			data_path : '/guild/bbs/top',
			template_path : '/tmpl/guild/bbs.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'bbs' : GuildBbs,
			'bbs_remove' : GuildBbsRemove
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