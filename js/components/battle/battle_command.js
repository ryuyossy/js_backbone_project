define(function(){
	var user;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#battleMenu',
		initialize : function(){
			_.bindAll(this);
			user = this.page.model.user;
			var page_data = this.page.model.get('page_data');

			//通常攻撃が無効の場合
			if(page_data.user.hp == 0
			|| page_data.user.tp < 10){
				$('.jsBattleActionBtn .regular').addClass('disable').removeAttr('data-href');
			}
			if(page_data.user.tp < 20){
				//必殺技無効
				$('.jsBattleActionBtn .special.no_ability').addClass('disable').removeAttr('data-href');

				//HP回復無効
				$('.jsBattleActionBtn .recovery').addClass('disable').removeAttr('data-href');
			}
			if(page_data.user.tp < 10){
				//エール無効
				$('.jsBattleActionBtn .yell').addClass('disable').removeAttr('data-href');
				$('.jsBattleActionBtn .frontYell').addClass('disable').removeAttr('data-href');
			}
		},
		events : {
			'touch #battle .reload' : 'reload',
			'touch .jsBattleActionBtn .recovery' : 'recover',
			'touch .jsBattleActionBtn .regular' : 'setAttackCommand',
			'touch .jsBattleActionBtn .yell' : 'setYellCommand',
			'touch .jsBattleActionBtn .frontYell' : 'setYellCommand',
			'touch .jsBattleActionBtn .special' : 'abilityToggle',
			'touch .jsAbilityBtn' : 'setAbilityCommand'
		},
		recover : function(){
			$.ajax({
				type : 'POST',
				dataType : 'json',
				data : {timestamp : new Date/1000|0 },
				url : this.page.model.getDataPath('/battle/recover/do'),
				success : this.spotAjaxSuccess,
				error : this.spotAjaxError
			});
		},
		spotAjaxSuccess : function(json){
			if(json.status == "200"){
				if(json.master_job_flg || json.win_ability_flg || (json.win_jobs && json.win_jobs.length > 0)){
					var jex_info_names = ['win_jobs','win_ability_flg','win_ability','master_job','master_job_flg'];
					var jex_info = {};
					jex_info_names.forEach(function(name){
						jex_info[name] = json[name];
					});
					jex_info.after = {
						type : 'url',
						dest : 'battle/'
					};
					jex_info.img_url_root = this.page.model.get('page_data').img_url_root;
					this.page.model.user.set('jex_info', jex_info);
					this.page.trigger('changeURL', 'battle/jex/', true);
				}else{
					this.reload();
				}
			}else{
				this.spotAjaxError(json);
			}
		},
		spotAjaxError : function(json){
			if(!json.errors) this.trigger('changeURL', 'battle/', true);
			if(json.errors[0] == 'close'){
				RS.put({
					'first_popup' : {
						title : 'バトル終了',
						local_data : {
							'message' : 'バトルは終了しました！'
						}
					}
				}, false);
				this.page.trigger('changeURL', 'battle/top/', true);
			}else{
				RS.put({
					'first_popup' : {
						title : 'バトルエラー',
						local_data : {
							'message' : json.errors[0]
						}
					}
				}, false);
				this.page.trigger('changeURL', 'battle/', true);
			}
		},
		reload : function(){
			window.location.reload(true);
		},
		setAttackCommand : function(e){
			user.set({
				avatar_id: this.page.model.get('page_data').user.avatar_id,
				command: 'attack'
			});
			this.page.trigger('changeURL', $(e.currentTarget).attr('data-href'), true);
		},
		setYellCommand : function(e){
			user.set({
				avatar_id: this.page.model.get('page_data').user.avatar_id
			});
			var $btn = $(e.currentTarget);
			this.page.trigger('changeURL', $btn.attr('data-href'), true);
		},
		setAbilityCommand : function(e){
			var $btn = $($(e.currentTarget)[0]);
			var dest = $btn.attr('data-href');
			if(!dest) return this.setNonAnimationAbilityCommand($btn.attr('data-ability_id'));
			var parameter = {
				avatar_id: this.page.model.get('page_data').user.avatar_id,
				command: 'ability',
				ability_id: $btn.attr('data-ability_id')
			};
			if(dest == 'battle/ability/'){
				parameter = _.extend(parameter,{power:99});
			}
			user.set(parameter);
			this.page.trigger('changeURL', dest, true);
		},
		setNonAnimationAbilityCommand : function(ability_id){
			$.ajax({
				type : 'POST',
				dataType : 'json',
				data : {
					power_gage_percent : 99,
					ability_id : ability_id,
					timestamp : new Date/1000|0
				},
				url : this.page.model.getDataPath('/battle/ability/do'),
				success : this.spotAjaxSuccess,
				error : this.spotAjaxError
			});
		},
		abilityToggle : function(e){
			var btn = $(e.currentTarget);
			if(btn.hasClass('ability_close')){
				btn.removeClass('ability_close').addClass('ability_open');
				btn.removeClass('off').addClass('on');
				$('.abilityList').show();
			}else{
				btn.removeClass('ability_open').addClass('ability_close');
				btn.removeClass('on').addClass('off');
				$('.abilityList').hide();
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
