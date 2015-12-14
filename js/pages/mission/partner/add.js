define([
	'common/page',
	'components/mission/partner_add'
], function(
	PageClass,
	MissionPartnerAdd
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエスト | メンバーを呼ぶ',
			data_path : '/mission/partner/add/list',
			template_path : '/tmpl/mission/partner.html',
			style_path : '/css/mission.css'
		},
		initialize : function(){
			var self = this;
			self._super();

			var backto = self.get('query').backto;
			var add_page_data = {backto:backto};

			if(backto == 'boss'){
				var boss = self.user.get('boss')
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
			partners : MissionPartnerAdd
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
