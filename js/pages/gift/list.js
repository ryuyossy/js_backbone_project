define([
	'common/page',
	'components/common/labi',
	'components/gift/gift_list',
	'components/gift/gift_tab',
	'components/gift/gift_open'
], function(
	PageClass,
	Labi,
	GiftList,
	GiftTab,
	GiftOpen
){
	var Model = PageClass.Model.extend({
		defaults : {
			title : 'ギフト',
			data_path : '/gift/unopened/list',
			template_path : '/tmpl/gift/list.html',
			style_path : '/css/gift.css'
		}
	});
	var View = PageClass.View.extend({
		components : {
			labi : Labi,
			list : GiftList, //リスト
			tab : GiftTab, //タブ切り替え
			open : GiftOpen //受け取りボタン
		},
		bindEvents : function(){
			var self = this;
			var comp = self.components;
			self.model.on('change:current_tab', comp.list.changeList);
			comp.list.changeList();
		}
	});
	return {
		Model : Model,
		View : View
	};
});