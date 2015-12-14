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
			var comp = page.components;
			var parameter = {};
			var playlist = [
				{
					component : comp.boss_canvas
				}
			];
			var page_data = page.model.get('page_data');
			if(page_data.level_up){
				var text = [];
				text.push('武器P、防具P、アビPが1あがった！');
				if(page_data.level_up.win_mp_max){
					text.push('最大HP、行動Pがふえた！');
				}else{
					text.push('最大HPがふえた！');
				}
				text.push('行動Pが全回復した！');
				playlist.push({
					component : comp.levelup_canvas,
					height : 480,
					end_frame : 25,
					text : text.join('<br>')
				});
			}
			if(page_data.next && page_data.next.stage_clear_flg){
				playlist.push({
					component : comp.stage_clear_canvas,
					height : 480,
					end_frame : 25
				});
				if(page_data.win_jobs && page_data.win_jobs.length > 0){
					comp.job_get_canvas.trigger('setAnimation', page_data);
					var job_names = page_data.win_jobs.map(function(job){ return job.name });
					playlist.push({
						component : comp.job_get_canvas,
						end_frame : -2,
						text : 'ジョブ「' + job_names.join('」「') + '」をゲットした！'
					});
				}
			}

			var after = {
				type : 'element',
				dest : '#jsBossResult'
			};

			playlist[playlist.length - 1].after = after;
			parameter.playlist = playlist;
			page.trigger('setAnimation', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});