define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonSelectEquip' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.jumpToConfirm);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsList');
			self.model.set({
				'$el' : $el,
				'material_no' : $el.attr('data-list-id')
			});
			self.trigger('getElement');
		},
		jumpToConfirm : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			RS.put({
				'form_data' : {
					'user_equip_no' : form_data.user_equip_no,
					'material_no' : self.model.get('material_no'),
					'material_type' : 4
				},
				'form_target' : [
					"ComposeBaseEvolutionSelect",
					"ComposeSelectConfirm",
					"ComposeResult"
				]
			}, false);
			page.trigger('changeURL', 'compose/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});