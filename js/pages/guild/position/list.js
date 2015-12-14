define([
	'common/page',
	'components/guild/guild_appoint_list'
], function(
	PageClass,
	GuildAppointList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '役職一覧',
			data_path : '/guild/position/list',
			template_path : '/tmpl/guild/position/list.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'guild_appoint_list' : GuildAppointList
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