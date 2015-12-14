define([
	'common/page',
	'components/deck/deck_change',
	'components/deck/deck_change_list'
], function(
	PageClass,
	DeckChange,
	DeckChangeList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '装備を変更',
			data_path : '/deck/equip/select-list',
			template_path : '/tmpl/deck/equip/change-list.html',
			style_path : '/css/equipage.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			"deck_change" : DeckChange,
			"deck_change_list" : DeckChangeList
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
