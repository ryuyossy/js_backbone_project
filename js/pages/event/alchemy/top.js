define([
	'common/page',
	'components/event/alchemy_submit'
], function(
	PageClass,
	AlchemySubmit
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ミッちゃんの錬金術はじめました。',
			data_path : '/event/alchemy/top/get',
			template_path : '/tmpl/event/alchemy/top.html',
			style_path : '/css/alchemy.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			submit : AlchemySubmit
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