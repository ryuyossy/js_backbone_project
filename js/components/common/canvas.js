define( function(){
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			this.set({loadedImg:[]});
		},
		load : function(cjs_file){
			var self = this;
			_.when(self.loadCanvasData(cjs_file), self.preloadImgs())
				.then(
				function(){self.trigger('succeedLoading')},
				function(){self.trigger('failLoading')}
			);
		},
		loadCanvasData : function(createjsFile){
			var self = this;
			var dfd = new _.Deferred();
			require(
				{urlArgs : self.page.model.getRevisionNumber(createjsFile)},
				[createjsFile],
				function(createjsContainer){
					self.cjs_container = createjsContainer;
					dfd.resolve();
				}
			);
			return dfd.promise();
		},
		preloadImgs : function(){
			var self = this;
			var dfd = new _.Deferred();
			var loader = new createjs.PreloadJS();
			loader.setMaxConnections(10);
			loader.onFileLoad = this.imgLoaded;
			loader.onComplete = function(){ dfd.resolve() };
			loader.loadManifest(self.get('manifest').map(function(manifest){
				var m = _.extend({},manifest);
				m.src = m.src + '?cb=' + (new Date/1000|0) + m.id;
				return m;
			}));
			return dfd.promise();
		},
		imgLoaded : function(o){
			if(o.type != "image") return;
			var loadedImg = this.get('loadedImg');
			loadedImg[o.id] = o.result;
			this.set({loadedImg:loadedImg});
		},
		filterManifest : function(manifest){
			return manifest;
		},
		addImgsToManifest : function(manifest,addList){
			addList.forEach(function(add){
				if(!manifest.some(function(piece){return piece.id === add.id})) manifest.push(add);
			});
			return manifest;
		}
	});
	var View = Backbone.View.extend({
		el : "#fullScreen",
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('setAnimation', self.setJson);
			self.on('next', self.unload);

			self.model.on('succeedLoading', function(){
				self.page.trigger('loadCreateJSAnimation');
				self.trigger('load');
			});
			//todo-ayp: this.on('failLoading', this.methodName);を追加する

			self.model.once("change:manifest", function(model, manifest) {
				var page_data = self.model.get('page_data') || self.page.model.get('page_data');
				var img_url_root = page_data.img_url_root || self.page.model.get('page_data').img_url_root;
				manifest = model.filterManifest(manifest).map(function(m){
					var piece = _.extend({},m);
					piece.src = img_url_root + '/' + m.src.replace(/^img\//,'');
					piece.type = createjs.PreloadJS.IMAGE;
					return piece;
				});
				model.set({manifest : manifest});
			});

			self.model.once("change:name", function(model, name) {
				model.load('/js/createjs/' + name + '.js');
			});
		},
		setJson : function(json){
			this.model.set({page_data:json}, {silent:true});
		},
		setExportRoot : function(){
			this.model.cjs_container.initialize(this.model.get('loadedImg'), this.model.get('createjsJson'), createjs);
			this.exportRoot = new this.model.cjs_container.lib[this.model.get('name')]();
		},
		unload : function(){
			this.exportRoot.stop();
			this.exportRoot.removeAllChildren();
			this.exportRoot = void 0;
			this.lib = void 0;
			this.cjs_container = void 0;
		}
	});
	return {
		Model : Model,
		View : View
	};
});