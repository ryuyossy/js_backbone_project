define(function(){
	// ギルドマスターコメント編集
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildMasterCommentEditConfirm' : 'validateComment',
			'touch .jsButtonGuildMasterCommentEditFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('validateComment', self.openConfirmPopup);
		},
		validateComment : function(){
			var self = this;
			var comment_length = $('.jsGuildMasterComment').val().length;
			if( comment_length > 30 ){
				self.model.set({
					error_message : '30文字以上のコメントを入力することはできません。'
				});
			} else if( comment_length === 0 ){
				$('.jsGuildMasterComment').val('よろしくお願いします。');
			} else {
				self.model.unset('error_message');
			}
			self.trigger('validateComment');
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
				title : '編集内容確認',
				template : '#jsTemplatePopupMasterCommentEditConfirm',
				local_data : {
					'master_comment' : $('.jsGuildMasterComment').val()
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['編集内容保存中...', '編集内容保存完了'],
				is_closable : false,
				template : '#jsTemplatePopupMasterCommentEditComplete',
				data_path : page.model.getDataPath('/guild/master_comment/edit'),
				ajax_type : 'POST',
				ajax_data : {
					'master_comment' : $('.jsGuildMasterComment').val()
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