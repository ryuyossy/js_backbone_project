define([
	'common/page',
	'components/deck/deck_tab',
	'components/deck/deck_bulk',
	'components/deck/deck_save',
	'components/deck/deck_load',
	'components/deck/deck_remove'
], function(
	PageClass,
	DeckTab,
	DeckBulk,
	DeckSave,
	DeckLoad,
	DeckRemove
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '装備',
			data_path : '/deck/list',
			template_path : '/tmpl/deck/list.html',
			style_path : ['/css/equipage.css', '/css/short_tutorial.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			'deck_tab': DeckTab, //タブ切り替え
			'deck_bulk': DeckBulk, //一括装備
			'deck_save': DeckSave, //セットに保存
			'deck_load': DeckLoad, //装備する
			'deck_remove': DeckRemove //削除する
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			comp.deck_bulk.on('reload', self.reload);
			comp.deck_save.on('reload', self.reload);
			comp.deck_load.on('reload', self.reload);
			comp.deck_remove.on('reload', self.reload);
		}
	});
	return {
		Model : Model,
		View : View
	};
});