define([
	'common/page',
	'components/want/remove_confirm'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '欲しいものリスト削除',
			data_path : '/want/remove/confirm',
			template_path : '/tmpl/want/remove/confirm.html'
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