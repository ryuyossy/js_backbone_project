define([
	'common/page',
	'components/guild/guild_rank'
], function(
	PageClass,
	GuildRank
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ランキング',
			data_path : '/battle/ranking/get',
			template_path : '/tmpl/guild/rank.html',
			style_path : '/css/guild.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'guild_rank' : GuildRank
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
