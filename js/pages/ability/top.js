define([
	'common/page',
	'components/ability/ability_tab',
	'components/ability/ability_unset'
], function(
	PageClass,
	AbilityTab,
	AbilityUnset
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'アビリティ',
			data_path : '/ability/top',
			template_path : '/tmpl/ability/top.html',
			style_path : ['/css/ability.css', '/css/short_tutorial.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			'tab' : AbilityTab,
			'unset' : AbilityUnset
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});