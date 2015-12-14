define(function(){
	//ガチャ一括売却
	var page, page_data, user_equip_nos;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonGachaSell' : 'sell'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			user_equip_nos = _.pluck(page_data.equips, 'user_equip_no').filter(function(no){
				return !(_.isNull(no));
			});
			if(user_equip_nos.length == 0) {
				$('.jsButtonGachaSell').hide();
			}
			self.trigger('initialize');
		},
		sell : function(){
			RS.put({
				'form_data' : {'user_equip_nos' : user_equip_nos},
				'form_target' : ["EquipSellConfirm","EquipSellComplete"]
			}, false);
			page.trigger('changeURL', 'equip/sell/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



