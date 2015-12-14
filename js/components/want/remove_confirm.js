define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
		}
	});
	var View = Backbone.View.extend({
		el : '.jsPostRemove',
		events : {
			'touch .jsWantRemoveButton' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			self.on('succeedSubmit', self.confirm);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		openPopup : function($el){
			var self = this;
			var equip_id = $el.attr('data-equip-id');
			var parameter = {
					title : 'リストから削除する',
					template : '#jsTemplatePopupWant',
					is_closable : true,
					data_path : page.model.getDataPath('/want/remove/confirm'),
					ajax_type : 'GET',
					data : {
						equip_id : equip_id
					},
					callback : function(json){
						self.trigger('succeedSubmit', json);
					}
			};
			
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
