define([
	'common/page',
	'components/mission/boss_animation',
	'components/mission/boss_canvas',
	'components/mission/levelup_canvas',
	'components/mission/stage_clear_canvas',
	'components/job/job_get_canvas'
], function(
	PageClass,
	BossAnimation,
	BossCanvas,
	LevelUpCanvas,
	StageClearCanvas,
	JobGetCanvas
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエストボス戦闘',
			ajax_type : 'POST',
			data_path : '/mission/boss/battle/do',
			template_path : '/tmpl/mission/boss/result.html',
			style_path : '/css/mission.css',
			redirect_url : 'mission/stage/'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				stage_id : self.get('query').stage_id,
				field_id : self.get('query').field_id
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			animation : BossAnimation,
			boss_canvas: BossCanvas,
			levelup_canvas: LevelUpCanvas,
			stage_clear_canvas: StageClearCanvas,
			job_get_canvas: JobGetCanvas
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
