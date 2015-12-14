define([
	'common/page',
	'components/guild/guild_warmup',
	'components/guild/guild_expel'
], function(
	PageClass,
	GuildWarmup,
	GuildExpel
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルドメンバー',
			data_path : '/guild/member/list',
			template_path : '/tmpl/guild/members.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'warmup' : GuildWarmup,
			'expel' : GuildExpel
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