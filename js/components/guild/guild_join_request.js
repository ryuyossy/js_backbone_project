define(function(){
	// 入団希望
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildJoinRequest' : 'openConfirmPopup',
			'touch .jsButtonGuildJoinRequestFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('openCompletePopup', self.changeButton);
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'ギルド入団希望申請確認',
				template : '#jsTemplatePopupGuildJoinRequestConfirm'
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['ギルド入団希望申請中...', 'ギルド入団希望申請完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildJoinRequestComplete',
				data_path : page.model.getDataPath('/guild/candidate/guild/apply'),
				ajax_type : 'POST',
				ajax_data : {
					'guild_id' : page.model.get('query').guild_id
				},
				success : function(json){
					if( json.result_type===2 ) return;
					self.trigger('openCompletePopup');
				}
			};
			page.trigger('openPopup', parameter);
		},
		changeButton : function(){
			$('.jsButtonGuildJoinRequest').addClass('off').text('入団希望申請中')
			.removeClass('jsButtonGuildJoinRequest');
		}
	});
	return {
		Model : Model,
		View : View
	};
});



