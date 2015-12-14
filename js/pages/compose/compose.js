define([
	'common/page',
	'components/compose/compose_list',
	'components/compose/compose_tab'
], function(
	PageClass,
	ComposeList,
	ComposeTab
){
	// 強化TOP
	var Model = PageClass.Model.extend({
		defaults : {
			title : '合成',
			data_path : '/compose/compose',
			template_path : '/tmpl/compose/list.html',
			style_path : [
				'/css/compose.css',
				'/css/equip.css',
				'/css/short_tutorial.css'
			],
			ajax_data : {
				'selected_tab' : 2
			}
		}
	});
	var View = PageClass.View.extend({
		components : {
			list : ComposeList,
			tab : ComposeTab
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.model.on('change:current_tab', comp.list.changeList);
			comp.list.on('getFilter', function(parameter){
				self.trigger('setTabFilter', {filter : parameter});
			});
			comp.list.changeList();
		}
		/*,
		render : function(){
			template = _.template($(template_path).html());
			return this;
		}
		*/
	});
	return {
		Model : Model,
		View : View
	};
});