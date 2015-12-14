define([
    'common/page',
    'components/compose/compose_evolution_list'
], function(
	PageClass,
	ComposeEvolutionList
){
	// 限界突破TOP
	var Model = PageClass.Model.extend({
		defaults : {
			title : '合成',
			data_path : '/compose/compose-evolution',
			template_path : '/tmpl/compose/evolution_list.html',
			style_path : ['/css/compose.css', '/css/equip.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			list : ComposeEvolutionList
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
