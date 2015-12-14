define([
	'common/page',
	'components/mission/boss_submit'
], function(
	PageClass,
	BossSubmit
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエスト',
			data_path : '/mission/top/get',
			template_path : '/tmpl/mission/top.html',
			style_path : '/css/mission.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'submit' : BossSubmit
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
