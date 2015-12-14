define([
	'common/page',
	'components/guild/guild_master_comment_edit'
], function(
	PageClass,
	GuildMasterCommentEdit
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルドマスターコメント編集',
			data_path : '/guild/master_comment/get',
			template_path : '/tmpl/guild/master_comment_edit.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'edit' : GuildMasterCommentEdit
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