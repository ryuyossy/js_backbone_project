define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonContinue' : 'continueCompose'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		},
		continueCompose : function(){
			var self = this;
			var form_data = self.page.model.get('form_data');
			var url = form_data.material_type == 4 ? '-evolution' : '';
			RS.put({
				'form_data' : {
					'user_equip_no' : form_data.user_equip_no,
					'level1' : true
				},
				'form_target' : page.model.get('form_target')
			}, false);
			page.trigger('changeURL', 'compose/base'+url+'/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



