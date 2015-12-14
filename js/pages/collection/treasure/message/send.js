define([
	'common/page'
], function(
	PageClass
){
	var page;
	var series_id;
	var treasure_id;
	var to_user_id;
	var message;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
			series_id = page_data.series_id;
			treasure_id = page_data.treasure_id;
			to_user_id = page_data.user_id;
			message = page_data.message;
		},
		submitComment : function($el, comment){
			var self = this;
			var message_id = $el.parents('.jsTopic').attr('data-message-id');
			$.ajax({
				type : 'POST',
				data : {
					message_id : message_id,
					post_text : comment
				},
				dataType : 'json',
				url : page.model.getDataPath('/guild/bbs/comment/add'),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedComment', $el, json);
					} else {
						self.trigger('failComment');
					}
				},
				error : function(){
					self.trigger('failComment');
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : '.jsGuildBbs',
		events : {
			'touch #jsPostTopicBefore' : 'showPostTopicForm',
			'touch .jsTopicLike' : 'readyLike',
			'touch .jsTopicCommentsToggle' : 'toggleComments',
			'touch .jsPostTopicCommentSubmit' : 'readySubmitComment'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('readyLike', self.model.toggleLikeData);
			self.on('readyLike', self.toggleLikeButton);
			self.on('toggleComments', self.model.loadComments);
			self.model.on('succeedLoadingComments', self.renderComments);
			self.on('renderComments', self.renderCommentNum);
			self.on('readySubmitComment', self.model.submitComment);
			self.model.on('succeedComment', self.addComment);
			self.on('addComment', self.clearCommentText);
			self.on('addComment', self.renderCommentNum);
			self.on('addComment', self.ageComment);
		},
		showPostTopicForm : function(){
			$('#jsPostTopicBefore').hide();
			$('#jsPostTopicForm').show();
		},
		readySubmitComment : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var $comments = $el.parents('.jsTopicComments');
			var comment = $el.parents('.jsPostTopicCommentForm')
							.find('.jsPostTopicCommentText').val();
			if(!comment) return;
			$comments.find('.jsTopicCommentsLoader').show();
			self.trigger('readySubmitComment', $el, comment);
		},
		addComment : function($el, json){
			var self = this;
			var $comments = $el.parents('.jsTopicComments');
			var $loader =$comments.find('.jsTopicCommentsLoader');
			var template = $('#jsTemplateGuildBbs').html();
			json = _.extend(json, {
				my_user_id : user_id
			});
			var html = $.templates(template).render(json);
			$comments.find('.jsTopicCommentsLoader').hide();
			$comments.find('.jsTopicCommentsInner').append(html);
			self.trigger('addComment', $el);
		}
	});
	/*
	var Model = PageClass.Model.extend({
		defaults : {
			title : '図鑑｜頼んでみる',
			data_path : '/collection/treasure/message/send',
			template_path : '/tmpl/collection/treasure/message/send.html'
		}
	});
	*/
	var View = PageClass.View.extend({
		components : {
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});