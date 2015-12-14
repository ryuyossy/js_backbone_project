define([
	'common/page',
	'components/jex/jex_animation',
	'components/ability/ability_get_canvas',
	'components/job/job_get_canvas',
	'components/job/job_master_canvas'
], function(
	PageClass,
	JexAnimation,
	AbilityGetCanvas,
	JobGetCanvas,
	JobMasterCanvas
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '',
			template_path : '/tmpl/common/canvas.html'
		},
		initialize : function(){
			var self = this;
			if( _.isUndefined(self.user.get('jex_info')) ){
				self.set({redirect_url : 'battle/'});
				self.trigger('proveNoFormData');
			}
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : JexAnimation,
			ability_get_canvas : AbilityGetCanvas,
			job_get_canvas : JobGetCanvas,
			job_master_canvas : JobMasterCanvas
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.on('bindEvents', comp.animation.initializeAnimation);
			self.on('bindEvents', self.model.user.removeStorage);
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});