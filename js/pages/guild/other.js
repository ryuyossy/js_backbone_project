define([
	'common/page',
	'components/guild/guild_bbs',
	'components/guild/guild_join_request',
	'components/guild/guild_join',
	'components/guild/guild_other'
], function(
	PageClass,
	GuildBBS,
	GuildjoinRequest,
	Guildjoin,
	GuildOther
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド',
			data_path : '/guild/top/else',
			template_path : '/tmpl/guild/other.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'bbs' : GuildBBS,
			'join_request' : GuildjoinRequest,
			'join' : Guildjoin,
			'other' : GuildOther
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