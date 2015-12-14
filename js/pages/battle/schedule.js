define([
	'common/page',
	'components/battle/schedule_accordion'
], function(
	PageClass,
	ScheduleAccordion
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'バトル | 対戦スケジュール',
			data_path : '/battle/schedule/list',
			template_path : '/tmpl/battle/schedule.html',
			ajax_type : 'GET',
			style_path : '/css/battle.css'	
		}
		/*
		↓URLのパラメータを、テンプレートのrenderに渡したぃ場合、以下のょぅにします
		,
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				id : self.get('query').id
			});
		}
		*/
	});
	var View = PageClass.View.extend({
		components : {
			accordion : ScheduleAccordion
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
