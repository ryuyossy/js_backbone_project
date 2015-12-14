define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		}
	});

	var View = Backbone.View.extend({
		el: '#helpMember',
		events : {
			'touch .jsCancel[data-user_id]' : 'cancelDo'
		},
		initialize : function(){
			_.bindAll(this);
		},
		cancelDo : function(e){
			var $btn = $($(e.currentTarget)[0]);
			var self = this;
			$.ajax({
				url: self.page.model.getDataPath('/mission/partner/delete'),
				type: 'POST',
				dataType : 'json',
				data:{
					'timestamp' : new Date/1000|0,
					'partner_id' : $btn.attr('data-user_id')
				},
				success: function(json){
					if (json.status === 200) {
						window.location.reload(true);
					} else {
						page.trigger('catchError', json);
					}
				},
				error: function(e){
					page.trigger('catchError', e);
				}
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});