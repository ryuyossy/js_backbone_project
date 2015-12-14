define([
	'common/page',
	'components/mission/partner_remove'
], function(
	PageClass,
	MissionPartnerRemove
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエストボス戦闘準備',
			data_path : '/mission/boss/ready/get',
			template_path : '/tmpl/mission/boss/ready.html',
			style_path : '/css/mission.css',
			redirect_url : 'mission/stage/'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				stage_id : self.get('query').stage_id,
				field_id : self.get('query').field_id
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			remove : MissionPartnerRemove
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		},
		initialize : function(){
			this._super();

			var query = this.model.get('query');
			this.model.user.set({
				boss : {
					stage_id : query.stage_id,
					field_id : query.field_id
				}
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});
