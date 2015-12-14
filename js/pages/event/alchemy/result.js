define([
	'common/page',	
	'components/event/alchemy_animation',
	'components/event/alchemy_canvas'
], function(
	PageClass,
	AlchemyAnimation,
	AlchemyCanvas	
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '錬金結果',
			data_path : '/event/alchemy/execute',
			ajax_type : 'POST',
			template_path : '/tmpl/event/alchemy/result.html',
			style_path : '/css/alchemy.css',
			redirect_url : 'event/alchemy/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : AlchemyAnimation,
			alchemy_canvas : AlchemyCanvas,
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.on('bindEvents', comp.animation.initializeAnimation);
			self.trigger('bindEvents');
		}		
	});
	return {
		Model : Model,
		View : View
	};
});