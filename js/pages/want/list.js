define([
	'common/page',
	'components/want/remove_confirm'
], function(
	PageClass,
	RemoveConfirm
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '欲しいものリスト',
			data_path : '/want/list',
			template_path : '/tmpl/want/list.html'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'removeConfirm' : RemoveConfirm
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