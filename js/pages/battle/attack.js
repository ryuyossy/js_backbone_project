define([
	'common/page',
	'pages/battle/common',
	'components/battle/attack_animation',
	'components/battle/attack_canvas'
], function(
	PageClass,
	BattleCommonClass,
	AttackAnimation,
	AttackCanvas
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル | 攻撃',
			data_path : '/battle/attack/do',
			ajax_type : 'POST',
			template_path : '/tmpl/common/canvas.html'
		},
		initialize : function(){
			var self = this;
			var power = self.user.get('power');
			if( !_.isUndefined(power)  && RS.get('sent', false) != '/battle/attack/do'){
				self.set({
					ajax_data : {
						power_gage_percent : power
					}
				});
			} else {
				RS.remove('sent', false);
				self.set({'redirect_url' : 'battle/'});
				self.trigger('proveNoFormData');
			}
			RS.put({'sent' : '/battle/attack/do'}, false);
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : AttackAnimation,
			attack_canvas : AttackCanvas
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
