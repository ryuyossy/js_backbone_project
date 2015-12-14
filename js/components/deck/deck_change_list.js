define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonFilter' : 'filter'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var query = page.model.get('query');
			var parameter = {
				el : '.jsEquipList',
				template : '#jsTemplateEquip2',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/deck/equip/select-list'),
				ajax_data : {
					'equip_type' : query.equip_type,
					'deck_no' : query.deck_no,
					'place_no' : query.place_no,
					'user_equip_no' : query.user_equip_no
				}
			};
			var equip_list = new page.list(parameter);
			self.model.set({equip_list : equip_list});
		},
		filter : function(){
			var self = this;
			var list = self.model.get('equip_list');
			list.filter({
				attribute_type : $('.jsFilterAttributeType').val(),
				sort_type : $('.jsFilterSortType').val()
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



