define(function(){
	// クエスト同行者から外す
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonMissionPartnerRemoveConfirm' : 'getElement',
			'touch .jsButtonMissionPartnerRemoveFix' : 'openCompletePopup',
			'touch .jsButtonMissionPartnerRemoveEnd' : function(){
				page.reload();
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $user = $(e.currentTarget).parents('.jsUser');
			self.model.set({
				$user : $user,
				user_id : $user.attr('data-user-id'),
				user_name : $user.attr('data-user-name')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '変更確認',
				template : '#jsTemplatePopupPartnerRemoveConfirm',
				local_data : {
					'user_name' : self.model.get('user_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['変更中...', '変更完了'],
				is_closable : false,
				template : '#jsTemplatePopupPartnerRemoveComplete',
				data_path : page.model.getDataPath('/mission/partner/delete'),
				ajax_type : 'POST',
				ajax_data : {
					'partner_id' : self.model.get('user_id')
				}
			};
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});