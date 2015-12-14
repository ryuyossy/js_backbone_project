define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonFilter' : 'getFilter',
			'touch .jsButtonSelectEquip' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.jumpToNextPage);
			self.on('getFilter', self.filter);
			self.trigger('initialize');
		},
		changeList : function(){
			var self = this;
			var current_tab = page.model.get('current_tab');
			var selected_tab = current_tab.get('ajax_data').selected_tab;
			if( self.model.has('equip_list'+selected_tab) ) return;
			if( selected_tab === 1 ){
				self.initializeAllList();
			} else if( selected_tab === 2 ){
				self.initializeEquipList();
			}
		},
		initializeAllList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabComposeAll',
				template : '#jsTemplateEquip2',
				more_flg_name : 'compose_more_flg',
				data_path : page.model.getDataPath('/compose/compose'),
				ajax_data : {
					'selected_tab' : 1
				}
			};
			var equip_list = new page.list(parameter);
			self.model.set({equip_list1 : equip_list});
		},
		initializeEquipList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabComposeEquip',
				template : '#jsTemplateEquip2',
				more_flg_name : 'compose_more_flg',
				data_path : page.model.getDataPath('/compose/compose'),
				ajax_data : {
					'selected_tab' : 2
				}
			};
			var equip_list = new page.list(parameter);
			self.model.set({equip_list2 : equip_list});
		},
		getFilter : function(){
			this.trigger('getFilter', {
				equip_type : $('.jsFilterEquipType').val(),
				attribute_type : $('.jsFilterAttributeType').val(),
				rarity : $('.jsFilterRarity').val(),
				sort_type : $('.jsFilterSortType').val()
			});
		},
		filter : function(parameter){
			var current_tab = page.model.get('current_tab');
			var selected_tab = current_tab.get('ajax_data').selected_tab;
			var list = this.model.get('equip_list'+selected_tab);
			list.filter(parameter);
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
			var current_tab = page.model.get('current_tab');
			var selected_tab = current_tab.get('ajax_data').selected_tab;
			RS.put({
				'form_data' : {
					'selected_tab' : selected_tab,
					'base_selected_tab' : 1,
					'user_equip_no' : self.model.get('equip_no'),
					'level1': true
				},
				'form_target' : "ComposeBaseSelect"
			}, false);
			self.page.trigger('changeURL', 'compose/base/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



