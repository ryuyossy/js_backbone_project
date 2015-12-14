define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		initializeAnimation : function(){
			var comp = page.components;
			var page_data = page.model.get('page_data');
			var parameter = {
				playlist : [
					{
						component : comp.gacha_canvas,
						height : 320,
						end_frame : -20
					}					
				]
			};
			if(page_data.win_emblem_ids && page_data.win_emblem_ids.length > 0){
				parameter.playlist.push({
					component : comp.season_avatar_emblem_get_canvas,
					height : 320
				});
			}
			if(page_data.win_avatars && page_data.win_avatars.length > 0){
				page_data.win_avatars_animation = [];
				page_data.win_avatars.forEach(function(avatar){
					page_data.win_avatars_animation.push(avatar);
				});
				page_data.win_avatars.forEach(function(avatar, i){
					parameter.playlist.push({
						component : comp['season_avatar_get_canvas' + i],
						height : 320
					});
				});
			}
			parameter.playlist[parameter.playlist.length - 1].after = {
				type : 'element',
				dest : '#jsGachaResult'
			}

			page.trigger('setAnimation', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});