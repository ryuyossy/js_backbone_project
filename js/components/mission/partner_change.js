define(function(){
	var Model = Backbone.Model.extend({

	});

	var View = Backbone.View.extend({
		el: 'body',
		events : {
			'touch .jsSubmit[data-user_id]' : 'changeDo'
		},
		initialize : function(){
			_.bindAll(this);
		},
		changeDo : function(e){
			var $btn = $($(e.currentTarget)[0]);
			var self = this;
			$.ajax({
				url: self.page.model.getDataPath('/mission/partner/change/do'),
				type: 'POST',
				dataType : 'json',
				data:{
					'timestamp' : new Date/1000|0,
					'remove_partner_id' : self.page.model.get('query').partner_id,
					'add_partner_id' : $btn.attr('data-user_id')
				},
				success: function(){
					var boss = self.page.model.user.get('boss');
					var backto = self.page.model.get('query').backto;
					switch(backto){
						case 'boss':
							var back_url = '#mission/boss/ready/' + boss.stage_id + '/' + boss.field_id + '/';
							break;
						case 'guild':
							var back_url = '#guild/partner/';
							break;
					}
					self.page.trigger('changeURL', back_url, true);
				}
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});