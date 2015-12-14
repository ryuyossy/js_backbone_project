define([
	'common/page',
	'components/battle/history_main'
], function(
	PageClass,
	HistoryMain
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'バトル | 戦況履歴一覧',
			data_path : '/battle/history/list',
			template_path : '/tmpl/battle/situation/list.html',
			ajax_type : 'GET',
			style_path : '/css/battle.css'	
		}
		/*
		↓URLのパラメータを、テンプレートのrenderに渡したぃ場合、以下のょぅにします
		,
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				id : self.get('query').id
			});
		}
		*/
	});
	var View = PageClass.View.extend({
		components : {
			main : HistoryMain
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
