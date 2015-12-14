define(function(){
	//装備変更popup
	var page;
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
			'touch .jsButtonDeckEquipChangeFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openConfirmPopup);
			page = self.page;
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
			var $el = self.model.get('$el');
			var parameter = {
				titles : ['装備情報取得中...', '装備変更確認'],
				template : '#jsTemplatePopupDeckEquipChangeConfirm',
				is_closable : true,
				data_path : page.model.getDataPath('/deck/equip/change_confirm'),
				ajax_type : 'GET',
				ajax_data : {
					'equip_type' : self.model.get('equip_type'),
					'deck_no' : page.model.get('query').deck_no,
					'place_no' : page.model.get('query').place_no,
					'user_equip_no' : self.model.get('user_equip_no')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var $el = self.model.get('$el');
			var parameter = {
				titles : ['装備変更中...', '装備変更完了'],
				template : '#jsTemplatePopupDeckEquipChangeComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/equip/change_execute'),
				ajax_type : 'POST',
				ajax_data : {
					'equip_type' : self.model.get('equip_type'),
					'deck_no' : page.model.get('query').deck_no,
					'place_no' : page.model.get('query').place_no,
					'user_equip_no' : self.model.get('user_equip_no')
				}
			};
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



