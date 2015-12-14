define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
		},
		saveSelectedTab : function(){
			var before_tab = RS.get('battle_selected_tab', false) || 1;
			var after_tab = before_tab===1 ? 2 : 1;
			RS.put({'battle_selected_tab' : after_tab}, false);
		}
	});
	var View = Backbone.View.extend({
		el : '.jsBattleSituationAndBbs',
		events : {
			'touch .jsTabButtons li' : function(){
				this.trigger('touch:tab_button');
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var page_data = page.model.get('page_data');
			var selected_tab = page_data.selected_tab;
			var parameter = [
				{
					template : '#jsTemplateBattleAllSituation',
					data_path : page.model.getDataPath('/battle/situation/list'),
					ajax_data : {
						date : page_data.date_param,
						round : page_data.round,
						me_flg : false
					},
					more_flg_name : 'more_flg',
					is_default : selected_tab===1,
					is_reloadable : true,
					is_cacheable : false
				}, {
					template : '#jsTemplateGuildBbs',
					data_path : page.model.getDataPath('/guild/bbs/top'),
					ajax_data : {
						'num' : 5
					},
					more_flg_name : 'more_flg',
					is_default : selected_tab===2,
					is_reloadable : true,
					is_cacheable : false,
					is_clear_all : true
				}
			];
			page.trigger('setTabs', parameter);
		},
		removeTabNotification : function(){
			$('.jsBattleTabNotification').remove();
		}
	});
	return {
		Model : Model,
		View : View
	};
});
