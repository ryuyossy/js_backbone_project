define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '売却完了',
			data_path : '/equip/sell/execute',
			ajax_type : 'POST',
			template_path : '/tmpl/equip/sell/complete.html',
			style_path : '/css/equip.css',
			redirect_url : 'equip/sell/list/'
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