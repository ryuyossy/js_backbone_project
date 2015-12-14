define(function(){
	// 退団確認
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildLeaveConfirm' : 'openConfirmPopup',
			'touch .jsButtonJumpToGuildLeave' : 'jumpToGuildLeave'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('leave', self.model.leave);
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '退団確認',
				template : '#jsTemplatePopupGuildLeaveConfirm',
				local_data : {
					'guild_name' : page_data.guild_name
				}
			};
			page.trigger('openPopup', parameter);
		},
		jumpToGuildLeave : function(e){
			var form_target = 'GuildLeave';
			var url = 'guild/leave/';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});