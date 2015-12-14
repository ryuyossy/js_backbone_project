define(function(){
	// 役職一覧
	var page, page_data;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsGuildRemoveConfirm' : 'getElement',
			'touch .jsButtonGuildRemoveFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('changeAppoint', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $member = $(e.currentTarget).parents('.jsMember');
			self.model.set({
				$member : $member,
				user_id : $member.attr('data-user-id'),
				user_name : $member.attr('data-user-name'),
				position_name : $member.attr('data-position-name'),
				position_id : $member.attr('data-position-id')
			});
			self.trigger('changeAppoint');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '役職解任確認',
				template : '#jsTemplatePopupGuildRemoveConfirm',
				local_data : {
					user_name : self.model.get('user_name'),
					position_name : self.model.get('position_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var ajax_data = {
				'user_id' : self.model.get('user_id')
			};
			var parameter = {
				titles : ['役職解任中...', '役職解任完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildRemoveComplete',
				data_path : page.model.getDataPath('/guild/position/remove'),
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

