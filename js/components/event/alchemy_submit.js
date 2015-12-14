define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonAlchemySubmit' : 'getKamaType'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.model.on({
				'change:kama_type' : self.jumpToResult
			});
		},
		getKamaType : function(e){
			var self = this;
			var kama_type = $(e.currentTarget).attr('data-kama-type');
			self.model.set('kama_type', kama_type);
		},
		jumpToResult : function(){
			var self = this;
			RS.put({
				'form_data' : {
					'kama_type' : self.model.get('kama_type')
				},
				'form_target' : [
					"EventAlchemyResult"
				]
			}, false);
			page.trigger('changeURL', 'event/alchemy/result/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});