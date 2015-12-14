define(function(){
	//装備デッキ削除
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonDeckRemoveConfirm' : 'getDeckId',
			'touch .jsButtonDeckRemoveFix' : 'openCompletePopup',
			'touch .jsButtonDeckRemoveEnd' : function(){
				this.trigger('reload');
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('getDeckId', self.openConfirmPopup);
			self.on('succeedSubmit', self.reloadTab);
		},
		getDeckId : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsDeck');
			self.model.set({
				'deck_no' : $el.attr('data-index')
			});
			self.trigger('getDeckId');
		},
		openConfirmPopup : function(e){
			var self = this;
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			equip_type = equip_type == 2 ? '防具' : '武器'
			var deck_no = self.model.get('deck_no');
			if(deck_no == 3){
				deck_no = '③';
			} else if(deck_no == 2){
				deck_no = '②';
			} else {
				deck_no = '①';
			}
			var parameter = {
				title : equip_type + 'デッキ削除確認',
				template : '#jsTemplateDeckRemoveConfirm',
				is_closable : true,
				local_data : {
					set_name : equip_type + 'デッキ' + deck_no
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			var equip_type_name = equip_type == 2 ? '防具' : '武器';
			var parameter = {
				titles : [
					equip_type_name + 'デッキ削除中...',
					equip_type_name + 'デッキ削除完了'
				],
				template : '#jsTemplateDeckRemoveComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/remove'),
				ajax_type : 'POST',
				ajax_data : {
					'equip_type' : equip_type,
					'deck_no' : self.model.get('deck_no')
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



