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
			var name = 'season_avatar';
			if(page_data.ticket_animation_id){
				name = name + '_ticket';
			}else if(page_data.avatar_animation_id){
				name = name + '_addition';
			}
			
			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(SeasonAvatarManifest){
					self.model.set({
						createjsJson : {},
						manifest : SeasonAvatarManifest.Manifest,
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