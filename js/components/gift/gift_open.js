define(function(){
	// ギフト受け取りページに遷移
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonJumpToOpen' : 'jumpToOpen',
			'touch .jsButtonJumpToBulkOpen' : 'jumpToBulkOpen'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
		},
		jumpToOpen : function(e){
			var $el = $(e.currentTarget);
			RS.put({
				'form_data' : {
					'user_gift_id' : $el.attr('data-gift-id')
				},
				'form_target' : 'GiftOpen'
			}, false);
			page.trigger('changeURL', 'gift/open/', true);
		},
		jumpToBulkOpen : function(){
			var form_target = 'GiftBulkOpen';
			var url = 'gift/bulk-open/';
			page.trigger('submitDummy', form_target);
			page.trigger('changeURL', url, true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});