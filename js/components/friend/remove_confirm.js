define(function(){
	// 【ToDo】フレンド削除機能の実装
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
			user_id = page_data.user_id;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsPostFriendRemove',
		events : {
			'touch .jsFriendRemoveButton' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			self.on('succeedSubmit', self.confirm);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		openPopup : function($el){
			var self = this;
			var friend_user_id = $el.attr('data-friend-user-id');
			var friend_user_name = $el.attr('data-friend-user-name');
			var parameter = {
				titles : ['フレンド情報取得中', 'フレンド削除確認'],
				template : '#jsTemplatePopupFriendRemove',
				is_closable : true,
				data_path : page.model.getDataPath('/friend/remove/confirm'),
				ajax_type : 'GET',
				data : {
					user_id : 1,
					friend_user_id : friend_user_id
				},
				callback : function(json){
					self.trigger('succeedSubmit', json);
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
