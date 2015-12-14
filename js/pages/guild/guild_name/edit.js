define([
	'common/page',
	'components/guild/guild_name_edit'
], function(
	PageClass,
	GuildNameEdit
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド名編集',
			data_path : '/guild/name/get',
			template_path : '/tmpl/guild/guild_name_edit.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'edit' : GuildNameEdit
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