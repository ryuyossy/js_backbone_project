define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonFilter' : 'filter',
			'touch .jsButtonSelectEquip' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.jumpToNextPage);
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var parameter = {
				el : '.jsEvolutionList',
				template : '#jsTemplateEquip2',
				more_flg_name : 'compose_more_flg',
				data_path : page.model.getDataPath('/compose/compose-evolution')
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
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsList');
			self.model.set({
				equip_no : $el.attr('data-list-id')
			});
			self.trigger('getElement');
		},
		jumpToNextPage : function(){
			var self = this;
			RS.put({
				'form_data' : {
					'user_equip_no' : self.model.get('equip_no')
				},
				'form_target' : "ComposeBaseEvolutionSelect"
			}, false);
			self.page.trigger('changeURL', 'compose/base-evolution/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



