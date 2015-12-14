define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonFilter' : 'filter',
			'touch .jsButtonSelectTop10' : 'selectTop10',
			'change .jsButtonSelect' : function(){
				this.model.set({'is_checked_top10' : false});
				this.trigger('select');
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('select', self.checkOver10);
			self.on('select', self.countChecked);
			self.on('select', self.saveChecked);
			self.on('initialize', self.initializeList);
			self.on('initialize', self.restoreChecked);
			self.on('initialize', self.checkOver10);
			self.model.on('change:is_checked_top10', self.changeButtonSelectTop10);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var parameter = {
				el : '.jsEquipSellList',
				template : '#jsTemplateEquip',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/equip/more_list')
			};
			var equip_list = new page.list(parameter);
			self.model.set({equip_list : equip_list});
			self.listenTo(equip_list.model, 'makeHTML', self.checkOver10);
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
			self.model.set({'is_checked_top10' : false});
		},
		selectTop10 : function(){
			var self = this;
			var $select = $('.jsButtonSelect').find('input[type="checkbox"]');
			if( !self.model.get('is_checked_top10') ){
				$select.each(function(index){
					if(index < 10){
						this.checked = true;
					} else {
						this.checked = false;
					}
				});
				self.model.set({'is_checked_top10' : true});
			} else {
				$select.each(function(){
					this.checked = false;
				});
				self.model.set({'is_checked_top10' : false});
			}
			this.trigger('select');
		},
		changeButtonSelectTop10 : function(){
			var self = this;
			var $selectTop10 = $('.jsButtonSelectTop10');
			if( self.model.get('is_checked_top10') ){
				$selectTop10.addClass('checkAfter').removeClass('checkBefore');
				_.defer(function(){
					$selectTop10.find('button').addClass('on').removeClass('off');
				});
			} else {
				$selectTop10.addClass('checkBefore').removeClass('checkAfter')
				.find('button').addClass('off').removeClass('on')
			}
		},
		checkOver10 : function(){
			var $select = $('.jsButtonSelect').find('input[type="checkbox"]');
			var checked_num = $select.filter(':checked').length;
			if( checked_num >= 10 ){
				$select.each(function(){
					if( !this.checked ){
						this.disabled = true;
						$(this).parent('.jsButtonSelect').find('span').text('選択不可');
					}
				});
			} else {
				$select.each(function(){
					if( !this.checked ){
						this.disabled = false;
						$(this).parent('.jsButtonSelect').find('span').text('選択する');
					}
				});
			}
		},
		countChecked : function(){
			var $select = $('.jsButtonSelect').find('input[type="checkbox"]');
			var checked_num = $select.filter(':checked').length;
			$('.jsCountChecked').text(checked_num);
		},
		saveChecked : function(){
			var $select = $('.jsButtonSelect').find('input[type="checkbox"]');
			var sell_equipment = [];
			$select.each(function(){
				if( !this.checked ) return;
				var id = $(this).attr('data-equip-id') - 0;
				sell_equipment.push(id);
			});
			RS.put({
				'form_data' : {'user_equip_nos' : sell_equipment},
				'form_target' : ["EquipSellList","EquipSellConfirm","EquipSellComplete"]
			}, false);
		},
		restoreChecked : function(){
			if( !RS.is('form_data', false).user_equip_nos ) return;
			var sell_equipment = RS.get('sell_equipment', false);
			var $select = $('.jsButtonSelect');
			$select.each(function(){
				var $el = $(this);
				var equip_id = $el.attr('data-equip-id');
				var is_checked = !!_.find(sell_equipment, function(id){
					return equip_id === id;
				});
				if( !is_checked ) return true;
				$el.attr('checked', 'checked');
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});
