define(function(){
	//アビリティを追加する機能
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
			'touch .jsButtonAbilityAddFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openConfirmPopup);
		},
		getElement : function(e){
			var self = this;
			var $list = $(e.currentTarget).parents('.jsList');
			var ability_set_type = parseInt(page.model.get('query').ability_set_type) || 1;
			self.model.set({
				'ability_id' : $list.attr('data-list-id'),
				'ability_name' : $list.attr('data-ability-name'),
				'ability_set_type' : ability_set_type
			});
			self.trigger('getElement');
		},
		openConfirmPopup : function(){
			var self = this;
			var parameter = {
				title : 'アビリティ追加確認',
				template : '#jsTemplateAbilityAddConfirm',
				local_data : {
					'id' : self.model.get('ability_id'),
					'name' : self.model.get('ability_name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var parameter = {
				titles : ['アビリティ追加中...', 'アビリティ追加完了'],
				template : '#jsTemplateAbilityAddComplete',
				is_closable : false,
				data_path : page.model.getDataPath('/ability/add'),
				ajax_type : 'POST',
				ajax_data : {
					'ability_id' : self.model.get('ability_id'),
					'ability_set_type' : page.model.get('query').ability_set_type
				},
				local_data : {
					ability_set_type : page.model.get('query').ability_set_type
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



