define([
	'common/page'
], function(
	PageClass
){
	// メッセージ詳細
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'メッセージ',
			data_path : '/message/detail',
			template_path : '/tmpl/message/detail.html',
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