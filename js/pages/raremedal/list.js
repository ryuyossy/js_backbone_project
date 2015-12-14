define([
	'common/page',
	'components/raremedal/raremedal_confirm'
], function(
	PageClass,
	RaremedalConfirm
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'レアメダル交換所',
			data_path : '/raremedal/list',
			template_path : '/tmpl/raremedal/list.html',
			style_path : '/css/raremedal.css'
		},
		initialize : function(){
			var self = this;
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			'confirm' : RaremedalConfirm
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