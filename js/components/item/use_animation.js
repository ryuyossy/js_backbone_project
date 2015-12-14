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
			var parameter = {};
			var playlist = [];
			if(page_data.master_job_flg){
				playlist.push({
					component : comp.job_master_canvas,
					end_frame : 41,
					text : 'ジョブ「' + page_data.master_job.name + '」をマスターした！'
				});
			}
			if(page_data.win_ability_flg){
				playlist.push({
					component : comp.ability_get_canvas,
					end_frame : 31,
					text : 'アビリティ「' + page_data.win_ability.name + '」をゲットした！'
				});
			}
			if(page_data.win_jobs && page_data.win_jobs.length > 0){
				var job_names = page_data.win_jobs.map(function(job){ return job.name });
				playlist.push({
					component : comp.job_get_canvas,
					end_frame : -2,
					text : 'ジョブ「' + job_names.join('」「') + '」をゲットした！'
				});
			}
			if(!playlist.length){
				$('#fullScreen').hide();
				$('#jsUseResult').show();
				return;
			}

			var after = {
				type : 'element',
				dest : '#jsUseResult'
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