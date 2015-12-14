define(function(){
	// 加入
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsGuildJoin' : 'getElement',
			'touch .jsGuildJoinFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			self.model.set({
				guild_id : $(e.currentTarget).attr('data-guild-id')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'ギルド加入確認',
				template : '#jsTemplatePopupGuildJoinConfirm'
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['ギルド加入中...', 'ギルド加入完了'],
				is_closable : false,
				template : '#jsTemplatePopupGuildJoinComplete',
				data_path : page.model.getDataPath('/guild/invite/guild/authorize'),
				ajax_type : 'POST',
				ajax_data : {
					'guild_id' : self.model.get('guild_id')
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



