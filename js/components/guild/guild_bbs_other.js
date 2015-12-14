define([
	'components/guild/guild_bbs'
],function(
	GuildBbs
){
	var Model = GuildBbs.Model.extend({
	});
	var View = GuildBbs.View.extend({
		initializeTopics : function(){
			var page = this.page;
			var parameter = {
				el : '.jsGuildBbsTopics',
				template : '#jsTemplateGuildBbsTopics',
				more_flg_name : 'bbs_more_flg',
				data_path : page.model.getDataPath('/guild/bbs/post/more_list'),
				ajax_data : {
					'guild_id' : page.model.get('query').guild_id
				}
			};
			var Topics = new page.list(parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



