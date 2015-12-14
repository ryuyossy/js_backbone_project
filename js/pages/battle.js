define([
	'common/page',
	'pages/battle/common',
	'components/battle/battle_animation',
	'components/battle/battle_canvas',
	'components/battle/battle_main',
	'components/battle/battle_command',
	'components/battle/battle_tab',
	'components/battle/battle_situation_list',
	'components/guild/guild_bbs',
	'components/guild/guild_bbs_remove'
], function(
	PageClass,
	BattleCommonClass,
	BattleAnimation,
	BattleCanvas,
	BattleMain,
	BattleCommand,
	BattleTab,
	BattleSituationList,
	GuildBbs,
	GuildBbsRemove
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル',
			data_path : '/battle/get',
			template_path : '/tmpl/battle/battle.html',
			style_path : '/css/battle.css'
		},
		initialize : function(){
			var self = this;
			self.set({
				ajax_data : {
					'selected_tab' : RS.get('battle_selected_tab', false) || 1
				}
			});
			self._super();
			self.user.clear();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : BattleAnimation,
			battle_canvas : BattleCanvas,
			main : BattleMain,
			command : BattleCommand,
			tab : BattleTab,
			situation : BattleSituationList,
			guild_bbs : GuildBbs,
			guild_bbs_remove : GuildBbsRemove
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			comp.tab.on('touch:tab_button', comp.situation.clearCheckbox);
			self.model.on({
				'change:current_tab' : comp.tab.model.saveSelectedTab
			});
			self.on('bindEvents', comp.animation.initializeAnimation);
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
