define([
	'common/page',
	'components/item/item_use'
], function(
	PageClass,
	ItemUse
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'アイテム',
			data_path : '/item/list',
			template_path : '/tmpl/item/list.html',
			style_path : '/css/item.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'item_use': ItemUse
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