define([
	'components/common/canvas'
], function(
	Canvas
	){
	var Model = Canvas.Model.extend({

	});
	var View = Canvas.View.extend({
		load : function(){
			var self = this;
			var page_data = this.model.get('page_data') || this.page.model.get('page_data');
			var win_jobs = page_data.win_jobs;
			var job_id = win_jobs[0].id;
			var name = 'job_get_' + (((job_id/10|0)%10) ? job_id/100|0 : 0);

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(Manifest){
					self.model.set({
						createjsJson : page_data,
						manifest : Manifest.Manifest,
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