define(function(){
	//装備追加popup
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
			
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonSelectEquip' : 'getElement',
			'touch .jsButtonDeckEquipAddFix' : 'openCompletePopup',
			'touch .jsButtonEquipAdd' : 'jumpToDeckEquipAddConfirm'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openConfirmPopup);
			page = self.page;
			page_data = page.model.get('page_data');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsList');
			self.model.set({
				$el : $el,
				equip_type : $el.attr('data-equip-type'),
				user_equip_no : $el.attr('data-user-equip-no')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var query = page.model.get('query');
			var parameter = {
				titles : ['装備情報取得中...', '装備追加確認'],
				template : '#jsTemplatePopupDeckEquipAddConfirm',
				is_closable : true,
				data_path : page.model.getDataPath('/deck/equip/change_confirm'),
				ajax_type : 'GET',
				ajax_data : {
					'equip_type' : self.model.get('equip_type'),
					'deck_no' : query.deck_no,
					'place_no' : query.place_no,
					'user_equip_no' : self.model.get('user_equip_no')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var query = page.model.get('query');
			var parameter = {
				titles : ['装備追加中...', '装備追加完了'],
				template : '#jsTemplatePopupDeckEquipAddComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/equip/change_execute'),
				ajax_type : 'POST',
				ajax_data : {
					'equip_type' : self.model.get('equip_type'),
					'deck_no' : query.deck_no,
					'place_no' : query.place_no,
					'user_equip_no' : self.model.get('user_equip_no')
				}
			};
			page.trigger('openPopup', parameter);
		},
		jumpToDeckEquipAddConfirm : function(){
			var self = this;
			var query = page.model.get('query');
			var equip_type = query.equip_type;
			var deck_no = query.deck_no;
			var place_no = $('.jsSubEquip').length + 1;
			var url = 'deck/equip/add-list/'+equip_type+'/'+deck_no+'/'+place_no+'/';
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



