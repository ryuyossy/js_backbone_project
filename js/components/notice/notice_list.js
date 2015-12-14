define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var parameter = {
				el : '.jsNoticeList',
				template : '#jsTemplateNotice',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/system/info/list')
			};
			var notice_list = new page.list(parameter);
			self.model.set({notice_list : notice_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



