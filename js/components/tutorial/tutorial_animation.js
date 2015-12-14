define([
	'components/battle/battle_canvas',
	'components/tutorial/tutorial_gauge_canvas',
	'components/battle/attack_canvas',
	'components/battle/ability_canvas_tutorial',
	'components/ability/ability_get_canvas',
	'components/job/job_get_canvas'
], function(
	Battle,
	Gauge,
	Attack,
	Ability,
	AbilityGet,
	JobGet
){
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'initialize' : function(){
					self.defineReference();
					self.optimizeAnimationData();
					self.instantiateAnimation();
					self.setAnimationData();
				}
			});
			self.trigger('initialize');
		},
		defineReference : function(){
			var self = this;
			Battle.Model = Battle.Model.extend({page : page});
			Battle.View = Battle.View.extend({page : page});
			Gauge.Model = Gauge.Model.extend({page : page});
			Gauge.View = Gauge.View.extend({
				page : page,
				animation : self
			});
			Attack.Model = Attack.Model.extend({page : page});
			Attack.View = Attack.View.extend({page : page});
			Ability.Model = Ability.Model.extend({page : page});
			Ability.View = Ability.View.extend({page : page});
			AbilityGet.Model = AbilityGet.Model.extend({page : page});
			AbilityGet.View = AbilityGet.View.extend({page : page});
			JobGet.Model = JobGet.Model.extend({page : page});
			JobGet.View = JobGet.View.extend({page : page});
		},
		optimizeAnimationData : function(){
			var self = this;
			var animations = self.get('animations');
			var new_animations = {}
			var step = page_data.tutorial_step || 0;
			animations.splice(0, step);
			animations = _.filter(animations, function(animation){
				return _.size(animation) > 0;
			});
			animations = _.each(animations, function(animation){
				_.extend(new_animations, animation);
			});
			self.set({animations : new_animations});
		},
		instantiateAnimation : function(){
			var self = this;
			var animations = self.get('animations');
			_.each(animations, function(animation){
				var module = animation.module;
				animation.instance = new module.View({
					model : new module.Model()
				});
			});
		},
		setAnimationData : function(){
			var self = this;
			var user = page.model.get('user') || page_data;
			if( !user.avatar_id ) return;
			
			var animations = self.get('animations');
			_.each(animations, function(animation){
				var instance = animation.instance;
				var all_json = self.get('json');
				var json_keys = animation.json;
				var animation_data = {};
				if( _.isString(json_keys) ){
					animation_data = all_json[json_keys];
				} else if( _.isArray(json_keys) ){
					_.each(json_keys, function(key){
						if( _.isString(key) ){
							_.extend(animation_data, all_json[key]);
						} else if( _.isFunction(key) ){
							key.call(animation_data);
						}
					});
				}
				instance.trigger('setAnimation', animation_data);
			});
		},
		setIsCallback : function(){
			var self = this;
			self.set({'is_callback' : true});
		}
	});
	var View = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on({
				'touchButton' : self.model.setIsCallback,
				'initialize' : self.initAnimation
			});
			self.trigger('initialize');
		},
		initAnimation : function(){
			var self = this;
			var user = page.model.get('user') || page_data;
			if( !user.avatar_id ) return;
			
			var playlist = [];
			var animations = self.model.get('animations');
			var i = 0;
			_.each(animations, function(animation){
				playlist[i++] = {
					component : animation.instance,
					end_frame : animation.end_frame,
					callback : animation.has_pushenter && self.touchButton
				};
			});
			var parameter = {
				autostart : false,
				playlist : playlist
			};
			page.trigger('setAnimation', parameter);
		},
		touchButton : function(){
			this.trigger('touchButton');
		},
		play : function($next){
			var self = this;
			if(!$next) $next = $('.jsTutorialFullScreen');
			$next.find('.jsCanvas').append($('#canvas'));
			if( self.model.has('is_callback') ){
				self.model.unset('is_callback');
			} else {
				page.trigger('forwardAnimation');
			}
		},
		showFullScreen : function($next){
			if($next) return;
			$('.jsTutorialFullScreen').show();
		},
		hideFullScreen : function(){
			$('.jsTutorialFullScreen').hide();
		}
	});
	Model = Model.extend({
		defaults : {
			'animations' : [
				{} // Step 0
				,{} // Step 1
				,{ // Step 2
					battle : {
						module : Battle
						,json : ['battle', function(){
							var user = page.model.get('user') || page_data;
							this.own_guild.fronts[0].avatar_id = user.avatar_id;
						}]
					}
					,gauge : {
						module : Gauge
					}
					,attack : {
						module : Attack
						,json : ['attack', function(){
							var user = page.model.get('user') || page_data;
							this.avatar_id = user.avatar_id;
						}]
						,has_pushenter : true
					}
				},{ // Step 3
					battle2 : {
						module : Battle
						,json : ['battle', 'battle2']
					}
					,gauge2 : {
						module : Gauge
					}
					,combo : {
						module : Attack
						,json : ['attack', 'combo', function(){
							var user = page.model.get('user') || page_data;
							this.avatar_id = user.avatar_id;
							this.combo_users[1].avatar_id = user.avatar_id;
						}]
						,has_pushenter : true
					}
					,abilityGet : {
						module : AbilityGet
						,json : ['abilityGet', function(){
							var user = page.model.get('user') || page_data;
							this.win_ability.avatar_id = user.avatar_id;
						}]
						,end_frame : -2
						,has_pushenter : true
					}
				},{ // Step 4
					battle3 : {
						module : Battle
						,json : ['battle', 'battle2']
					}
					,gauge3 : {
						module : Gauge
					}
					,ability : {
						module : Ability
						,json : ['ability', function(){
							var user = page.model.get('user') || page_data;
							this.user.avatar_id = user.avatar_id;
							this.combo_users[1].avatar_id = user.avatar_id;
							this.combo_users[3].avatar_id = user.avatar_id;
						}]
						,has_pushenter : true
					}
				},{ // Step 5
					battle4 : {
						module : Battle
						,json : ['battle4', function(){
							var user = page.model.get('user') || page_data;
							this.own_guild.fronts[0].avatar_id = user.avatar_id;
						}]
					}
				},{ // Step 6
					battle5 : {
						module : Battle
						,json : 'battle4'
					}
					,elder : {
						module : Ability
						,json : ['elder', function(){
							var user = page.model.get('user') || page_data;
							this.combo_users[1].avatar_id = user.avatar_id;
							this.combo_users[3].avatar_id = user.avatar_id;
							this.combo_users[5].avatar_id = user.avatar_id;
						}]
						,has_pushenter : true
					}
					,battle6 : {
						module : Battle
						,json : 'battle4'
					}
				},{ // Step 7
					battle7 : {
						module : Battle
						,json : 'battle4'
					}
				}
				,{} // Step 8
				,{} // Step 9
				,{ // Step 10
					jobGet : {
						module : JobGet
						,json : 'jobGet'
						,end_frame : -2
						,has_pushenter : true
					}
				}
			],
			'json' : {
				'battle' : {
					"own_guild": {
						"gp": 158,
						"fainted_flg": false,
						"fronts": [
							{
								"user_id": 2,
								"avatar_id": "00001",
								"name": "自分",
								"fainted_flg": false
							},{
								"user_id": 1,
								"avatar_id": "21001",
								"name": "先輩兵士",
								"fainted_flg": false
							},{
								"user_id": 12,
								"avatar_id": "20002",
								"name": "３人目",
								"fainted_flg": false
							}
						]
					},
					"enemy_guild": {
						"gp": 0,
						"fainted_flg": false,
						"fronts": [
							{
								"user_id": 5,
								"avatar_id": "22001",
								"name": "敵A",
								"fainted_flg": false
							},{
								"user_id": 2,
								"avatar_id": "00001",
								"name": "敵B",
								"fainted_flg": false
							},{
								"user_id": 12,
								"avatar_id": "30002",
								"name": "敵C",
								"fainted_flg": false
							}
						]
					}
				},
				'battle2' : {
					"combo": {
						"attack_combo_num": 22,
						"attack_rest_time": "10:00",
						"yell_combo_num": 33,
						"yell_rest_time": "12:34"
					}
				},
				'battle4' : {
					"own_guild": {
						"gp": 158,
						"fainted_flg": false,
						"fronts": [
							{
								"user_id": 2,
								"avatar_id": "00001",
								"name": "自分",
								"fainted_flg": false
							},{
								"user_id": 1,
								"avatar_id": "21001",
								"name": "先輩兵士",
								"fainted_flg": false
							},{
								"user_id": 12,
								"avatar_id": "20002",
								"name": "３人目",
								"fainted_flg": false
							}
						]
					},
					"enemy_guild": {
						"gp": 0,
						"fainted_flg": false,
						"fronts": [
							{
								"user_id": 5,
								"avatar_id": "22001",
								"name": "敵A",
								"fainted_flg": false
							},{
								"user_id": 2,
								"avatar_id": "00001",
								"name": "敵B",
								"fainted_flg": true
							},{
								"user_id": 12,
								"avatar_id": "30002",
								"name": "敵C",
								"fainted_flg": false
							}
						]
					}
				},
				'attack' : {
					"target":{
						"user_id":5,
						"avatar_id":"22001",
						"name":"敵A",
						"fainted_flg":false
					},
					"damage":256,
					"combo_users":[],
					"tension_max_flg":false,
					"attribute_effect":{
						"type":"炎",
						"damage":300
					}
				},
				'combo' : {
					"combo_users" : [
						{},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						},{
							"user_id": 12,
							"avatar_id": "20002",
							"name": "３人目"
						}
					],
					"damage":208,
					"target":{
						"user_id":6,
						"avatar_id":"30001",
						"name":"敵B",
						"fainted_flg":false
					}
				},
				'ability' : {
					"user":{
						"avatar_id":"00001"
					},
					"ability_id": 118,
					"combo_users": [
						{},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						},{
							"user_id": 12,
							"avatar_id": "20002",
							"name": "３人目"
						},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						},{
							"user_id": 12,
							"avatar_id": "20002",
							"name": "３人目"
						}
					],
					"tension_max_flg":false,
					"methods": [
						{
							"method_type": "attack",
							"total_damage": 456,
							"targets": [
								{
									"name": "敵A",
									"user_id": 232,
									"avatar_id": "00001",
									"fainted_flg": false,
									"critical_flg": false
								}
							]
						}
					]
				},
				'elder' : {
					"user":{
						"avatar_id":"21001"
					},
					"ability_id": 55,
					"combo_users": [
						{},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						},{
							"user_id": 12,
							"avatar_id": "20002",
							"name": "３人目"
						},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						},{
							"user_id": 12,
							"avatar_id": "20002",
							"name": "３人目"
						},{
							"user_id": 2,
							"avatar_id": "00001",
							"name": "自分"
						}
					],
					"tension_max_flg":false,
					"methods": [
						{
							"method_type": "attack",
							"total_damage": 9999,
							"targets": [
								{
									"name": "敵A",
									"user_id": 232,
									"avatar_id": "22001",
									"fainted_flg": false,
									"critical_flg": false
								},{
									"name": "敵B",
									"user_id": 233,
									"avatar_id": "30002",
									"fainted_flg": false,
									"critical_flg": false
								}
							]
						}
					]
				},
				'abilityGet' : {
					"win_ability_flg":true,
					"win_ability":{
						"avatar_id":"00001",
						"id":83
					}
				},
				'jobGet' : {
					"win_jobs": [
						{
							"id": 100,
							"name": "ソルジャー"
						}
					]
				}
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
