define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'フレンドリスト',
			data_path : '/friend/remove/do',
			template_path : '/tmpl/friend/remove/do.html',
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