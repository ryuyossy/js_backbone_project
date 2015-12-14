define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildBbsTopicRemoveConfirm' : 'getTopicData',
			'touch .jsButtonGuildBbsCommentRemoveConfirm' : 'getCommentData',
			'touch .jsButtonGuildBbsTopicRemoveFix' : function(){
				var self = this;
				self.openPopupRemoveTopicFix();
				self.removeTopic();
				self.showNoTopic();
				self.checkMoreTopic();
			},
			'touch .jsButtonGuildBbsCommentRemoveFix' : function(){
				var self = this;
				self.openPopupRemoveCommentFix();
				self.removeComment();
				self.renderCommentNum();
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.model.on({
				'set:$topic' : self.openPopupRemoveTopicConfirm,
				'set:$comment' : self.openPopupRemoveCommentConfirm
			});
		},
		getTopicData : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				$topic : $el.parents('.jsTopic')
			})
			.trigger('set:$topic');
		},
		openPopupRemoveTopicConfirm : function(){
			var self = this;
			var $topic = self.model.get('$topic');
			var parameter = {
				title : '投稿削除確認',
				template : '#jsTemplatePopupGuildBbsRemoveConfirm',
				local_data : {
					'message' : '以下の投稿を削除しますか？',
					'button_class' : 'jsButtonGuildBbsTopicRemoveFix',
					'body' : $topic.find('.jsTopicBody').text()
				}
			};
			page.trigger('openPopup', parameter);
		},
		openPopupRemoveTopicFix : function(){
			var self = this;
			var $topic = self.model.get('$topic');
			var parameter = {
				titles : ['投稿削除中...', '投稿削除完了'],
				data_path : page.model.getDataPath('/guild/bbs/post/remove'),
				ajax_type : 'POST',
				ajax_data : {
					'message_id' : $topic.attr('data-list-id')
				},
				local_data : {
					'message' : '投稿を削除しました。'
				}
			};
			page.trigger('openPopup', parameter);
		},
		removeTopic : function(){
			var self = this;
			var $topic = self.model.get('$topic');
			$topic.remove();
			self.model.set({
				has_topic : !!$('.jsTopic')[0],
				has_more_topic : !!$('.jsGuildBbsTopics').find('.jsListMore')[0]
			});
		},
		showNoTopic : function(){
			var self = this;
			var has_topic = self.model.get('has_topic');
			var has_more_topic = self.model.get('has_more_topic');
			if( has_topic || has_more_topic ) return;
			var $topic = self.model.get('$topic');
			var template = $('#jsTemplateGuildBbsTopics').html();
			var html = $.templates(template).render({
				bbs_posts : []
			});
			$('.jsGuildBbsTopics').find('.jsListAll').html(html);
		},
		checkMoreTopic : function(){
			var self = this;
			var has_topic = self.model.get('has_topic');
			var has_more_topic = self.model.get('has_more_topic');
			if( has_topic || !has_more_topic ) return;
			self.trigger('lostAllTopics');
		},
		getCommentData : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				$comment : $el.parents('.jsTopicComment')
			})
			.trigger('set:$comment');
		},
		openPopupRemoveCommentConfirm : function(){
			var self = this;
			var $comment = self.model.get('$comment');
			var parameter = {
				title : 'コメント削除確認',
				template : '#jsTemplatePopupGuildBbsRemoveConfirm',
				local_data : {
					'message' : '以下のコメントを削除しますか？',
					'button_class' : 'jsButtonGuildBbsCommentRemoveFix',
					'body' : $comment.find('.jsTopicCommentBody').text()
				}
			};
			page.trigger('openPopup', parameter);
		},
		openPopupRemoveCommentFix : function(){
			var self = this;
			var $comment = self.model.get('$comment');
			var parameter = {
				titles : ['コメント削除中...', 'コメント削除完了'],
				data_path : page.model.getDataPath('/guild/bbs/comment/remove'),
				is_closable : true,
				ajax_type : 'POST',
				ajax_data : {
					'comment_id' : $comment.attr('data-comment-id')
				},
				local_data : {
					'message' : '投稿を削除しました。'
				}
			};
			page.trigger('openPopup', parameter);
		},
		removeComment : function(){
			var self = this;
			var $comment = self.model.get('$comment');
			$comment.remove();
			var num = $('.jsTopicComment').length;
			self.model.set('comment_num', num);
		},
		renderCommentNum : function(){
			var self = this;
			var num = self.model.get('comment_num');
			$('.jsTopicCommentNum').text(num);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
