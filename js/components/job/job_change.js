define(function(){
	// 転職（アバター変更）
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsJobChange' : 'getElement',
			'touch .jsBacktoJobTop' : 'gotoTop',
			'touch .jsJobChangeFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				$el : $el,
				avatar_id : $el.attr('data-avatar-id')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'アバターチェンジ確認',
				template : '#jsTemplatePopupJobChangeConfirm'
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['アバターチェンジ中...', 'アバターチェンジ完了'],
				is_closable : false,
				template : '#jsTemplatePopupJobChangeComplete',
				data_path : page.model.getDataPath('/job/avatar/change'),
				ajax_type : 'POST',
				ajax_data : {
					avatar_id : self.model.get('avatar_id')
				}
			};
			page.trigger('openPopup', parameter);
		},
		gotoTop : function(e){

		}
	});
	return {
		Model : Model,
		View : View
	};
});



