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
			var name = 'season_avatar_emblem_get';

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(SeasonAvatarEmblemGetManifest){
					self.model.set({
						createjsJson : page_data,
						manifest : SeasonAvatarEmblemGetManifest.Manifest,
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