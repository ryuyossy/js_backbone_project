define([
	'common/page',
	'components/deck/deck_add',
	'components/deck/deck_add_list'
], function(
	PageClass,
	DeckAdd,
	DeckAddList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '装備追加選択',
			data_path : '/deck/equip/select-list',
			template_path : '/tmpl/deck/equip/add-list.html',
			style_path : '/css/equipage.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			"deck_add" : DeckAdd,
			"deck_add_list" : DeckAddList
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
