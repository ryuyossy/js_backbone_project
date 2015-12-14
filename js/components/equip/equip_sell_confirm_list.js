define(function(){
	var page, page_data;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonRemove' : 'remove'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.model.on('change:equipments', self.renderStatus);
			self.model.on('change:equipments', self.changeRareLabel);
			self.model.on('change:equipments', self.disableRemove);
			self.on('initialize', self.setFirstData);
			self.trigger('initialize');
		},
		setFirstData : function(){
			var self = this;
			var equipments = [].concat(page_data.equips);
			var equip_ids = _.pluck(equipments, 'user_equip_no');
			RS.put({
				'form_data' : {'user_equip_nos' : equip_ids.join(',')}
			}, false);
			self.model.set({equipments : equipments});
		},
		remove : function(e){
			var self = this;
			var equipments = self.model.get('equipments') || [].concat(page_data.equips);
			var $el = $(e.currentTarget);
			var user_equip_no = $el.parent('td').attr('data-user-equip-no');
			$el.addClass('noChoice').removeClass('jsButtonRemove');
			_.each(equipments, function(equipment, index){
				if( user_equip_no != equipment.user_equip_no ) return;
				equipments[index] = undefined;
			});
			equipments = _.compact(equipments);
			var equip_ids = _.pluck(equipments, 'user_equip_no');
			RS.put({
				'form_data' : {'user_equip_nos' : equip_ids.join(',')}
			}, false);
			self.model.set({equipments : equipments});
		},
		renderStatus : function(){
			var self = this;
			var equipments = self.model.get('equipments');
			var sell_num = equipments.length || 0;
			var result_own_num =　page_data.result_own_num + page_data.sell_num - sell_num;
			var sell_gil_total = 0;
			_.each(equipments, function(equipment){
				sell_gil_total += equipment.sell_price;
			});
			var result_gil = page_data.result_gil - page_data.sell_gil_total + sell_gil_total;
			$('.jsSellNum').text(sell_num);
			$('.jsSellGilTotal').text(sell_gil_total);
			$('.jsResultOwnNum').text(result_own_num);
			$('.jsResultGil').text(result_gil);
		},
		changeRareLabel : function(){
			var self = this;
			var equipments = self.model.get('equipments');
			var exist_rare = _.find(equipments, function(equipment){
				return equipment.rarity >= 3;
			});
			if( exist_rare ) return;
			$('.jsNoticeMessageRare').hide();
		},
		disableRemove : function(){
			var self = this;
			var $remove = $('.jsButtonRemove');
			if( $remove.length > 1 ) return;
			$remove.removeClass('jsButtonRemove').removeClass('component');
		}
	});
	return {
		Model : Model,
		View : View
	};
});



