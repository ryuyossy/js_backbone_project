define([
	'components/common/canvas'
], function(
	Canvas
	){
	var Model = Canvas.Model.extend({

	});
	var View = Canvas.View.extend({
		el : '#fullScreen',
		load : function(){
			var self = this;
			var page_data = this.page.model.get('page_data');

			var name = 'full_guildlank_' + page_data.guild_rank_result;

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(GuildRankManifest){
					self.model.set({
						createjsJson : {},
						manifest : GuildRankManifest.Manifest,
						name : name
					});
				}
			);
		}
	});
	return {
		Model : Model,
		View : View
	};
});