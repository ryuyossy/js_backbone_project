define([
	'common/page',
	'components/guild/guild_menbo_list'
], function(
	PageClass,
	GuildMenboList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'メンバー募集中ギルド一覧',
			data_path : '/guild/candidate/guild/list',
			template_path : '/tmpl/guild/menbo/list.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'list' : GuildMenboList
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