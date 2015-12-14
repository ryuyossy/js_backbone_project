define([
	'common/page',
	'pages/battle/common',
	'components/battle/yell_animation',
	'components/battle/yell_canvas'
], function(
	PageClass,
	BattleCommonClass,
	YellAnimation,
	YellCanvas
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル | エール',
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
			animation : YellAnimation,
			yell_canvas : YellCanvas
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