define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonProfileEditConfirm' : 'validateMessage',
			'touch .jsButtonProfileEditFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('validateMessage', self.openConfirmPopup);
		},
		validateMessage : function(){
			var self = this;
			var comment_length = $('.jsProfileComment').val().length;
			if( comment_length > 30 ){
				self.model.set({
					error_message : '30文字以上の自己紹介文を入力することはできません。'
				});
			} else if( comment_length === 0 ){
				self.model.set({
					error_message : '自己紹介文が入力されていません。'
				});
			} else {
				self.model.unset('error_message');
			}
			self.trigger('validateMessage');
		},
		openConfirmPopup : function(){
			var self = this;
			var error_message = self.model.get('error_message');
			var parameter = self.model.has('error_message') ?
			{
				title : '編集エラー',
				local_data : {
					'message' : error_message
				}
			} : {
				title : '編集内容確認',
				template : '#jsTemplatePopupProfileEditConfirm',
				local_data : {
					'profile_comment' : $('.jsProfileComment').val()
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['変更中...', '変更完了'],
				is_closable : false,
				template : '#jsTemplatePopupProfileEditComplete',
				data_path : page.model.getDataPath('/prof/comment/edit'),
				ajax_type : 'POST',
				ajax_data : {
					'profile_comment' : $('.jsProfileComment').val()
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



