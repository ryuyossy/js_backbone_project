define(function(){
	//一括装備
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
		el : 'body',
		events : {
			'touch .deckBulkButton' : 'openPopup',
			'touch .jsButtonBulkFix' : function(){
				this.trigger('reload')
			}
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
		},
		openPopup : function(){
			var self = this;
			var parameter = {
				titles : ['一括装備中...', '一括装備完了'],
				template : '#jsTemplateDeckBulk',
				is_closable : false,
				data_path : page.model.getDataPath('/deck/equip/bulk'),
				ajax_type : 'POST',
				ajax_data : {
					
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



