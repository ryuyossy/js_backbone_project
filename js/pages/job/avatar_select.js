define([
	'common/page',
	'components/job/job_change'
], function(
	PageClass,
	JobChange
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ジョブアバター選択',
			data_path : '/job/avatar/select',
			template_path : '/tmpl/job/avatar_select.html',
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