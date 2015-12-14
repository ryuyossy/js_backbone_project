define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
		}
	});
	var View = Backbone.View.extend({
		el : '.jsGuildMember',
		events : {
			'touch .jsTreasureMessageSend' : 'accordion',
			'touch .jsTreasureMessageCancel' : 'accordion',
			'touch .jsPostTreasureMessageSendSubmit' : 'openPopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		accordion : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsGuildMember');
			if( $el.hasClass('close') ){
				$el.removeClass('close').addClass('open');
			} else {
				$el.removeClass('open').addClass('close');
			}
		},
		openPopup : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var query = page.model.get('query');
			var series_id = query.series_id;
			var treasure_id = query.treasure_id;
			var user_id = $el.parents('.jsGuildMember').attr('data-user-id');
			var message = $el.parents('.jsGuildMember').find('.jsMessage').val();
			var parameter = {
				titles : ['メッセージ送信中...', 'メッセージ送信完了'],
				template : '#jsTemplatePopupTreasureMessageSend',
				is_closable : true,
				data_path : page.model.getDataPath('/collection/treasure/message/send'),
				ajax_type : 'POST',
				ajax_data : {
					'series_id' : series_id,
					'treasure_id' : treasure_id,
					'to_user_id' : user_id,
					'body' : message 
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
