define([
	'common/page',
	'components/common/labi',
	'components/item/item_use',
	'components/shop/shop_buy'
], function(
	PageClass,
	Labi,
	ItemUse,
	ShopBuy
	){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'クエスト | 行動P不足',
			data_path : '/mission/mploss/get',
			template_path : '/tmpl/mission/mploss.html',
			style_path : '/css/mission.css'
		},
		initialize : function(){
			var self = this;
			var use_mp = self.user.get('use_mp');
			if(_.isUndefined(use_mp)){
				self.set({'redirect_url' : 'mission/stage/'});
				self.trigger('proveNoFormData');
			}
			self._super();
		}
	});
	var View = PageClass.View.extend({
		components : {
			labi : Labi,
			'item_use': ItemUse,
			'shop_buy': ShopBuy
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.on('bindEvents', self.model.user.removeStorage);
			self.trigger('bindEvents');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
