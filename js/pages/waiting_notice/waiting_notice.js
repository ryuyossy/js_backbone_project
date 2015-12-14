define([
	'common/page'
], function(
	PageClass
){
	// バトルまで何する？ページ
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ジョブ',
			data_path : '/common/header',
			template_path : '/tmpl/waiting_notice/top.html',
			style_path : '/css/battle_what.css'
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