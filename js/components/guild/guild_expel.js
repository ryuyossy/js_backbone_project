define(function(){
	// ギルドから除名
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildExpelConfirm' : 'getElement',
			'touch .jsButtonGuildExpelFix' : 'openCompletePopup',
			'touch .jsButtonGuildExpelEnd' : 'reload'
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
			var $member = $(e.currentTarget).parents('.jsMember');
			self.model.set({
				$member : $member,
				user_id : $member.attr('data-user-id'),
				user_name : $member.attr('data-user-name')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '除名確認',
				template : '#jsTemplatePopupExpelConfirm',
				local_data : {
					'user_name' : self.model.get('user_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['除名中...', '除名完了'],
				is_closable : false,
				template : '#jsTemplatePopupExpelComplete',
				data_path : page.model.getDataPath('/guild/member/expel'),
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
			var $member = self.model.get('$member');
			$member.remove();
		},
		reload : function(){
			if( $('.jsMember')[0] ) return;
			window.location.reload(true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});