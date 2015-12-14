define([
	'common/page',
	'components/mission/partner_change'
], function(
	PageClass,
	MissionPartnerChange
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエスト | メンバーを呼ぶ',
			data_path : '/mission/partner/change/list',
			template_path : '/tmpl/mission/partner.html',
			style_path : '/css/mission.css'
		},
		initialize : function(){
			var self = this,
				boss = self.user.get('boss');
			self._super();

			var backto = self.get('query').backto;
			var add_page_data = {backto:backto};
			if(backto == 'boss'){
				_.extend(add_page_data, {
					stage_id : boss.stage_id,
					field_id : boss.field_id
				});
			}
			self.addPageData(add_page_data);
		}
	});
	var View = PageClass.View.extend({
		components : {
			partners : MissionPartnerChange
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