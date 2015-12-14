define(function(){
	// ギルド加入申請承認
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildJoinAccept' : 'getElement',
			'touch .jsButtonGuildJoinAcceptFix' : 'openCompletePopup',
			'touch .jsButtonGuildJoinAcceptEnd' : 'reload'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
			self.on('openCompletePopup', self.removeElement);
		},
		getElement : function(e){
			var self = this;
			var $user = $(e.currentTarget).parents('.jsList');
			self.model.set({
				$user : $user,
				user_id : $user.attr('data-list-id'),
				user_name : $user.attr('data-user-name')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '加入申請承認確認',
				template : '#jsTemplatePopupGuildJoinAcceptConfirm',
				local_data : {
					user_name : self.model.get('user_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['加入申請承認中...', '加入申請承認完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildJoinAcceptComplete',
				data_path : page.model.getDataPath('/guild/invite/user/authorize'),
				ajax_type : 'POST',
				ajax_data : {
					'user_id' : self.model.get('user_id')
				},
				callback : function(){
					self.trigger('openCompletePopup');
				}
			};
			page.trigger('openPopup', parameter);
		},
		removeElement : function(){
			var self = this;
			var $user = self.model.get('$user');
			$user.remove();
		},
		reload : function(){
			if( $('.jsList')[0] ) return;
			window.location.reload(true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



