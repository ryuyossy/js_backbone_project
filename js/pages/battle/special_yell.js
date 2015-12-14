define([
	'common/page',
	'pages/battle/common',
	'components/battle/special_yell_animation',
	'components/battle/special_yell_canvas'
], function(
	PageClass,
	BattleCommonClass,
	SpecialYellAnimation,
	SpecialYellCanvas
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル | 特別エール',
			data_path : '/battle/yell/do',
			ajax_type : 'POST',
			template_path : '/tmpl/common/canvas.html'
		},
		initialize : function(){
			var self = this;
			var power = self.user.get('avatar_id');
			if( _.isUndefined(power) || RS.get('sent', false) == '/battle/yell/do'){
				RS.remove('sent', false);
				self.set({'redirect_url' : 'battle/'});
				self.trigger('proveNoFormData');
			}
			RS.put({'sent' : '/battle/yell/do'}, false);
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : SpecialYellAnimation,
			special_yell_canvas : SpecialYellCanvas
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