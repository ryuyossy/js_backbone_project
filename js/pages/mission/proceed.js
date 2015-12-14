define([
	'common/page',
	'components/mission/proceed_control',
	'components/mission/proceed_sencha'
], function(
	PageClass,
	MissionProceedControl,
	MissionProceedSencha
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '任務',
			data_path : '/mission/proceed/get',
			template_path : '/tmpl/mission/proceed.html',
			style_path : ['/css/mission.css', '/css/sencha/quest.css']
		}
	});
	var View = PageClass.View.extend({
		components : {
			control : MissionProceedControl,
			sencha : MissionProceedSencha
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;

			comp.sencha.on('tapEnable', function(bool){
				comp.control.trigger('tapEnable', bool);
			});
			comp.control.on('proceedComplete', function(actions){
				self.components.sencha.removeCallback();
				self.model.set('queue', actions);
				self.model.set('actions', actions);
			});
			comp.control.on('proceedSkip', function(){
				self.components.sencha.removeCallback();
				var last_action = self.model.get('actions').pop();
				self.model.set({queue:[last_action]}, {silent:true});
				self.model.trigger('change:queue');
				if(last_action == 'fieldclear') return;
				self.components.sencha.removeCallback();
				self.components.sencha.endAllAnimation();
				self.components.control.trigger('acquisition');
				self.components.sencha.tapEnable(true);
			});
			self.model.on('change:queue', self.queuePlay);
		},
		queuePlay : function(){
			var self = this;
			var actions = self.model.get('queue');
			if(actions.length <= 0){
				self.components.control.trigger('acquisition');
				self.components.sencha.tapEnable(true);
			}else{
				var action = actions.shift();
				self.model.set({queue:actions}, {silent:true});
				self.components.sencha.gotoAndPlay(action, self.queuePlay);
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
