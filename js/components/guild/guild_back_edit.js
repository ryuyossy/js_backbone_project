define(function(){
	// 後衛希望
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'change .jsButtonGuildBackEdit' : 'getButtonStatus'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getButtonStatus', self.openCompletePopup);
			self.on('openCompletePopup', self.changeButton);
		},
		getButtonStatus : function(e){
			var self = this;
			var $button = $(e.currentTarget);
			var $battle = $button.parents('.jsList');
			self.model.set({
				'$button' : $button,
				'$battle' : $battle,
				'is_back' : $button[0].checked,
				'battle_no' : $battle.attr('data-battle-no')
			});
			self.trigger('getButtonStatus');
		},
		openCompletePopup : function(){
			var self = this;
			var is_back = self.model.get('is_back');
			var parameter = {
				title : is_back ? '後衛希望' : '後衛希望解除',
				template : '#jsTemplatePopupBackEdit',
				data_path : page.model.getDataPath('/guild/back/edit'),
				ajax_type : 'POST',
				ajax_data : {
					'battle_no' : self.model.get('battle_no')
				},
				success : function(json){
					self.trigger('openCompletePopup', json.back_flg);
				}
			};
			page.trigger('openPopup', parameter);
		},
		changeButton : function(back_flg){
			var self = this;
			var $el = self.model.get('$button');
			$el[0].checked = back_flg;
		}
	});
	return {
		Model : Model,
		View : View
	};
});