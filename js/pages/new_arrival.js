define([
	'common/page',
	'components/new_arrival/new_arrival_list'
], function(
	PageClass,
	NewArrivalList
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '新着ユーザー',
			data_path : '/new_user/top',
			template_path : '/tmpl/new_arrival/list.html',
			style_path : '/css/mypage.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'list' : NewArrivalList
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