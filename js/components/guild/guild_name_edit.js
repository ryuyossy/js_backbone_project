define(function(){
	// ギルド名編集
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildNameEditConfirm' : 'validateName',
			'touch .jsButtonGuildNameEditFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('validateName', self.openConfirmPopup);
		},
		validateName : function(){
			var self = this;
			var name_length = $('.jsGuildName').val().length;
			if( name_length > 10 ){
				self.model.set({
					error_message : '10文字以上のギルド名を入力することはできません。'
				});
			} else if( name_length === 0 ){
				self.model.set({
					error_message : 'ギルド名が入力されていません。'
				});
			} else {
				self.model.unset('error_message');
			}
			self.trigger('validateName');
		},
		openConfirmPopup : function(){
			var self = this;
			var error_message = self.model.get('error_message');
			var parameter = self.model.has('error_message') ?
			{
				title : '入力エラー',
				local_data : {
					'message' : error_message
				}
			} : {
				title : '編集内容確認',
				template : '#jsTemplatePopupGuildNameEditConfirm',
				local_data : {
					'guild_name' : $('.jsGuildName').val()
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['変更中...', '変更完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildNameEditComplete',
				data_path : page.model.getDataPath('/guild/name/edit'),
				ajax_type : 'POST',
				ajax_data : {
					'guild_name' : $('.jsGuildName').val()
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