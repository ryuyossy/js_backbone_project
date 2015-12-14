define([
	'common/page'
], function(
	PageClass
){
	// ヘルプ詳細
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ヘルプ',
			data_path : '/help/detail',
			template_path : '/tmpl/help/detail.html',
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