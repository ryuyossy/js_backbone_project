define(function(){
	// ギルド勧誘
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildInviteConfirm' : 'getElement',
			'touch .jsButtonGuildInviteFix' : 'openCompletePopup',
			'touch .jsButtonGuildInviteMax' : 'openMaxErrorPopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
			self.on('openCompletePopup', self.changeButton);
			self.on('openCompletePopup', self.changeAllButton);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var $user = $el.parents('.jsList')[0] ? $el.parents('.jsList') : $el;
			self.model.set({
				$el : $el,
				user_id : $user.attr('data-list-id') || $user.attr('data-user-id'),
				user_name : $user.attr('data-user-name')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'ギルド勧誘確認',
				template : '#jsTemplatePopupInviteConfirm',
				local_data : {
					'user_name' : self.model.get('user_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['ギルド勧誘中...', 'ギルド勧誘完了'],
				template : '#jsTemplatePopupInviteComplete',
				data_path : page.model.getDataPath('/guild/invite/exec'),
				ajax_type : 'POST',
				ajax_data : {
					'user_id' : self.model.get('user_id')
				},
				callback : function(json){
					self.trigger('openCompletePopup', json);
				}
			};
			page.trigger('openPopup', parameter);
		},
		openMaxErrorPopup : function(){
			var self = this;
			var parameter = {
				title : 'ギルド勧誘エラー',
				template : '#jsTemplatePopupInviteMax'
			};
			page.trigger('openPopup', parameter);
		},
		changeButton : function(){
			var self = this;
			var $el = self.model.get('$el');
			$el.removeClass('jsButtonGuildInviteConfirm').addClass('disable')
			.text('勧誘済み');
		},
		changeAllButton : function(json){
			var self = this;
			if(!json.invite_max_flg) return;
			$('.jsButtonGuildInviteConfirm')
			.removeClass('jsButtonGuildInviteConfirm')
			.addClass('jsButtonGuildInviteMax');
		}
	});
	return {
		Model : Model,
		View : View
	};
});