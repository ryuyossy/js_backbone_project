define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギフト受け取り',
			data_path : '/gift/open',
			ajax_type : 'POST',
			template_path : '/tmpl/gift/open.html',
			style_path : '/css/gift.css',
			redirect_url : 'gift/list/'
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