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
			var parameter = {
				el : '.jsEquipList',
				template : '#jsTemplateEquip',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/equip/more_list')
			};
			var equip_list = new page.list(parameter);
			self.model.set({equip_list : equip_list});
		},
		filter : function(){
			var self = this;
			var list = self.model.get('equip_list');
			list.filter({
				equip_type : $('.jsFilterEquipType').val(),
				attribute_type : $('.jsFilterAttributeType').val(),
				rarity : $('.jsFilterRarity').val(),
				sort_type : $('.jsFilterSortType').val()
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



