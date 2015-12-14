define(function(){
	//装備デッキ保存
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
			'touch .jsDeckSaveConfirmButton' : 'getDeckNo',
			'touch .jsDeckSaveCompleteButton' : 'openCompletePopup',
			'touch .jsButtonDeckSaveFix' : 'reloadDeckPage'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('getDeckNo', self.openConfirmPopup);
			self.on('succeedSubmit', self.reloadTab);
		},
		getDeckNo : function(){
			var self = this;
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			var $current_tab = equip_type==2 ? $('.jsTabProtector') : $('.jsTabWeapon');
			var $decks = $current_tab.find('.jsDeck');
			var el = _.find($decks, function(deck){
				return $(deck).hasClass('off');
			});
			var deck_no = $(el).attr('data-index');
			self.model.set({deck_no : deck_no});
			self.trigger('getDeckNo');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {};
			var deck_no = self.model.get('deck_no');
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			equip_type = equip_type == 2 ? '防具' : '武器';
			if( !deck_no ){
				parameter = {
					title : '保存できません',
					local_data : {
						'message' : equip_type + 'デッキに空きがありません。'
					}
				};
			} else {
				if(deck_no == 3){
					deck_no = '③';
				} else if(deck_no == 2){
					deck_no = '②';
				} else {
					deck_no = '①';
				}
				parameter = {
					title : equip_type + 'デッキ保存確認',
					template : '#jsTemplateDeckSaveConfirm',
					local_data : {
						set_name : equip_type + 'デッキ' + deck_no
					}
				};
			}
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			var equip_type_name = equip_type == 2 ? '防具' : '武器';
			var parameter = {
				titles : [
					equip_type_name + 'デッキ保存中...',
					equip_type_name + 'デッキ保存完了'
				],
				template : '#jsTemplateDeckSaveComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/save'),
				ajax_type : 'POST',
				ajax_data : {
					'equip_type' : equip_type,
					'deck_no' : self.model.get('deck_no')
				}
			};
			self.model.set({
				equip_type : equip_type
			});
			page.trigger('openPopup', parameter);
		},
		reloadDeckPage : function(){
			var self = this;
			var equip_type = self.model.get('equip_type');
			page.trigger('changeURL', 'deck/list/' + equip_type + '/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



