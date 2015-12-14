define([
	'common/page',
	'components/notice/notice_list'
], function(
	PageClass,
	NoticeList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '運営からのお知らせ',
			data_path : '/system/info/list',
			template_path : '/tmpl/notice/list.html',
			style_path : '/css/others.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'notice_list' : NoticeList
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