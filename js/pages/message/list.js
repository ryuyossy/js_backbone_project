define([
	'common/page',
	'components/message/message_list'
], function(
	PageClass,
	MessageList
){
	// メッセージ一覧
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'メッセージ',
			data_path : '/message/top',
			template_path : '/tmpl/message/list.html',
			style_path : '/css/prof.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'message_list' : MessageList
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