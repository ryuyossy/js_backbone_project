define([
	'common/page',
	'pages/battle/common',
	'components/battle/gauge_animation',
	'components/battle/gauge_canvas'
], function(
	PageClass,
	BattleCommonClass,
	GaugeAnimation,
	GaugeCanvas
){
	var Model = BattleCommonClass.Model.extend({
		defaults : {
			title : 'バトル | パワー',
			template_path : '/tmpl/battle/gauge.html',
			style_path : '/css/gauge.css'
		},
		initialize : function(){
			var self = this;
			var command = self.user.get('command');
			self.set({data_path : '/battle/' + command + '/check'});

			if(!command){
				self.set({'redirect_url' : 'battle/'});
				self.trigger('proveNoFormData');
			}else{
				if(command == "ability"){
					var ability_id = self.user.get('ability_id');
					if( ability_id ){
						self.set({
							ajax_data : {ability_id : ability_id}
						});
					}
					self.set('query',{ability_id: ability_id, avatar_id: self.user.get('avatar_id')});
				}else{
					self.set('query',{avatar_id: self.user.get('avatar_id')});
				}
			}
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : GaugeAnimation,
			gauge_canvas : GaugeCanvas
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