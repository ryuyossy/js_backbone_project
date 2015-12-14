define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ページのタイトルを入れます',
			data_path : '/battle/yell/do', //←JSON APIのパスを入れます
			template_path : '/tmpl/common/canvas.html', //←jsRenderのテンプレートファイルのパスを入れます
			ajax_type : 'POST', // リクエストメソッド（省略するとGET）
			style_path : '/css/battle.css'
			//↑そのページ用のスタイルシートのパスを入れます、配列にすれば複数も可、必要なければ指定ナシでOK
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