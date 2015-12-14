define( function(){
	var Loader;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			Loader = new createjs.PreloadJS();

			this.on("change:manifest", function(model, manifest) {
				model.off("change:manifest");
				model.set({manifest : model.filterManifest(manifest)});
			});
		},
		preload : function(){
			Loader.setMaxConnections(10);
			Loader.onFileLoad = this.imgLoaded;
			Loader.onComplete = this.preloadComplete;

			var manifest = this.get('manifest');
			var uniqued_manifest = [];
			var srcs = [];
			manifest.forEach(function(m){
				if(srcs.indexOf(m.src) < 0){
					srcs.push(m.src);
					uniqued_manifest.push(m);
				}
			});

			Loader.loadManifest(uniqued_manifest.map(function(m){
				m.src = m.src + '?cb=' + (new Date/1000|0) + m.id;
				return m;
			}));
		},
		imgLoaded : function(o){
			if(o.type != "image") return;
			$el = $('img[data-src="' + o.id + '"]');
			o.result.width = $el.attr('width');
			o.result.height = $el.attr('height');
			$('img[data-src="' + o.id + '"]').after(o.result).remove();
		},
		preloadComplete : function(){
			this.trigger('succeedLoading');
		},
		filterManifest : function(pre){
			return pre;
		}
	});
	var View = Backbone.View.extend({
		el : "#an-anim",
		initialize : function(){
			this.$el.hide();
			_.bindAll(this);

			this.model.on('succeedLoading', this.startAnimation);
			//todo-ayp: this.on('failLoading', this.methodName);を追加する

			this.setManifest();
			this.model.preload();
		},
		setManifest : function(){
			var manifest = [];
			this.$el.find('img').each(function(i, img){
				var src = $(img).attr('data-src');
				manifest.push({
					src: src,
					id: src,
					type: createjs.PreloadJS.IMAGE
				});
			});
			this.model.set('manifest', manifest);
		},
		startAnimation : function(){
			this.$el.show();
			this.trigger('animationStarted');
		}
	});
	return {
		Model : Model,
		View : View
	};
});