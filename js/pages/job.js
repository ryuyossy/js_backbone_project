define([
	'common/page'
], function(
	PageClass
){
	// ジョブ選択ページ
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ジョブ',
			data_path : '/job/top',
			template_path : '/tmpl/job/top.html',
			style_path : ['/css/job.css', '/css/short_tutorial.css']
		},
		initialize : function(){
			var self = this;
			self.on('change:page_template', self.changeOrderOfJobTree);
			self._super();
		},
		changeOrderOfJobTree : function(){
			var self = this;
			var APPRENTICE_WARRIOR = 1;
			var VILLAGER = 4;
			var data = self.get('page_data');
			if (data.current_job.type == APPRENTICE_WARRIOR
				|| data.current_job.type == VILLAGER) return;
			var currentJobSet = data.job_trees.splice(data.current_job.type - 1, 1);
			data.job_trees = currentJobSet.concat(data.job_trees);
			self.set({
				page_data : data
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});