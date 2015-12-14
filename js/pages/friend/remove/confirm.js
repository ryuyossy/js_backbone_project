define([
	'common/page',
	'components/friend/remove_confirm'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'フレンドリスト削除',
			data_path : '/friend/remove/confirm',
			template_path : '/tmpl/friend/remove/confirm.html',
			style_path : '/css/friend.css'
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