define([
	'zepto',
	'lodash',
	'backbone',
	'rockstage',
	'backbone-helper'
], function(
	$,
	_,
	Backbone,
	RS
){
	var Model = Backbone.Model.extend({
		initialize : function(params){
			_.bindAll(this);
			var self = this;
			self.data = params.pageData;
			self.rtt  = params.roundTripTime;
			self.on('initializeTime', self.initializeTime);
			self.on('setTime', self.setTime);
			self.on('runTimer', self.runTimer);
			self.on('removeTimer', self.removeTimer);
			self.on('firstRunTimer', self.refreshAllTimer);
			self.trigger('initialize');
		},
		initializeTime : function(){
			var self = this;
			var data            = self.data;
			var deltaTime       = Math.round(self.rtt / 2 / 1000) || 1;
			// *** debug ***
			// data.battle_state = 4;
			// data.system_date  = "2013/01/30 20:00:00";
			// data.battle_end_date = "2013/01/30 20:00:30";
			// data.battle_start_date = "2013/01/30 21:00:00";

			self.battleState    = data.battle_state;
			self.finishDate     = data.battle_state !== 4 ?
				data.battle_start_date : data.battle_end_date;
			self.finishTime     = (new Date(self.finishDate) / 1000|0) - deltaTime;
			self.serverTime     = new Date(data.system_date) / 1000|0;
			self.differenceTime = self.serverTime - (Date.now() / 1000|0);
			self.set({
				 running   : false
				,showAlert : false
				,count     : 0
			});
			self.trigger('setTime');
		},
		setTime : function(){
			var self = this;
			var localTime = Date.now() / 1000 | 0;
			var gap  = self.finishTime - localTime - self.differenceTime;
			var hour = gap / 3600;
			var min  = (hour - (hour | 0)) * 60;
			var sec  = (min - (min | 0)) * 60;
			self.set({
				 hour : (hour|0) >= 0 ? hour|0 : 0
				,min  : (min |0) >= 0 ? min |0 : 0
				,sec  : (sec |0) >= 0 ? sec |0 : 0
			});
		},
		runTimer : function(){
			var self = this;
			var timerId = RS.get('timerId', false);
			if (timerId) {
				self.trigger('removeTimer', timerId);
			}
			timerId = setInterval(self.countDown, 1000);
			RS.put({
				timerId : timerId
			}, false);
		},
		removeTimer : function(timerId){
			var self = this;
			clearInterval(timerId || RS.get('timerId', false));
			RS.put({
				timerId : null
			}, false);
		},
		countDown : function(){
			if (!this.get('running')) return this.trigger('firstRunTimer');
			var self = this;
			var hour = self.get('hour');
			var min  = self.get('min');
			var sec  = self.get('sec');

			if (sec > 0) {
				self.set({ sec : sec - 1 });
			} else if (min > 0) {
				self.set({ sec : 59, min : min - 1 });
			} else if (hour > 0) {
				self.set({ sec : 59, min : 59, hour: hour - 1 });
			} else {
				// ポップアップ処理
				self.trigger('removeTimer');
				self.trigger('showPopup');
			}
			self.incrementInternalCount();
		},
		refreshAllTimer : function(){
			var self = this;
			self.set({ running : true });
			self.trigger('change:sec change:min change:hour');
		},
		incrementInternalCount : function(){
			var self = this;
			var count = self.get('count');
			if (count % 10 === 0) {
				self.trigger('setTime');
			}
			self.set({ count : count + 1 });
		}
	});
	var View = Backbone.View.extend({
		initialize : function(params){
			_.bindAll(this);
			var self = this;
			self.model = new Model(params);
			self.$window = $(window);
			self.$window.on('scroll', self.scrollEventHandler);
			self.scrollTimerId = null;
			self.on({
				 'removeScrollEvent' : self.removeScrollEvent
				,'setTime'           : self.model.setTime
			});
			self.model.on({
				 'change:sec' : self.refreshSecond
				,'change:min' : self.refreshMinite
				,'change:hour': self.refreshHours
				,'showPopup'  : self.popupHandler
			});
			self.model.trigger('initializeTime');
			self.model.trigger('runTimer');
			self.trigger('initialize');
		},
		scrollEventHandler : function(){
			// iOSだとスクロールイベント発生中はsetIntervalのイベントが発火しないので
			// ブラウザのスクロールイベント終了後に一度発火させる
			var self = this;
			if (self.scrollTimerId) {
				self.trigger('removeScrollEvent');
			}
			self.scrollTimerId = setTimeout(function(){
				self.trigger('setTime');
			}, 100);
		},
		removeScrollEvent : function(){
			var self = this;
			if (!self.scrollTimerId) return;
			clearTimeout(self.scrollTimerId);
			self.scrollTimerId = null;
		},
		popupHandler : function(){
			if ($('#globalHeader').css('display') === 'none') return;
			var self = this;
			var param = {
				 title : 'お知らせ'
				,local_data : {}
			};
			if (self.model.battleState !== 4) {
				param.local_data.message = 'バトルが開催されました';
				self.trigger('battleStart', param);
			} else {
				param.local_data.message = 'バトルが終了しました'
				self.trigger('battleFinish', param);
			}
			self.model.set({ showAlert : true });
		},
		refreshSecond : function(){
			var self = this;
			self.refreshTimer({
				 timeUnit  : 'sec'
				,value     : self.model.get('sec')
				,tensPlace : 6
				,onesPlace : 7
			});
		},
		refreshMinite : function(){
			var self = this;
			self.refreshTimer({
				 timeUnit  : 'min'
				,value     : self.model.get('min')
				,tensPlace : 3
				,onesPlace : 4
			});
		},
		refreshHours : function(){
			var self = this;
			var hour = self.model.get('hour');
			self.refreshTimer({
				 timeUnit  : 'hour'
				,value     : self.model.get('hour')
				,tensPlace : 0
				,onesPlace : 1
			});
		},
		refreshTimer : function(params){
			var self       = this;
			var timeUnit   = params.timeUnit;
			var value      = params.value;
			var tensPlace, onesPlace;
			var $spans     = $('#globalHeader .numBox > span');
			var $tensPlace = $spans.eq(params.tensPlace);
			var $onesPlace = $spans.eq(params.onesPlace);

			if (value > 9) {
				tensPlace = (value / 10) | 0;
				onesPlace = value % 10;
			} else {
				tensPlace = 0;
				onesPlace = value;
			};
			$tensPlace.removeClass().addClass('numGold num_' + tensPlace);
			$onesPlace.removeClass().addClass('numGold num_' + onesPlace);
		}
	});
	return View;
});