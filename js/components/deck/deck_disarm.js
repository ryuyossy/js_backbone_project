define(function(){
	//装備解除(外すボタン)
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		disarm : function(){
			var self = this;
			var $el = self.get('$el');
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'equip_type' : $el.attr('data-equip-type'),
					'deck_no' : page.model.get('query').deck_no,
					'place_no' : $el.attr('data-place-no')
				},
				url : page.model.getDataPath('/deck/equip/change_execute'),
				dataType : 'json',
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedDisarm', json);
					} else {
						self.trigger('failDisarm');
					}
				},
				error : function(){
					self.trigger('failDisarm');
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonDeckDisarmConfirm' : 'getElement',
			'touch .jsButtonDeckDisarmFix' : 'hideEquipment'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.openPopup);
			self.on('hideEquipment', self.model.disarm);
			self.on('hideEquipment', self.decrementEquipmentNum);
			self.on('hideEquipment', self.resetPlaceNo);
			self.on('hideEquipment', self.showButtonEquipAdd);
			self.model.on('succeedDisarm', self.refreshDeckStatus);
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsSubEquip');
			self.model.set({
				$el : $el
			});
			self.trigger('getElement');
		},
		openPopup : function(){
			var self = this;
			var $el = self.model.get('$el');
			var parameter = {
				title : '装備解除確認',
				template : '#jsTemplatePopupDeckDisarm',
				local_data : {
					"equip_name" : $el.attr('data-equip-name')
				}
			};
			page.trigger('openPopup', parameter);
		},
		hideEquipment : function(){
			var self = this;
			var $el = self.model.get('$el');
			$el.remove();
			self.trigger('hideEquipment');
		},
		decrementEquipmentNum : function(){
			var num = $('.jsSubEquip').length;
			$('.jsSubEquipNum').text(num);
		},
		resetPlaceNo : function(){
			$('.jsSubEquip').each(function(index){
				$(this).attr({
					'data-place-no' : index + 1
				});
			});
		},
		showButtonEquipAdd : function(){
			$('.jsButtonEquipAdd').show();
		},
		refreshDeckStatus : function(json){
			var self = this;
			var $el = $(self.el);
			var $costNum = $el.find('.paramStatus .costNum');
			var $powerNum = $el.find('.paramStatus .powerNum');
			var $spPowerNum = $el.find('.paramStatus .spPowerNum');
			$costNum.text(($costNum.text() - 0) + json.equip_cost_diff);
			$powerNum.text(($powerNum.text() - 0) + json.power_diff);
			$spPowerNum.text(($spPowerNum.text() - 0) + json.sp_power_diff);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



