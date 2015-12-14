define([
	'common/page',
	'components/event/battle_weeks'
], function(
	PageClass,
	BattleWeeks
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'バトル強化週間',
			data_path : '/event/battle/weeks/get',
			template_path : '/tmpl/event/battle/weeks.html',
			style_path : '/css/battle_weeks.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'battle_weeks' : BattleWeeks
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