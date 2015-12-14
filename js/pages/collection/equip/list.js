define([
	'common/page',
	'components/collection/equip/collection_equip_list'
], function(
	PageClass,
	CollectionEquipList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '武具図鑑',
			data_path : '/collection/equip/list',
			template_path : '/tmpl/collection/equip/list.html',
			style_path : '/css/collection.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'collection_equip_list' : CollectionEquipList
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