define(function(){
	var page, page_data;
	var Model = Backbone.Model.extend({
		defaults : {
			'steps' : [
				'step_join', // Step 0
				'step_present', // Step 1
				'step_attack', // Step 2
				'step_combo', // Step 3
				'step_ability', // Step 4
				'step_hp_ko', // Step 5
				'step_senior_sample', // Step 6
				'step_battle_end', // Step 7
				'step_guild', // Step 8
				'step_review', // Step 9
				'step_complete' // Step 10
			]
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on({
				'initialize' : self.loadSteps
			});
			self.trigger('initialize');
		},
		getCurrent : function(){
			var self = this;
			var steps = self.get('steps');
			var current_step = self.get('current_step');
			return steps[current_step];
		},
		setStep : function(){
			var self = this;
			var current_step = page_data.tutorial_step;
			if( current_step >= 0 ){
				self.set({'current_step' : current_step}, {silent : true});
				self.trigger('setStep');
			} else {
				self.trigger('endTutorial');
			}
		},
		goToNextStep : function(){
			var self = this;
			var current_step = self.get('current_step');
			self.set({'current_step' : 1 + current_step});
		},
		goToNextFrame : function(){
			var self = this;
			var current = self.getCurrent();
			var current_frame = current.model.get('current_frame');
			current_frame = current_frame >= 0 ? current_frame + 1 : 0;
			current.model.set({'current_frame' : current_frame});
			var label = current.frames[current_frame];
			current[label]();
		},
		loadSteps : function(){
			var self = this;
			var steps = self.get('steps');
			if( !_.isString(steps[0]) ) return;
			_.each(steps, function(path, key){
				path = '/js/components/tutorial/step/' + path + '.js';
				require([path], function(step){
					self.trigger('loadStep', step, key);
				});
			});
		},
		checkLoaded : function(key){
			var self = this;
			if(key===undefined) key = self.get('current_step');
			if( key >= 0 && self.get('current_step') !== key ) return;
			var current = self.getCurrent();
			if( !current ){
				throw new Error('Stepが存在しません。');
			}
			if( !_.isString(current) && current.model.has('is_loaded') ){
				page.trigger('completeBgLoading');
				current.trigger('ready');
			} else {
				page.trigger('incompleteBgLoading');
			}
		},
		postProgressAPI : function(){
			var self = this;
			var step = self.get('current_step');
			if( step===0 || step===1 || step===9 || step===-1 ){
				self.trigger('dontPostProgressAPI');
				return;
			}
			if( self.get('is_loading') ){
				self.trigger('remainPost');
			} else {
				self.set({'is_loading' : true});
				$.ajax({
					type : 'POST',
					data : {
						'timestamp' : new Date/1000|0
					},
					dataType : 'json',
					url : page.model.getDataPath('/tutorial/progress'),
					success : function(json){
						self.set({'is_loading' : false});
						if( json.status === 200 ){
							self.trigger('succeedProgress');
						} else {
							self.trigger('failProgress');
						}
					},
					error : function(){
						self.set({'is_loading' : false});
						self.trigger('failProgress');
					}
				});
				self.trigger('postProgressAPI');
			}
		}
	});
	var View = Backbone.View.extend({
		el : '#jsTutorial',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'initialize' : self.bindEvents
			});
			self.trigger('initialize');
		},
		bindEvents : function(){
			var self = this;
			self.model.on({
				'change:current_step' : self.model.postProgressAPI,
				'setStep' : function(){
					self.scrollTop();
					self.model.checkLoaded();
				},
				'postProgressAPI' : function(){
					self.scrollTop();
					self.model.checkLoaded();
				},
				'dontPostProgressAPI' : function(){
					self.scrollTop();
					self.model.checkLoaded();
				},
				'remainPost' : self.renderLoading,
				'waitAction' : self.scrollTop,
				'waitInput' : self.scrollTop,
				'loadStep' : self.initializeStep,
				'endTutorial' : self.jumpToMypage
			});
			self.on({
				'wait' : function(ms){
					_.delay(this.model.goToNextFrame, ms);
				},
				'initializeStep' : function(key){
					self.bindStepEvents(key);
					self.model.checkLoaded(key);
				}
			});
		},
		bindStepEvents : function(key){
			var self = this;
			var steps = self.model.get('steps');
			var step = steps[key];
			step.on({'ready' : step.start});
		},
		initializeStep : function(step, key){
			var self = this;
			var steps = self.model.get('steps');
			step.Model = step.Model.extend({
				setIsLoaded : function(){
					this.set({'is_loaded' : true});
				}
			});
			step.View = step.View.extend({
				routing : self,
				page : page
			});
			steps[key] = new step.View({
				model : new step.Model()
			});
			self.trigger('initializeStep', key);
		},
		renderLoading : function(){
			var self = this;
			self.model.once({
				'change:is_loading' : function(){
					page.trigger('completeBgLoading');
					self.model.postProgressAPI();
				}
			});
			page.trigger('incompleteBgLoading');
		},
		renderReloadTime : function(){
			var now = new Date();
			var hour = ('0' + now.getHours()).slice(-2);
			var minute = ('0' + now.getMinutes()).slice(-2);
			var time = hour + ':' + minute;
			$('.jsTutorialReloadTime').text(time);
		},
		scrollTop : function(){
			window.scrollTo(0, 0);
		},
		jumpToMypage : function(){
			page.trigger('changeURL', 'mypage/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});
