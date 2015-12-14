define(function(){
	// 役職任命
	var page, page_data;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildAppointConfirm' : 'getElement',
			'touch .jsButtonGuildAppointFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('openPopup', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $member = $(e.currentTarget).parents('.jsMember');
			self.model.set({
				$member : $member,
				user_id : $member.attr('data-user-id'),
				user_name : $member.attr('data-user-name')
			});
			self.trigger('openPopup');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '役職任命確認',
				template : '#jsTemplatePopupGuildAppointConfirm',
				local_data : {
					user_name : self.model.get('user_name'),
					position_name : page_data.position_name
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var ajax_data = {
				'position_id' : page_data.position_id,
				'user_id' : self.model.get('user_id')
			};
			if( page_data.user ){
				ajax_data = _.extend(ajax_data, {
					'before_user_id' : page_data.user.user_id
				});
			}
			var parameter = {
				titles : ['役職任命中...', '役職任命完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildAppointComplete',
				data_path : page.model.getDataPath('/guild/position/appoint'),
				ajax_type : 'POST',
				ajax_data : ajax_data
			};
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



