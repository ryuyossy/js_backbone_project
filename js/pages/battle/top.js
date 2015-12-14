define([
	'common/page',
	'components/guild/guild_bbs'
], function(
	PageClass,
	GuildBbs
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'バトル | トップ',
			data_path : '/battle/top/get',
			template_path : '/tmpl/battle/top.html',
			ajax_type : 'GET',
			style_path : ['/css/battle.css', '/css/short_tutorial.css']
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
			guild_bbs : GuildBbs
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
