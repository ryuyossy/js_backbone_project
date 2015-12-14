define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ジョブ',
			data_path : '/job/detail',
			template_path : '/tmpl/job/detail.html',
			style_path : '/css/job.css'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				job_id : self.get('query').job_id
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