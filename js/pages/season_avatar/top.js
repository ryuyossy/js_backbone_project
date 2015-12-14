define([
	'common/page',
	'components/gacha/gacha_buy'
], function(
	PageClass,
	GachaBuy
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'シーズンアバター',
			template_path : '/tmpl/season_avatar/top.html',
			data_path : '/avatar/season',
			style_path : '/css/job.css'
		},
		initialize : function(){
			var self = this;
			self._super();
			self.addPageData({
				season_id : self.get('query').season_id
			});
		}
	});
	var View = PageClass.View.extend({
		components : {
			gacha_buy : GachaBuy
		},
		binedEvents : function(){
			var self = this;
			var top = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});