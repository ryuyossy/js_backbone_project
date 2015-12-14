define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '.jsGiftTop',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		},
		changeList : function(){
			var self = this;
			var current_tab = page.model.get('current_tab');
			var template_id = current_tab.get('template');
			if( template_id === '#jsTemplateGiftUnopenedList' ){
				if( !self.model.has('gift_list_unopened') ){
					self.initializeUnopenedList();
				}
			} else if( template_id === '#jsTemplateGiftOpenedList' ){
				if( !self.model.has('gift_list_opened') ){
					self.initializeOpenedList();
				}
			}
		},
		initializeUnopenedList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabGiftUnopened',
				template : '#jsTemplateGiftUnopenedList',
				data_path : page.model.getDataPath('/gift/unopened/list'),
				more_flg_name : 'more_flg'
			};
			var gift_list = new page.list(parameter);
			self.model.set({gift_list_unopened : gift_list});
		},
		initializeOpenedList : function(){
			var self = this;
			var parameter = {
				el : '.jsTabGiftOpened',
				template : '#jsTemplateGiftOpenedList',
				data_path : page.model.getDataPath('/gift/opened/list'),
				more_flg_name : 'more_flg'
			};
			var gift_list = new page.list(parameter);
			self.model.set({gift_list_opened : gift_list});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



