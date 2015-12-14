define(function(){
	//ガチャタブ
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsTabs',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
			//for tab
		},
		initializeTabs : function(){
			var selected_tab = this.page.model.get('query').selected_tab;
			var parameter = [
				{
					template : '#jsTemplatePremium',
					data_path : page.model.getDataPath('/gacha/premium/list'),
					ajax_type : 'GET',
					is_default : selected_tab!=="normal",
					is_cacheable : true
				},
				{
					template : '#jsTemplateNormal',
					data_path : page.model.getDataPath('/gacha/normal/list'),
					ajax_type : 'GET',
					is_default : selected_tab==="normal",
					is_cacheable : true
				}
			];
			page.trigger('setTabs', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



