define(function(){
	//アビリティを外す機能
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
			'touch .jsButtonAbilityUnset' : 'getElement',
			'touch .jsButtonAbilityUnsetFix' : 'openCompletePopup',
			'touch .jsButtonAbilityReload' : 'reloadAbilityPage'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on({
				'getElement' : self.openConfirmPopup,
				'removeElement' : function(){
					self.showButton();
					self.model.unsetAbility();
				}
			});
			self.model.on({
				'succeedDisarm' : self.removeElement,
				'failDisarm' : self.undoRemove
			});
		},
		getElement : function(e){
			var self = this;
			var $ability = $(e.currentTarget).parents('.jsAbility');
			var $selected = $('.jsTabButtons .select');
			self.model.set({
				$ability : $ability,
				ability_id : $ability.attr('data-ability-id'),
				ability_name : $ability.find('.abilityName').html(),
				ability_set_type : $selected.attr('data-ability-set-type')
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'アビリティ解除確認',
				template : '#jsTemplateAbilityUnsetConfirm',
				local_data : {
					'ability_name' : self.model.get('ability_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var ability_id = self.model.get('ability_id');
			var ability_set_type = self.model.get('ability_set_type');
			var parameter = {
				title : 'アビリティ解除',
				template : '#jsTemplateAbilityUnsetComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/ability/remove'),
				ajax_type : 'POST',
				ajax_data : {
					'ability_id' : ability_id,
					'ability_set_type' : ability_set_type
				}
			};
			page.trigger('openPopup', parameter);
		},
		reloadAbilityPage : function(){
			var self = this;
			var ability_set_type = self.model.get('ability_set_type');
			console.log('-----');
			console.log(ability_set_type);
			var is_front = ability_set_type != 2;
			page.trigger('changeURL', 'ability/' + is_front + '/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



