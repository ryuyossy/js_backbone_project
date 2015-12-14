define([
	'common/page',
	'components/guild/guild_appoint'
], function(
	PageClass,
	GuildAppoint
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '役職任命',
			data_path : '/guild/position/select',
			template_path : '/tmpl/guild/position/appoint.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'guild_appoint' : GuildAppoint
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