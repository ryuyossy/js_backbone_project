define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		setFormData : function(){
			var form_data = RS.get('form_data', false);
			RS.put({
				'form_data' : {
					'user_equip_no' : form_data.user_equip_no
				},
				'form_target' : ["ComposeBaseSelect","ComposeBaseEvolutionSelect"]
			}, false);
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonChangeToCompose' : 'changeToCompose',
			'touch .jsButtonChangeToEvolution' : 'changeToEvolution'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('touchButton', self.model.setFormData);
			self.trigger('initialize');
		},
		changeToCompose : function(){
			var self = this;
			self.trigger('touchButton');
			page.trigger('changeURL', 'compose/base/', true);
		},
		changeToEvolution : function(){
			var self = this;
			self.trigger('touchButton');
			page.trigger('changeURL', 'compose/base-evolution/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});