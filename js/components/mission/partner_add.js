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
		el: '.helpMemberList',
		events : {
			'touch .jsSubmit[data-user_id]' : 'addDo'
		},
		initialize : function(){
			_.bindAll(this);
		},
		addDo : function(e){
			var $btn = $($(e.currentTarget)[0]);
			var self = this;
			$.ajax({
				url: self.page.model.getDataPath('/mission/partner/add/do'),
				type: 'POST',
				dataType : 'json',
				data:{
					'timestamp' : new Date/1000|0,
					'partner_id' : $btn.attr('data-user_id')
				},
				success: function(json){
					if (json.status === 200) {
						var boss = self.page.model.user.get('boss');
						var backto = self.page.model.get('query').backto;
						var back_url;
						switch(backto){
							case 'boss':
								back_url = '#mission/boss/ready/' + boss.stage_id + '/' + boss.field_id + '/';
								break;
							case 'guild':
								back_url = '#guild/partner/';
								break;
						}
						self.page.trigger('changeURL', back_url, true);
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