define([
	'common/page'
], function(
	PageClass
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエストステージ選択',
			data_path : '/mission/stage/list',
			template_path : '/tmpl/mission/stage.html',
			style_path : ['/css/mission.css', '/css/short_tutorial.css']
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
