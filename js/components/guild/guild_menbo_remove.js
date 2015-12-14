define(function(){
	// メンボ掲載内容の削除
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildMenboRemoveConfirm' : 'openConfirmPopup',
			'touch .jsButtonGuildMenboRemoveFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : '削除確認',
				template : '#jsTemplatePopupMenboRemoveConfirm'
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['削除中...', '削除完了'],
				is_closable : false,
				template : '#jsTemplatePopupMenboRemoveComplete',
				data_path : page.model.getDataPath('/guild/space/recruit/remove'),
				ajax_type : 'POST'
			};
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});