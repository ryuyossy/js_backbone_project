define(function(){
	var page;
	var user_id;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
			user_id = page_data.user.user_id;
			master_user_id = page_data.master_user_id;
		},
		toggleLikeData : function($el){
			var self = this;
			var message_id = $el.parents('.jsTopic').attr('data-list-id');
			var url = '/guild/bbs/like/';
			url += $el.hasClass('over') ? 'cancel' : 'add';
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'message_id' : message_id
				},
				dataType : 'json',
				url : page.model.getDataPath(url),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedChange');
					} else {
						page.trigger('catchError', json);
						self.trigger('undoToggleLike', $el);
					}
				},
				error : function(e){
					page.trigger('catchError', e);
					self.trigger('undoToggleLike', $el);
				}
			});
		},
		loadComments : function($el){
			var self = this;
			var message_id = $el.parents('.jsTopic').attr('data-list-id');
			$.ajax({
				type : 'GET',
				data : {
					'timestamp' : new Date/1000|0,
					'message_id' : message_id
				},
				dataType : 'json',
				url : page.model.getDataPath('/guild/bbs/comment/list'),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedLoadingComments', $el, json);
					} else {
						page.trigger('catchError', json);
					}
				},
				error : function(e){
					page.trigger('catchError', e);
				}
			});
		},
		validateTopic : function(option){
			var self = this;
			var topic_length = option.post_contents.length;
			if( topic_length > 255 ){
				error_message = '255文字以上の投稿をすることはできません。';
				self.trigger('validateTopicNG', error_message);
			} else if( topic_length === 0 ){
				error_message = '投稿文が入力されていません。';
				self.trigger('validateTopicNG', error_message);
			} else {
				self.trigger('validateTopicOK', option);
			}
		},
		submitTopic : function(arg){
			var self = this;
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'post_text' : arg.post_contents
				},
				dataType : 'json',
				url : page.model.getDataPath('/guild/bbs/post/add'),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedSubmitTopic', json);
					} else {
						page.trigger('catchError', json);
					}
				},
				error : function(e){
					page.trigger('catchError', e);
				}
			});
		},
		validateComment : function(option){
			var self = this;
			var comment_length = option.comment.length;
			if( comment_length > 255 ){
				error_message = '255文字以上のコメントを投稿することはできません。';
				self.trigger('validateCommentNG', error_message);
			} else if( comment_length === 0 ){
				error_message = 'コメントが入力されていません。';
				self.trigger('validateCommentNG', error_message);
			} else {
				self.trigger('validateCommentOK', option);
			}
		},
		submitComment : function(option){
			var self = this;
			var $el = option.$el;
			var comment = option.comment;
			var message_id = $el.parents('.jsTopic').attr('data-list-id');
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'message_id' : message_id,
					'post_text' : comment
				},
				dataType : 'json',
				url : page.model.getDataPath('/guild/bbs/comment/add'),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedComment', $el, json);
					} else {
						page.trigger('catchError', json);
						self.trigger('failComment', $el);
					}
				},
				error : function(e){
					page.trigger('catchError', e);
					self.trigger('failComment', $el);
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsGuildBbsTopicSubmit' : 'getFormTopicData',
			'touch .jsTopicLike' : 'readyLike',
			'touch .jsTopicCommentsToggle' : 'toggleComments',
			'touch .jsPostTopicCommentSubmit' : 'getFormCommentData'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getFormTopicData', self.model.validateTopic);
			self.model.on('validateTopicOK', self.clearTextarea);
			self.model.on('validateTopicOK', self.model.submitTopic);
			self.model.on('validateTopicNG', self.openErrorPopup);
			self.model.on('succeedSubmitTopic', self.addTopic);
			self.on('readyLike', self.model.toggleLikeData);
			self.on('readyLike', self.toggleLikeButton);
			self.on('changeToLike', self.getTopicY);
			self.on('changeToLike', self.ageTopic);
			self.on('changeToLike', self.setScrollTop);
			self.model.on('undoToggleLike', self.toggleLikeButton);
			self.on('toggleComments', self.model.loadComments);
			self.model.on('succeedLoadingComments', self.renderComments);
			self.on('renderComments', self.renderCommentNum);
			self.on('getFormCommentData', self.model.validateComment);
			self.model.on('validateCommentOK', self.clearCommentText);
			self.model.on('validateCommentOK', self.model.submitComment);
			self.model.on('validateCommentNG', self.openErrorPopup);
			self.model.on('succeedComment', self.addComment);
			self.on('addComment', self.renderCommentNum);
			self.on('addComment', self.getTopicY);
			self.on('addComment', self.ageTopic);
			self.on('addComment', self.setScrollTop);
			self.model.on('failComment', self.hideCommentsLoader);
			self.on('initialize', self.initializeTopics);
			self.trigger('initialize');
		},
		getFormTopicData : function(){
			var self = this;
			var $textarea = $('.jsGuildBbsTopicTextarea');
			var post_contents = $textarea.val();
			self.trigger('getFormTopicData', {
				$textarea : $textarea,
				post_contents : post_contents
			});
		},
		clearTextarea : function(arg){
			var self = this;
			arg.$textarea.val('');
		},
		addTopic : function(json){
			var self = this;
			var template = $('#jsTemplateGuildBbsTopics').html();
			json.user = {
				'user_id' : json.bbs_posts[0].user_id
			};
			var html = $.templates(template).render(json);
			$('.jsGuildBbsTopics').find('.jsListAll').prepend(html);
			$('.jsGuildBbsNoTopics').remove();
		},
		readyLike : function(e){
			var $el = $(e.currentTarget);
			this.trigger('readyLike', $el);
		},
		toggleLikeButton : function($el){
			var $num = $el.find('.jsTopicLikeNum');
			var like_num = $num.html() - 0;
			like_num = $el.hasClass('over') ? --like_num : ++like_num;
			$el.toggleClass('over');
			$num.html(like_num);
			if( $el.hasClass('over') ) this.trigger('changeToLike', $el);
		},
		toggleComments : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var $comments = $el.parents('.jsTopic').find('.jsTopicComments');
			var is_opened = $el.hasClass('open');
			$el.toggleClass('open');
			_.delay(function(){
				if( is_opened ){
					$comments.hide();
				} else {
					$comments.show();
					self.trigger('toggleComments', $el);
				}
			}, 10);
		},
		renderComments : function($el, json){
			var self = this;
			var $comments = $el.parents('.jsTopic').find('.jsTopicComments');
			var template = $('#jsTemplateGuildBbsComments').html();
			var data = _.extend({
				user : {user_id : user_id},
				topic_user_id : $el.parents('.jsTopic').attr('data-topic-user-id') - 0
			}, json);
			var html = $.templates(template).render(data);
			$comments.find('.jsTopicCommentsLoader').hide();
			$comments.find('.jsTopicCommentsInner').html(html);
			self.trigger('renderComments', $el);
		},
		getFormCommentData : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var $comments = $el.parents('.jsTopicComments');
			var comment = $el.parents('.jsPostTopicCommentForm')
							.find('.jsPostTopicCommentText').val();
			$comments.find('.jsTopicCommentsLoader').show();
			self.trigger('getFormCommentData', {
				$el : $el,
				comment : comment
			});
		},
		clearCommentText : function(option){
			option.$el.parents('.jsPostTopicCommentForm')
			.find('.jsPostTopicCommentText').val('');
		},
		addComment : function($el, json){
			var self = this;
			var $comments = $el.parents('.jsTopicComments');
			var $loader = $comments.find('.jsTopicCommentsLoader');
			var template = $('#jsTemplateGuildBbsComments').html();
			json = _.extend(json, {
				user : {user_id : json.comments[0].user_id},
				topic_user_id : $el.parents('.jsTopic').attr('data-topic-user-id') - 0
			});
			var html = $.templates(template).render(json);
			$comments.find('.jsTopicCommentsLoader').hide();
			$comments.find('.jsTopicCommentsInner').append(html);
			self.trigger('addComment', $el);
		},
		renderCommentNum : function($el){
			var $topic = $el.parents('.jsTopic');
			var $num = $topic.find('.jsTopicCommentNum');
			var $comments = $topic.find('.jsTopicCommentsInner .jsTopicComment');
			$num.html($comments.length);
		},
		ageTopic : function($el){
			var $topic = $el.parents('.jsTopic');
			var $1st = $('.jsTopic').eq(0);
			$topic.insertBefore($1st);
		},
		getTopicY : function($el){
			var topic = $el.parents('.jsTopic')[0];
			this.model.set({
				scroll_diff : topic.offsetTop - window.scrollY
			});
		},
		setScrollTop : function(){
			var current = $('.jsTopic')[0];
			var scroll_diff = this.model.get('scroll_diff');
			var offset_top = current.offsetTop - scroll_diff;
			window.scrollTo(0, offset_top);
		},
		hideCommentsLoader : function($el){
			var $comments = $el.parents('.jsTopicComments');
			$comments.find('.jsTopicCommentsLoader').hide();
		},
		initializeTopics : function(){
			var parameter = {
				el : '.jsGuildBbsTopics',
				template : '#jsTemplateGuildBbsTopics',
				more_flg_name : 'bbs_more_flg',
				data_path : page.model.getDataPath('/guild/bbs/post/more_list')
			};
			var Topics = new page.list(parameter);
		},
		openErrorPopup : function(error_message){
			var parameter = {
				title : '入力エラー',
				local_data : {
					'message' : error_message
				}
			};
			page.trigger('openPopup', parameter);
			$('.jsTopicCommentsLoader').hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});
