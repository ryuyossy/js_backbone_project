define(function(){
	//メイン装備にするpopup
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonDeckChangeMainConfirm' : 'getElement',
			'touch .jsButtonDeckChangeMainFix' : 'openCompletePopup',
			'touch .jsButtonDeckChangeMainEnd' : function(){
				this.trigger('reload');
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openConfirmPopup);
			page = self.page;
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsSubEquip');
			self.model.set({
				$el : $el
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var $el = self.model.get('$el');
			var parameter = {
				title : 'メイン装備確認',
				template : '#jsTemplatePopupDeckChangeMainConfirm',
				local_data : {
					"equip_name" : $el.attr('data-equip-name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var $el = self.model.get('$el');
			var parameter = {
				titles : ['メイン装備中...', 'メイン装備完了'],
				template : '#jsTemplatePopupDeckChangeMainComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/equip/change_main'),
				ajax_type : 'POST',
				ajax_data : {
					'equip_type' : $el.attr('data-equip-type'),
					'deck_no' : page.model.get('query').deck_no,
					'place_no' : $el.attr('data-place-no')
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



