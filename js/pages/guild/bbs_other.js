define([
	'common/page',
	'components/guild/guild_bbs_other'
], function(
	PageClass,
	GuildBbsOther
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド掲示板',
			data_path : '/guild/bbs/top',
			template_path : '/tmpl/guild/bbs_other.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'bbs_other' : GuildBbsOther
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