define([
	'common/page',
	'components/ability/ability_edit_tab',
	'components/ability/ability_list',
	'components/ability/ability_add'
], function(
	PageClass,
	AbilityEditTab,
	AbilityList,
	AbilityAdd
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'アビリティ一覧',
			data_path : '/ability/list',
			template_path : '/tmpl/ability/add.html',
			style_path : '/css/ability.css'
		}
		,
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				ability_set_type : self.get('query').ability_set_type
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			'tab' : AbilityEditTab,
			'list' : AbilityList,
			'add' : AbilityAdd
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