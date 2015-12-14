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
			},
			'touch .jsButtonComposeConfirm' : 'jumpToConfirm'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('select', self.checkOver10);
			self.on('select', self.countChecked);
			self.on('select', self.saveChecked);
			self.on('initialize', self.restoreChecked);
			self.on('initialize', self.checkOver10);
			self.model.on('change:is_checked_top10', self.changeButtonSelectTop10);
			self.trigger('initialize');
		},
		changeList : function(){
			var self = this;
			var current_tab = page.model.get('current_tab');
			var template_id = current_tab.get('template');
			if (template_id === '#jsTemplateEquip') {
				if( self.model.has('equip_list') ) return;
				self.initializeEquipList();
			} else {
				if( self.model.has('material_list') ) return;
				self.initializeMaterialList();
			}
		},
		initializeEquipList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabComposeBaseEquip',
				template : '#jsTemplateEquip',
				more_flg_name : 'compose_more_flg',
				data_path : page.model.getDataPath('/compose/base'),
				ajax_data : RS.get('form_data', false)
			};
			var list = new page.list(parameter);
			list.on('render', self.checkOver10);
			self.model.set({equip_list : list});
		},
		initializeMaterialList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabComposeBaseMaterial',
				template : '#jsTemplateComposeBaseMaterials',
				more_flg_name : 'compose_more_flg',
				data_path : page.model.getDataPath('/compose/base'),
				ajax_data : RS.get('form_data', false)
			};
			self.model.set({
				material_list : new page.list(parameter)
			});
		},
		filter : function(){
			var self = this;
			var list;
			var is_level1 = !!$('.jsFilterLevel1')[0].checked;
			var is_same_attr = !!$('.jsFilterSameAttribute')[0].checked;
			var current_tab = page.model.get('current_tab');
			var template_id = current_tab.get('template');
			if( template_id === '#jsTemplateEquip' ){
				list = self.model.get('equip_list');
			} else {
				list = self.model.get('material_list');
			}
			var form_data = RS.get('form_data', false);
			RS.remove('form_data', false);
			RS.put({
				'form_data': {
					'selected_tab' : form_data.selected_tab,
					'base_selected_tab' : form_data.base_selected_tab,
					'user_equip_no' : form_data.user_equip_no
				}
			}, false);
			list.once('render', self.toggleListParts);
			list.filter({
				equip_type : $('.jsFilterEquipType').val(),
				attribute_type : $('.jsFilterAttributeType').val(),
				rarity : $('.jsFilterRarity').val(),
				sort_type : $('.jsFilterSortType').val(),
				level1 : is_level1,
				same_attribute : is_same_attr
			});
			self.model.set({'is_checked_top10' : false});
		},
		toggleListParts : function(){
			var current_tab = page.model.get('current_tab');
			var template_id = current_tab.get('template');
			if( template_id !== '#jsTemplateEquip' ) return;
			var has_list = !!$('.jsTabComposeBaseEquip').find('.jsList')[0];
			var $el = $('.jsButtonSelectTop10, .jsComposeConfirm');
			has_list ? $el.show() : $el.hide();
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
			self.trigger('select');
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
					var $el = $(this);
					if( !$el.attr('checked') ){
						$el.attr('disabled', 'disabled').removeAttr('checked');
					}
				});
			} else {
				$select.each(function(){
					var $el = $(this);
					if( $el.attr('disabled') && !$el.attr('data-static-disabled') ){
						$el.removeAttr('disabled');
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
				'form_data' : {
					'material_no' : sell_equipment,
					'user_equip_no' : RS.get('form_data', false).user_equip_no
				}
			}, false);
		},
		restoreChecked : function(){
			if( !RS.get('form_data', false).material_no ) return;
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
		},
		jumpToConfirm : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			if( !form_data.material_no.length ){
				page.trigger('openPopup', {
					title : '武具強化エラー',
					local_data : {
						'message' : '素材武具が選択されていません。'
					}
				});
				return;
			}
			RS.put({
				'form_data' : _.extend({
					'total_compose_num' : form_data.material_no.length,
					'material_type' : 1
				}, form_data),
				'form_target' : ["ComposeBaseSelect","ComposeSelectConfirm","ComposeResult"]
			}, false);
			page.trigger('changeURL', 'compose/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
