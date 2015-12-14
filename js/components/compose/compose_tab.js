define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		initialize : function(){
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var selected_tab = page.model.get('query').selected_tab || 1;
			var equipDefault = true;
			if (selected_tab == 2){
				equipDefault = false;
			}
			var parameter = [
				{
					template : '#jsTemplateEquip2',
					data_path : page.model.getDataPath('/compose/compose'),
					ajax_type : 'GET',
					ajax_data : {
						'selected_tab' : 2
					},
					more_flg_name : 'compose_more_flg',
					is_default : equipDefault,
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateEquip2',
					data_path : page.model.getDataPath('/compose/compose'),
					ajax_type : 'GET',
					ajax_data : {
						'selected_tab' : 1
					},
					more_flg_name : 'compose_more_flg',
					is_default : !equipDefault,
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



