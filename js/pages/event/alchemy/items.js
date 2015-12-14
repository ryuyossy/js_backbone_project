define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '錬金で作れるアイテム一覧',
			data_path : '/event/alchemy/items/get',
			template_path : '/tmpl/event/alchemy/items.html',
			style_path : '/css/alchemy.css'
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