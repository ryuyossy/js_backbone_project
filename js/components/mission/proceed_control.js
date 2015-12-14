define(function(){
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#container',
		initialize : function(){
			_.bindAll(this);
			this.timer = {};
			this.model.on('change:json', this.update);

			this.skipEnabled = false;
			this.tapEnabled = true;
			this.on('tapEnable', this.tapEnable);

			this.on('acquisition', this.acquisitionUpdate);

			this.initialEquipMaxCheck();

			this.model.set('mp', this.page.model.get('page_data').user.mp);
		},
		events : {
			'touch .jsProceed' : 'proceed',
			'touch .jsSellProceed' : 'sellProceed',
			'touch .jsProceedLevelUpPopupClose' : 'proceed',
			'touch .jsTresureDetail' : 'goTreasureDetail'
		},
		initialEquipMaxCheck : function(){
			var self = this;
			var page_data_user = self.page.model.get('page_data').user;
			if(page_data_user.equip_num < page_data_user.max_equip_num) return;

			var parameter = {
				title : '所持数上限',
				template : '#jsTemplateEquipMaxFirstErrorPopup',
				is_closable : false,
				local_data : page_data_user
			};
			self.page.trigger('openPopup', parameter);
		},
		equipMaxCheck : function(){
			var self = this;

			var json = self.model.get('json');
			if(!json) return true;

			var json_action = json.action;
			if(!json_action ||
				!json_action.equip_num_after ||
				(json_action.equip_num_max_after > json_action.equip_num_after)){
				return true;
			}

			var popup_json = {
				equip_num : json_action.equip_num_after,
				max_equip_num : json_action.equip_num_max_after
			};

			var parameter = {
				title : '所持数上限',
				template : '#jsTemplateEquipMaxFirstErrorPopup',
				is_closable : false,
				local_data : popup_json
			};
			self.page.trigger('openPopup', parameter);
			return false;
		},
		mpCheck : function(){
			var mp = this.model.get('mp');
			var page_data = this.page.model.get('page_data');
			var use_mp = page_data.field.use_mp;
			if((mp - use_mp) >= 0) return true;
			this.page.model.user.set({use_mp : use_mp});
			this.page.trigger('changeURL', '#mission/mploss/', true);
			return false;
		},
		tapEnable : function(bool){
			var $btn = $('.jsProceed');
			if(bool){
				$btn.removeClass('disable');
				this.skipEnable(false);
			}else{
				$btn.addClass('disable');
			}
			this.tapEnabled = bool;
		},
		skipEnable : function(bool){
			this.skipEnabled = bool;
		},
		acquisitionUpdate : function(){
			var template_id,
				img_dir_name;
			var json = this.model.get('json');
			var json_action = json.action;

			if(json.field.state >= 2){
				var stage_id = this.page.model.get('page_data').stage.stage_id;
				this.page.trigger('changeURL', '#mission/top/' + stage_id + '/', true);
				return;
			}

			if(json.user.level_up){
				var template = $('#jsTemplateProceedLevelUpPopup').html();
				var json_lvup = _.extend(json.user.level_up, {mp_max_after: json.user.max_mp_after});
				var html = $.templates(template).render(json_lvup);
				$(html).appendTo('#missionProceed').show().animate({opacity:1}, 300);
				return;
			}

			if(json_action && json_action.type == 'collectionItem'){
				var template_id = 'jsTemplateAlchemyPopup';
				var template = $('#' + template_id).html();
				var html = $.templates(template).render(json_action);
				$(html).appendTo('#missionProceed').show().animate({opacity:1}, 300);
				return;
			}

			if(!json_action || json_action.type != 'equipTreasure') return;
			switch(json_action.equip_treasure_type){
				case 'equipment':
					template_id = "jsTemplateEquipPopup";
					img_dir_name = 'equip';
					break;
				case 'treasure':
					template_id = "jsTemplateTreasurePopup";
					img_dir_name = 'treasure';
					break;
			}
			var template = $('#' + template_id).html();
			var html = $.templates(template).render(json_action);

			$(html).appendTo('#missionProceed').show().animate({opacity:1}, 300);

			if(json_action.equip_treasure_type == 'equipment'){
				this.setNumber('equip', json_action.equip_num_after);
				this.setNumber('equip_max', json_action.equip_num_max_after);
			}

			if(json_action.first_get_flg){
				var type = json_action.equip_treasure_type;
				var id = (type == 'equipment') ? json_action.equip_id : json_action.treasure_id;
				var $targetBox = $('.findingItem>li[data-type="' + type + '"][data-id="'+ id +'"]');
				$targetBox.removeClass('yet').addClass('got');
			}
		},
		beforeProceed : function(){
			if(!this.tapEnabled) return false;
			if(!this.mpCheck()) return false;
			this.tapEnable(false);

			$(".jsProceedLevelUpPopup, .missionModalBox").animate(
				{opacity:0}, 300, 'linear', function(){
					$(this).remove();
				}
			);
			return true;
		},
		sellProceed : function(e){
			if(!this.beforeProceed()) return;
			var page_data = this.page.model.get('page_data');
			var $btn = $($(e.currentTarget)[0]);
			var $equipNum = this.getNumElement('equip');
			$equipNum.text($equipNum.text() - 1);
			$.ajax({
				type : 'POST',
				dataType : 'json',
				data : {
					'timestamp' : new Date/1000|0,
					'stage_id' : page_data.stage.stage_id,
					'field_id' : page_data.field.field_id,
					'user_equip_no' : $btn.attr('data-user_equip_no')
				},
				url : this.page.model.getDataPath('/mission/proceed/sell'),
				success : this.setJson,
				error : this.error
			});
		},
		proceed : function(e){
			e.preventDefault();
			if(this.skipEnabled) return this.skip();
			if(!this.equipMaxCheck()) return;
			if(!this.beforeProceed()) return;
			var page_data = this.page.model.get('page_data');
			$.ajax({
				type : 'POST',
				dataType : 'json',
				data : {
					'timestamp' : new Date/1000|0,
					'stage_id' : page_data.stage.stage_id,
					'field_id' : page_data.field.field_id
				},
				url : this.page.model.getDataPath('/mission/proceed/do'),
				success : this.setJson,
				error : this.error
			});
		},
		setJson : function(json){
			if(json.status == "200"){
				json.date = new Date/1000|0;
				this.model.set({
					json:json,
					mp:json.user.mp_after
				}, {silent:true});
				this.model.trigger('change:json');
			}else{
				this.error();
			}
		},
		error : function(){
			this.tapEnable(true);
		},
		update : function(){
			var self = this;
			var json = this.model.get('json');

			var action = ['advance'];
			if(json.user.level_up) action.push('levelup');
			if(json.field.state >= 2) action.push('fieldclear');
			if(json.action && json.action.type == 'gachaPoint') action.push('acquisition_gachaPoint');
			if(json.action && json.action.type == 'tp') action.push('acquisition_tp');
			if(json.action && json.action.type == 'equipTreasure') action.push('acquisition');
			if(json.action && json.action.type == 'collectionItem') action.push('acquisition');

			this.skipEnable(true);
			this.trigger('proceedComplete', action);

			self.setGaugeWidth('missionProgress', json.field.progress_percent_after);

			if(json.sell && json.sell.equip_num_after
				&& !(json.action && json.action.type == 'equipTreasure' && json.action.equip_treasure_type == 'equipment')){
				self.setNumber('equip', json.sell.equip_num_after);
			}

			if(json.user.level_up){
				self.setGaugeWidth('missionP', 100);
				self.setNumber('mp', json.user.max_mp_after);
				self.setNumber('max_mp', json.user.max_mp_after);

				self.setGaugeWidth('missionExp', 100, undefined, function(){
					self.setGaugeWidth('missionExp', 0, 0);
					_.delay(function(){
						self.setGaugeWidth('missionExp', json.user.exp_percent_after);
					}, 100);
				});

				self.setNumber('exp', 0, undefined, function(){
					self.getNumElement('exp').text(json.user.exp_current_after + json.user.exp_levelup_after);
					self.setNumber('exp', json.user.exp_levelup_after);
				});
			}else{
				self.setGaugeWidth('missionP', json.user.mp_percent_after);
				self.setNumber('mp', json.user.mp_after);

				self.setGaugeWidth('missionExp', json.user.exp_percent_after);
				self.setNumber('exp', json.user.exp_levelup_after - json.user.exp_current_after);
			}

			if(json.action && json.action.type == 'tp'){
				self.setGaugeWidth('battleP', json.action.tp_after);
				self.setNumber('tp', json.action.tp_after);
			}

			if(json.user.win_gil > 0){
				self.setNumber('gil', json.user.gil_after);
			}
		},
		skip : function(){
			this.skipEnable(false);

			var self = this;
			var json = this.model.get('json');

			self.setGaugeWidth('missionProgress', json.field.progress_percent_after, 0);

			if(json.sell && json.sell.equip_num_after
				&& !(json.action && json.action.type == 'equipTreasure' && json.action.equip_treasure_type == 'equipment')){
				self.setNumber('equip', json.sell.equip_num_after, 0);
			}

			if(json.user.level_up){
				self.setGaugeWidth('missionP', 100, 0);
				self.setNumber('mp', json.user.max_mp_after, 0);
				self.setNumber('mp_max', json.user.max_mp_after, 0);

				self.setGaugeWidth('missionExp', json.user.exp_percent_after, 0);
				self.setNumber('exp', json.user.exp_levelup_after - json.user.exp_current_after, 0);
			}else{
				self.setGaugeWidth('missionP', json.user.mp_percent_after, 0);
				self.setNumber('mp', json.user.mp_after, 0);

				self.setGaugeWidth('missionExp', json.user.exp_percent_after, 0);
				self.setNumber('exp', json.user.exp_levelup_after - json.user.exp_current_after, 0);
			}

			if(json.action && json.action.type == 'tp'){
				self.setGaugeWidth('battleP', json.action.tp_after, 0);
				self.setNumber('tp', json.action.tp_after, 0);
			}

			if(json.user.win_gil > 0){
				self.setNumber('gil', json.user.gil_after, 0);
			}

			this.trigger('proceedSkip');
		},
		setGaugeWidth : function(class_name, percent, duration, callback){
			var selector = '.jsGauge.' + class_name;
			var gauge = document.querySelector(selector);
			var $gauge = $(gauge);

			if(duration === undefined) duration = .5;
			if(callback && duration) $gauge.one('webkitTransitionEnd', callback);

			gauge.style.webkitTransition = '';
			gauge.style.width = window.getComputedStyle(gauge).width;

			gauge.style.webkitTransitionDuration = duration + 's';
			gauge.style.width = percent + '%';

			if(callback && duration === 0) callback();
		},
		getNumElement : function(class_name){
			return $('.jsNum.js_' + class_name);
		},
		setNumber : function(class_name, to, duration, callback){
			var self = this;
			var $num = self.getNumElement(class_name);

			if(duration === undefined) duration = 0.5;
			if(callback) $num.one('numberAnimationEnd:' + class_name, callback);

			if(self.timer[class_name]) window.clearTimeout(self.timer[class_name]);

			if(duration === 0){
				$num.html(to);
				$num.trigger('numberAnimationEnd:' + class_name);
				return;
			}

			var ms_duration = 1000 * duration;
			var rate = 100;
			var total_frames = ~~(ms_duration / rate);

			var from = Number($num.text());
			var now = from;
			var diff = to - from;
			var quotient = ~~(diff / total_frames);
			var remainder = diff % total_frames;
			var current_frame = 1;

			self.timer[class_name] = window.setInterval(function(){
				var is_last_frame = (current_frame == total_frames);
				var adjust = (is_last_frame ? remainder : 0);

				now = now + quotient + adjust;
				$num.html(now);

				if(is_last_frame){
					window.clearTimeout(self.timer[class_name]);
					$num.trigger('numberAnimationEnd:' + class_name);
				}
				current_frame++;
			}, rate);
		},
		goTreasureDetail : function(e){
			var self = this;
			var page_data = self.page.model.get('page_data');
			self.page.model.user.set({
				stage_id : page_data.stage.stage_id,
				field_id : page_data.field.field_id
			});
			var $btn = $(e.currentTarget);
			self.page.trigger('changeURL', $btn.attr('data-href'), true);
		}
	});

	return {
		Model : Model,
		View : View
	};
});
