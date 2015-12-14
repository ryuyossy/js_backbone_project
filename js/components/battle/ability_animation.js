define(function(){
	var page;
	var jex_info;
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
						component : comp.ability_canvas,
						after : {
							type : 'url',
							dest : 'battle/'
						}
					}
				]
			};

			if((page_data.win_jobs && page_data.win_jobs.length > 0) || page_data.win_ability_flg || page_data.master_job_flg){
				jex_info = {};
				var jex_info_names = ['win_jobs','win_ability_flg','win_ability','master_job_flg','master_job','img_url_root'];
				jex_info_names.forEach(function(name){
					jex_info[name] = page_data[name];
				});
				jex_info.after = {
					type : 'url',
					dest : 'battle/'
				};
				parameter.playlist[0].after.dest = 'battle/jex/';
			}
			page.trigger('setAnimation', parameter);
		},
		preparation : function(){
			if(!jex_info) return;
			page.model.user.loadStorage();
			page.model.user.set('jex_info', jex_info);
		}
	});
	return {
		Model : Model,
		View : View
	};
});