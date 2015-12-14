define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		saveMessage : function(){
			var self = this;
			RS.put({
				form_data : {
					to_user_id : page.model.get('query').user_id,
					body_text : self.get('text')
				},
				'form_target' : 'MessageSendComplete'
			}, false);
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonMessageEditConfirm' : 'validateMessage',
			'touch .jsButtonMessageEditFix' : 'getText'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.model.on('change:text', self.model.saveMessage);
			self.model.on('change:text', self.jumpMessageTop);
			self.on('validateMessage', self.openConfirmPopup);
		},
		getText : function(){
			var self = this;
			self.model.set({text : $('.jsMessageComment').val()});
		},
		jumpMessageTop : function(){
			page.trigger('changeURL', 'message/send_complete/', true);
		},
		validateMessage : function(){
			var self = this;
			var message_length = $('.jsMessageComment').val().length;
			if( message_length > 100 ){
				self.model.set({
					error_message : '100文字以上のメッセージを送信することはできません。'
				});
			} else if( message_length === 0 ){
				self.model.set({
					error_message : 'メッセージが入力されていません。'
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
				title : '送信エラー',
				local_data : {
					'message' : error_message
				}
			} : {
				title : 'メッセージ送信確認',
				template : '#jsTemplatePopupMessageEditConfirm',
				local_data : {
					'message_comment' : $('.jsMessageComment').val()
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



