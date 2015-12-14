define([
	'common/page',
	'components/friend/greet',
	'components/friend/remove_confirm'
], function(
	PageClass,
	Greet,
	RemoveConfirm
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'フレンドリスト',
			data_path : '/friend/list',
			template_path : '/tmpl/friend/list.html',
			style_path : '/css/friend.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'greet' : Greet,
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