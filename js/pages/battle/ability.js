define([
	'common/page',
	'pages/battle/common',
	'components/battle/ability_animation',
	'components/battle/ability_canvas'
], function(
	PageClass,
	BattleCommonClass,
	AbilityAnimation,
	AbilityCanvas
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル | 必殺技',
			data_path : '/battle/ability/do',
			ajax_type : 'POST',
			template_path : '/tmpl/common/canvas.html'
		},
		initialize : function(){
			var self = this;
			var power = self.user.get('power');
			var ability_id = self.user.get('ability_id');
			if( !_.isUndefined(power) && ability_id && RS.get('sent', false) != '/battle/ability/do' ){
				self.set({
					ajax_data : {
						power_gage_percent : power,
						ability_id : ability_id
					}
				});
			} else {
				RS.remove('sent', false);
				self.set({'redirect_url' : 'battle/'});
				self.trigger('proveNoFormData');
			}
			RS.put({'sent' : '/battle/ability/do'}, false);
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : AbilityAnimation,
			ability_canvas : AbilityCanvas
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.on('bindEvents', comp.animation.initializeAnimation);
			self.on('bindEvents', self.model.user.removeStorage);
			self.on('bindEvents', comp.animation.preparation);
			self.trigger('bindEvents');
		}
	});

	return {
		Model : Model,
		View : View
	};
});