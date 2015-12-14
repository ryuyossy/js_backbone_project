define([
	'common/page',
	'components/item/use_animation',
	'components/ability/ability_get_canvas',
	'components/job/job_get_canvas',
	'components/job/job_master_canvas'
], function(
	PageClass,
	ItemUseAnimation,
	AbilityGetCanvas,
	JobGetCanvas,
	JobMasterCanvas
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'アイテム使用完了',
			data_path : '/item/use',
			template_path : '/tmpl/item/use.html',
			style_path : '/css/item.css',
			ajax_type : 'POST',
			redirect_url : 'item/list/'
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : ItemUseAnimation,
			ability_get_canvas : AbilityGetCanvas,
			job_get_canvas : JobGetCanvas,
			job_master_canvas : JobMasterCanvas
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