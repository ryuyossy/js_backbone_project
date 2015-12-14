define([
	'common/page',
	'components/mission/partner_remove'
], function(
	PageClass,
	MissionPartnerRemove
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエスト同行',
			data_path : '/guild/partner/top',
			template_path : '/tmpl/mission/partner_list.html',
			style_path : '/css/mission.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'remove' : MissionPartnerRemove
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
