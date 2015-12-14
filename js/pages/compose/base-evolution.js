define([
    'common/page',
    'components/compose/compose_base_evolution_list',
    'components/compose/compose_base_evolution_submit',
    'components/compose/compose_change'
], function(
    PageClass,
    ComposeBaseEvolutionList,
    ComposeBaseEvolutionSubmit,
    ComposeChange
){
	// 限界突破素材選択
	var Model = PageClass.Model.extend({
		defaults : {
			title : '合成素材選択',
			data_path : '/compose/base-evolution',
			template_path : '/tmpl/compose/base_evolution.html',
			ajax_type : 'GET',
			style_path : ['/css/compose.css', '/css/equip.css'],
			redirect_url : 'compose/compose-evolution/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			list : ComposeBaseEvolutionList,
			submit : ComposeBaseEvolutionSubmit,
			change : ComposeChange
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
