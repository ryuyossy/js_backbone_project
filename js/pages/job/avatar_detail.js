define([
	'common/page',
	'components/job/job_change'
], function(
	PageClass,
	JobChange
){
	// ジョブアバター詳細
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ジョブアバター',
			data_path : '/job/avatar/detail',
			template_path : '/tmpl/job/avatar_detail.html',
			style_path : '/css/job.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'job_change' : JobChange
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