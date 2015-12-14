define([
	'common/page',
	'components/profile/profile_edit'
], function(
	PageClass,
	ProfileEdit
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : '自己紹介',
			template_path : '/tmpl/profile/edit.html',
			data_path : '/prof/comment/get',
			style_path : '/css/prof.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			'profile_edit' : ProfileEdit
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