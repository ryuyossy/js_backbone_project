define([
	'common/page',
	'components/deck/deck_disarm',
	'components/deck/deck_change_main',
	'components/deck/deck_add'
], function(
	PageClass,
	DeckDisarm,
	DeckChangeMain,
	DeckAdd
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '装備編集',
			data_path : '/deck/detail',
			template_path : '/tmpl/deck/edit.html',
			style_path : '/css/equipage.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			"deck_disarm" : DeckDisarm,
			"deck_change_main" : DeckChangeMain,
			"deck_add" : DeckAdd
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			comp.deck_change_main.on('reload', self.reload);
		}
	});
	return {
		Model : Model,
		View : View
	};
});