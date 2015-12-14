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
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		initializeAnimation : function(){
			var page_data = page.model.get('page_data');
			var comp = page.components;
			var parameter = {};
			var playlist = [];			
			if(page_data.guild_rank_result){
				playlist.push({
					component : comp.guild_rank_canvas,
					height : 480,
					end_frame : 45
				});
			}
			if(page_data.ticket_animation_id || page_data.avatar_animation_id){
				playlist.push({
					component : comp.season_avatar_canvas,
					height : 320,
					after : {
						type : 'url',
						dest : 'season_avatar/' + (page_data.ticket_animation_id || page_data.avatar_animation_id) + '/'
					}
				});
			}
			if(playlist.length == 0) return;
			if(!playlist[playlist.length - 1].hasOwnProperty('after')){
				playlist[playlist.length - 1].after = {
					type : 'element',
					dest : '#jsMypage'
				};
			}else{
				$('#jsMypage').hide();
			}
			parameter.playlist = playlist;
			page.trigger('setAnimation', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});