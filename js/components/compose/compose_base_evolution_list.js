define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '.jsComposeBase',
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
					el : '.jsComposeBaseEvolution',
					template : '#jsTemplateEquip2',
					more_flg_name : 'compose_more_flg',
					data_path : page.model.getDataPath('/compose/base-evolution'),
					ajax_data : RS.get('form_data', false)
			};
			var material_list = new page.list(parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
