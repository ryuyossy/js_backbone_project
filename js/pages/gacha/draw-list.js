define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '入手可能武具リスト取得',
			data_path : '/gacha/draw/list',
			template_path : '/tmpl/gacha/draw-list.html',
			style_path : '/css/gacha.css'
		}
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