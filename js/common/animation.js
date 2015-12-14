define( function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.set({
				loading_at : 0,
				playing_at : -1
			});
			self.once('change:playlist', function(){self.load()});
		},
		load : function(i){
			if(!i) i = 0;
			var self = this;
			var movie = self.getMovieAt(i);
			movie.on('load', function(){
				self.next('loading_at');
				self.trigger('load', i);
			});
			if(i < self.get('playlist').length - 1){
				movie.on('load', function(){self.load(i + 1)});
			}
			movie.load();
		},
		next : function(prop){
			this.set(prop, this.get(prop) + 1);
		},
		getMovieAt : function(i, prop){
			var self = this;
			var playlist = self.get('playlist');
			if(i > playlist.length - 1) return null;
			if(prop) return playlist[i][prop];
			return playlist[i].component;
		},
		getNowPlayingMovie : function(prop){
			return this.getMovieAt(this.get('playing_at'), prop);
		},
		deleteNowPlayingMovie : function(){
			var playlist = this.get('playlist');
			playlist[this.get('playing_at')].component = void 0;
			this.set('playlist', playlist);
		},
		hasNextMovie : function(){
			return this.get('playing_at') + 1 < this.get('playlist').length;
		},
		getDestElements : function(){
			var elements = [];
			this.get('playlist').forEach(function(movie){
				if(movie.after && movie.after.type == 'element'){
					elements.push(movie.after.dest);
				}
			});
			return elements;
		}
	});
	var View = Backbone.View.extend({
		el : '#fullScreen',
		events : {
			'touch .pause, .pushEnter, .jsCanvasTextBox' : 'direct'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.model.page;
			if( !self.$el.children('canvas')[0] ) return;
			self.on('initialize', self.insertLoader);
			self.trigger('initialize');
		},
		insertLoader : function(){
			var self = this;
			if( self.$el.children('.jsLoaderA')[0] ) return;
			var $loader = $('<div class="jsLoaderA"></div>');
			$loader.appendTo(self.$el);
		},
		showLoading : function(){
			var self = this;
			var $loader = self.$el.children('.jsLoaderA');
			$loader.show();
			_.delay(function(){
				self.trigger('showLoading');
			}, 100);
		},
		hideLoading : function(){
			var self = this;
			var $loader = self.$el.children('.jsLoaderA');
			$loader.hide();
		},
		play : function(i){
			var self = this;
			var movie = self.model.getMovieAt(i);
			if(!movie) return;
			self.hideLoading();
			self.setFullScreen();
			if(!self.stage) self.setStage();
			movie.setExportRoot();
			_.delay(function(){
				self.stage.addChild(movie.exportRoot);
			},300);
			self.root_timeline = movie.exportRoot.timeline;
			self.setHeight(self.model.getMovieAt(i, 'height'));
			self.setEndFrame(self.model.getMovieAt(i, 'end_frame'));
			self.stage.onTick = self.tick;
			self.on('end', self.showText);
			self.model.next('playing_at');
		},
		setAnimation : function(parameter){
			var self = this;
			if($('#fullScreen')[0]) $('#globalHeader, #globalFooter, #footer').hide();
			if(parameter.autostart !== false){
				self.model.once('load', self.play);
			}
			self.model.set(parameter);
			self.hide_elements = self.model.getDestElements();
		},
		setEndFrame : function(end_frame){
			var self = this;
			var duration = self.root_timeline.duration;
			self.end_frame = end_frame || duration;
			if(self.end_frame < 0){
				self.end_frame += duration;
			}
		},
		setFullScreen : function(){
			if(!$('#fullScreen')[0]) return;
			$('#globalHeader, #globalFooter, #footer').hide();
			if(this.hide_elements) $(this.hide_elements.join(',')).hide();
			$('#fullScreen').show();
		},
		setHeight : function(height){
			var height = height || 200;
			$('#fullScreen').height(height);
			$('#canvas').attr('height', height);
			$('.pause').height(height);
		},
		setStage : function(){
			var self = this;
			var canvas = document.querySelector("#canvas");
			self.stage = new createjs.Stage(canvas);
			self.stage.update();
			createjs.Ticker.setFPS(20);
			createjs.Ticker.addListener(self.stage);
		},
		renderMessage : function($el, msg, count){
			count = count || 0;
			var self = this;
			var text = msg.substring(0, count);
			if( text.slice(-1)==='<' ) text = text.slice(0, -1);
			$el.html(text);
			count += 1;
			var rep = setTimeout(function(){
				if(count > msg.length + 1) return;
				self.renderMessage($el, msg, count)
			}, 20);
		},
		tick : function(){
			var self = this;
			if(self.root_timeline.position == self.end_frame){
				self.trigger("end");
				self.off('end');
			}
		},
		showText : function(){
			var self = this;
			var text = self.model.getNowPlayingMovie('text');
			$('.pause').show();
			if(!text) return $('.pushEnter').show();
			$('.jsCanvasTextBox, .jsCanvasTextNext').show();
			self.renderMessage($('.jsCanvasTextBox'), text);
		},
		direct : function(){
			var self = this;
			$('.pause').hide();
			$('.pushEnter').hide();
			$('.jsCanvasTextBox, .jsCanvasTextNext').hide();

			var callback = self.model.getNowPlayingMovie('callback');
			if(callback) callback();

			var has_next = self.model.hasNextMovie();
			var after = self.model.getNowPlayingMovie('after');

			if(!has_next) self.destructor();
			if(!after && has_next) return self.next();
			if(!after) return;

			switch(after.type){
				case 'element':
					if($('#fullScreen')[0]){
						$('#globalHeader, #globalFooter, #footer').show();
						$('#fullScreen').hide();
					}
					$(after.dest).show();
					break;
				case 'url':
					page.trigger('changeURL', after.dest, true);
					break;
			}
		},
		next : function(){
			var self = this;
			var i = self.model.get('playing_at') + 1;
			if(self.model.get('loading_at') > i){
				if(this.stage) self.unload();
				self.play(i);
			}else{
				if(this.stage) self.unload();
				self.showLoading();
				self.model.once('load', function(){
					self.play(i);
				});
			}
		},
		unload : function(){
			var self = this;
			self.stage.removeAllChildren();
			self.model.getNowPlayingMovie().trigger('next');
			self.model.deleteNowPlayingMovie();
			self.stage = void 0;
		},
		destructor : function(){
			var self = this;
			if(!self.stage) return;
			self.unload();
			self.model.clear({silent:true});
			createjs.Ticker.removeAllListeners();
			self.root_timeline = void 0;
		}
	});
	return {
		Model : Model,
		View : View
	};
});