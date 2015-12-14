define([
        'common/page',
        'components/start_dash/top'
], function(
		PageClass,
		Top
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'スタートダッシュキャンペーン',
			ajax_type : 'POST',
			template_path : '/tmpl/start_dash/top.html',
			data_path : '/start_dash/top',
			style_path : '/css/others.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'top' : Top
		},
		binedEvents : function(){
			var self = this;
			var top = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});