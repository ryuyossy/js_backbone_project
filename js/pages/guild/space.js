define([
	'common/page',
	'components/guild/guild_invite'
], function(
	PageClass,
	GuildInvite
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド広場',
			data_path : '/guild/space/top',
			template_path : '/tmpl/guild/space/top.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'invite' : GuildInvite
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