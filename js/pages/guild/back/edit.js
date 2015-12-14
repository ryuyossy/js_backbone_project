define([
	'common/page',
	'components/guild/guild_back_edit'
], function(
	PageClass,
	GuildBackEdit
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '後衛希望',
			data_path : '/guild/back/get',
			template_path : '/tmpl/guild/guild_back_edit.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'edit' : GuildBackEdit
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