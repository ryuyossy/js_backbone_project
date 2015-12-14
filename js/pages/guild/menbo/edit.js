define([
	'common/page',
	'components/guild/guild_menbo_edit',
	'components/guild/guild_menbo_remove'
], function(
	PageClass,
	GuildMenboEdit,
	GuildMenboRemove
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '掲載内容の編集・削除',
			data_path : '/guild/space/recruit/get',
			template_path : '/tmpl/guild/menbo/edit.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'edit' : GuildMenboEdit,
			'remove' : GuildMenboRemove
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