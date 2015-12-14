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
			var avatar = page_data.win_avatars_animation.shift();
			this.page.model.set('page_data', page_data);
			var name = 'season_avatar_get_id' + avatar.avatar_id;

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(SeasonAvatarGetManifest){
					self.model.set({
						createjsJson : {},
						manifest : SeasonAvatarGetManifest.Manifest,
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