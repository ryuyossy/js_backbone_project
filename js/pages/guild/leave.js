define([
	'common/page'
], function(
	PageClass
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギルド退団完了',
			data_path : '/guild/exit',
			ajax_type : 'POST',
			template_path : '/tmpl/guild/leave.html',
			style_path : '/css/guild.css',
			redirect_url : 'guild/'
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