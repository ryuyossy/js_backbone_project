define([
	'common/page',
	'components/common/labi',
	'components/gacha/gacha_tab',
	'components/gacha/gacha_submit',
	'components/gacha/gacha_buy'
], function(
	PageClass,
	Labi,
	GachaTab,
	GachaSubmit,
	GachaBuy
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ガチャ',
			data_path : '/gacha/premium/list',
			template_path : '/tmpl/gacha/top.html',
			style_path : '/css/gacha.css'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			if( self.get('query').selected_tab === 'normal' ){
				self.set({'data_path' : '/gacha/normal/list'});
			}
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			labi : Labi,
			"gacha_tab" : GachaTab,
			"gacha_buy" : GachaBuy,
			'gacha_submit' : GachaSubmit
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