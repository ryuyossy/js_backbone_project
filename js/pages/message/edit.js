define([
	'common/page',
	'components/message/message_edit'
], function(
	PageClass,
	MessageEdit
){
	// メッセージ編集
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'メッセージ',
			data_path : '/prof/user_info',
			template_path : '/tmpl/message/edit.html',
			style_path : '/css/prof.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'edit' : MessageEdit
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