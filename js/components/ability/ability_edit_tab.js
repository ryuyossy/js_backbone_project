define(function(){
	//アビリティ変更・追加画面タブ
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var ability_set_type = parseInt(page.model.get('query').ability_set_type) || 1;
			var ability_id = parseInt(page.model.get('query').ability_id) || 0;
			var parameter = [
				{
					template : '#jsTemplateAbilityList',
					data_path : page.model.getDataPath('/ability/list'),
					ajax_type : 'GET',
					ajax_data : {
						'ability_effect_type' : 1,
						'ability_set_type' : ability_set_type,
						'before_ability_id' : ability_id
					},
					more_flg_name : 'more_flg',
					is_default : true,
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateAbilityList',
					data_path : page.model.getDataPath('/ability/list'),
					ajax_type : 'GET',
					ajax_data : {
						'ability_effect_type' : 2,
						'ability_set_type' : ability_set_type,
						'before_ability_id' : ability_id
					},
					more_flg_name : 'more_flg',
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateAbilityList',
					data_path : page.model.getDataPath('/ability/list'),
					ajax_type : 'GET',
					ajax_data : {
						'ability_effect_type' : 3,
						'ability_set_type' : ability_set_type,
						'before_ability_id' : ability_id
					},
					more_flg_name : 'more_flg',
					is_reloadable : true,
					is_cacheable : true
				}
			];
			page.trigger('setTabs', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



