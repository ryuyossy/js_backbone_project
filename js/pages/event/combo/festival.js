define([
	'common/page',
	'components/event/combo_festival'
], function(
	PageClass,
	ComboFestival
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '春のコンボまつり2013',
			data_path : '/event/battle/combo/get',
			template_path : '/tmpl/event/combo/spring_festival.html',
			style_path : '/css/combo_festival.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'combo_festival' : ComboFestival
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
		}
	});
	return {
		Model : Model,
		View : View
	};
});