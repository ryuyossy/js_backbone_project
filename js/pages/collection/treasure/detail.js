define([
	'common/page',
	'components/collection/treasure/message_send'
], function(
	PageClass,
	MessageSend
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '秘宝詳細',
			data_path : '/collection/treasure/detail',
			template_path : '/tmpl/collection/treasure/detail.html',
			style_path : '/css/collection.css'
		},
		initialize : function(){
			var self = this;
			self._super();

			var add_page_data = {
				series_id : self.get('query').series_id
			};
			var stage_id = self.user.get('stage_id');
			var field_id = self.user.get('field_id');

			if(stage_id && field_id){
				_.extend(add_page_data, {
					stage_id : stage_id,
					field_id : field_id
				});				
			}
			self.addPageData(add_page_data);
		}
	});
	var View = PageClass.View.extend({
		components : {
			'message_send' : MessageSend
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;

			self.on('bindEvents', self.model.user.removeStorage);
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});