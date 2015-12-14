define([
	'common/page'
], function(
	PageClass
){
	// 運営告知詳細
	var Model = PageClass.Model.extend({
		defaults : {
			title : '運営からのお知らせ',
			data_path : '/system/info/detail',
			template_path : '/tmpl/notice/detail.html',
			style_path : '/css/others.css'
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