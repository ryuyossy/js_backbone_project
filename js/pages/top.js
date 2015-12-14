define([
	'common/page',
	'components/common/labi',
	'components/top/top'
], function(
	PageClass,
	Labi,
	Top
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'トップページ',
			template_path : '/tmpl/top/top.html',
			data_path : '/top/get',
			style_path : '/css/others.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			labi : Labi,
			top : Top
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