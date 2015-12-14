define(function(){
	//ギフトタブ
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			var parameter = [
				{
					template : '#jsTemplateGiftUnopenedList',
					data_path : page.model.getDataPath('/gift/unopened/list'),
					ajax_type : 'GET',
					ajax_data : {
					},
					more_flg_name : 'more_flg',
					is_default : true, //デフォルト表示
					is_reloadable : true,
					is_cacheable : false
				}, {
					template : '#jsTemplateGiftOpenedList',
					data_path : page.model.getDataPath('/gift/opened/list'),
					ajax_type : 'GET',
					ajax_data : {
					},
					more_flg_name : 'more_flg',
					is_default : false,
					is_reloadable : true,
					is_cacheable : false
				}
			];
			page.trigger('setTabs', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



