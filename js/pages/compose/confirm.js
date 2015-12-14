define([
	'common/page',
	'components/compose/compose_confirm'
], function(
	PageClass,
	ComposeConfirm
){
	// 強化・限界突破の確認
	var Model = PageClass.Model.extend({
		
		defaults : {
			title : '合成確認',
			data_path : '/compose/confirm',
			template_path : '/tmpl/compose/confirm.html',
			style_path : '/css/compose.css',
			redirect_url : 'compose/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'compose_confirm' : ComposeConfirm
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