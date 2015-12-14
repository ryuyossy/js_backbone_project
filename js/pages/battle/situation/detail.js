define([
	'common/page',
	'components/battle/battle_situation_list'
], function(
	PageClass,
	BattleSituationList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'バトル | 戦況履歴',
			data_path : '/battle/situation/list',
			template_path : '/tmpl/battle/situation/detail.html',
			ajax_type : 'GET',
			style_path : '/css/battle.css'	
		}
	});
	var View = PageClass.View.extend({
		components : {
			list : BattleSituationList
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
