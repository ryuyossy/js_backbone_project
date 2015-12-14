define([
	'common/page',
	'pages/battle/common',
	'components/battle/cheer_members'
], function(
	PageClass,
	BattleCommonClass,
	CheerMembers
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : '鼓舞',
			data_path : '/battle/cheer/list',
			template_path : '/tmpl/battle/cheer.html',
			style_path : '/css/battle.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			members : CheerMembers
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



