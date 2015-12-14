define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .composeEquipTab' : 'showComposeButton',
			'touch .composeMaterialTab' : 'hideComposeButton'
		},
		initialize : function(){
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var self = this;
			var user_equip_no = RS.get('form_data', false).user_equip_no;
			var selected_tab = page.model.get('query').base_selected_tab || 1;
			var parameter = [
				{
					template : '#jsTemplateEquip',
					data_path : page.model.getDataPath('/compose/base'),
					ajax_type : 'GET',
					ajax_data : {
						'user_equip_no' : user_equip_no,
						'selected_tab' : 1,
						'base_selected_tab' : 1
					},
					more_flg_name : 'compose_more_flg',
					is_default : selected_tab != 2,
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateComposeBaseMaterials',
					data_path : page.model.getDataPath('/compose/base'),
					ajax_type : 'GET',
					ajax_data : {
						'user_equip_no' : user_equip_no,
						'selected_tab' : 1,
						'base_selected_tab' : 2
					},
					is_default : selected_tab == 2,
					is_reloadable : true,
					is_cacheable : true,
					success : page.initializeCounter
				}
			];
			page.trigger('setTabs', parameter);
		},
		showComposeButton : function(){
			$('.jsComposeConfirm').removeClass('hide');
		},
		hideComposeButton : function(){
			$('.jsComposeConfirm').addClass('hide');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
