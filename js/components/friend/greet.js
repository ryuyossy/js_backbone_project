define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
		}
	});
	var View = Backbone.View.extend({
		el : '.jsFriendList',
		events : {
			'touch .jsGreetAll' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.greetAll);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		greetAll : function($el){
			var self = this;
			var to_user_ids = $el.parents('.jsFriendList').attr('data-list-id');
			console.log(to_user_ids);
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'to_user_ids' : to_user_ids
				},
				url : page.model.getDataPath('/greet/add/multi')
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});