define([
    'common/page',
    'components/compose/compose_base_list',
    'components/compose/compose_base_tab',
    'components/compose/compose_base_submit',
    'components/compose/compose_change'
], function(
    PageClass,
    ComposeBaseList,
    ComposeBaseTab,
    ComposeBaseSubmit,
    ComposeChange
){
	// 強化素材選択
	var Model = PageClass.Model.extend({
		defaults : {
			title : '合成素材選択',
			data_path : '/compose/base',
			template_path : '/tmpl/compose/base.html',
			ajax_type : 'GET',
			ajax_data : {
				equip_type : '',
				sort_type : 'POWER_ASC',
				level1 : true,
				same_attribute : false
			},
			style_path : ['/css/compose.css', '/css/equip.css'],
			redirect_url : 'compose/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			list : ComposeBaseList,
			tab : ComposeBaseTab,
			sub : ComposeBaseSubmit,
			change : ComposeChange
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
