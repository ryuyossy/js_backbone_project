define(function(){
	// アビリティリスト
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		},
		changeList : function(){
			var self = this;
			var current_tab = page.model.get('current_tab');
			var ajax_data = current_tab.get('ajax_data');
			
			var ability_effect_type = ajax_data.ability_effect_type;
			if( self.model.has('ability_list'+ability_effect_type) ) return;
			
			var ability_set_type = parseInt(page.model.get('query').ability_set_type) || 1;
			ajax_data['ability_set_type'] = ability_set_type;
			self.initializeList(ajax_data);
		},
		initializeList : function(ajax_data){
			var self = this;
			var ability_effect_type = ajax_data.ability_effect_type;
			var parameter = {
				el : '.jsAbilityList'+ability_effect_type,
				template : '#jsTemplateAbilityList',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/ability/list'),
				ajax_data : ajax_data
			};
			var ability_list = new page.list(parameter);
			var v = {};
			v['ability_list'+ability_effect_type] = ability_list;
			self.model.set(v);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



