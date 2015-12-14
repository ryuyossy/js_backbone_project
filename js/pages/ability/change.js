define([
	'common/page',
	'components/ability/ability_edit_tab',
	'components/ability/ability_list',
	'components/ability/ability_change'
], function(
	PageClass,
	AbilityEditTab,
	AbilityList,
	AbilityChange
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'アビリティ変更',
			data_path : '/ability/change/target',
			template_path : '/tmpl/ability/change.html',
			style_path : '/css/ability.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'tab' : AbilityEditTab,
			'list' : AbilityList,
			'change' : AbilityChange
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.model.on('change:current_tab', comp.list.changeList);
			comp.list.changeList();
		}
	});
	return {
		Model : Model,
		View : View
	};
});