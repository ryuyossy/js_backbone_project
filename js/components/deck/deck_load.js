define(function(){
	//装備セット読込
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
			'touch .jsButtonDeckLoadConfirm' : 'getElement',
			'touch .jsButtonDeckLoadFix' : 'openCompletePopup',
			'touch .jsButtonDeckLoadEnd' : function(){
				this.trigger('reload');
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('getElement', self.openConfirmPopup);
			self.on('succeedSubmit', self.reloadTab);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsDeck');
			self.model.set({
				$el : $el,
				deck_no : $el.attr('data-index')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var deck_no = self.model.get('deck_no');
			var equip_type = (page.model.get('current_tab').get('index') || 0) + 1;
			equip_type = equip_type == 2 ? '防具' : '武器';
			if(deck_no == 3){
				deck_no = '③';
			} else if(deck_no == 2){
				deck_no = '②';
			} else {
				deck_no = '①';
			}
			var parameter = {
				title : equip_type + 'デッキ装備確認',
				template : '#jsTemplateDeckLoadConfirm',
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
					equip_type_name + 'デッキ装備中...',
					equip_type_name + 'デッキ装備完了'
				],
				template : '#jsTemplateDeckLoadComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/load'),
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



