define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonConfirmSell' : 'jumpToConfirmSell'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		},
		jumpToConfirmSell : function(){
			var self = this;
			var $select = $('.jsButtonSelect').find('input[type="checkbox"]');
			var checked_num = $select.filter(':checked').length;
			if( checked_num < 1 ){
				page.trigger('openPopup', {
					'title' : '武具売却',
					'local_data' : {
						'message' : '売却する武具が1件以上選択されていません。'
					}
				});
				return;
			}
			page.trigger('changeURL', 'equip/sell/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
