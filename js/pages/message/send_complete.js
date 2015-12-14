define([
	'common/page'
], function(
	PageClass
){
	// メッセージ送信完了
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'メッセージ',
			data_path : '/message/send',
			ajax_type : 'POST',
			template_path : '/tmpl/message/send_complete.html',
			redirect_url : 'message/list/',
			style_path : '/css/prof.css'
		}
	});
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