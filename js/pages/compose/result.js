define([
    'common/page',
	'components/compose/compose_animation',
	'components/compose/compose_canvas',
	'components/compose/compose_continue'
], function(
    PageClass,
	ComposeAnimationClass,
	ComposeCanvasClass,
	ComposeContinueClass
){
	// 強化・限界突破の完了
	var Model = PageClass.Model.extend({
		defaults : {
			title : '合成完了',
			data_path : '/compose/result',
			ajax_type : 'POST',
			template_path : '/tmpl/compose/result.html',
			style_path : '/css/compose.css',
			redirect_url : 'compose/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : ComposeAnimationClass,
			compose_canvas : ComposeCanvasClass,
			compose_continue : ComposeContinueClass
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
