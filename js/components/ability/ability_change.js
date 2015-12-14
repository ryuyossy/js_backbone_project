define(function(){
	//アビリティを変更する機能
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
			'touch .jsButtonAbilitySelect' : 'getElement',
			'touch .jsButtonAbilityChangeFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $before = $('.jsAbilityBefore');
			var $after = $(e.currentTarget).parents('.jsList');
			var ability_set_type = parseInt(page.model.get('query').ability_set_type) || 1;
			self.model.set({
				before : {
					id : $before.attr('data-ability-id'),
					name : $before.attr('data-ability-name')
				},
				after : {
					id : $after.attr('data-list-id'),
					name : $after.attr('data-ability-name')
				},
				ability_set_type : ability_set_type
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'アビリティ変更確認',
				template : '#jsTemplateAbilityChangeConfirm',
				local_data : {
					'before' : self.model.get('before'),
					'after' : self.model.get('after')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var before = self.model.get('before');
			var after = self.model.get('after');
			var ability_set_type = self.model.get('ability_set_type');
			var parameter = {
				titles : ['アビリティ変更中...', 'アビリティ変更完了'],
				template : '#jsTemplateAbilityChangeComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/ability/change/do'),
				ajax_type : 'POST',
				ajax_data : {
					'from_ability_id' : before.id,
					'to_ability_id' : after.id,
					'ability_set_type' : ability_set_type
				},
				local_data : {
					ability_set_type : ability_set_type
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



