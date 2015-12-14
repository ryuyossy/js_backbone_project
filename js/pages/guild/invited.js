define([
	'common/page',
	'components/guild/guild_invited_list'
], function(
	PageClass,
	GuildInvitedList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '勧誘されているギルド',
			data_path : '/guild/invite/guild/list',
			template_path : '/tmpl/guild/invited.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'list' : GuildInvitedList
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