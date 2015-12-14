define(function(){
	// LABIシステム対応
	var page, page_data;
	var Model = Backbone.Model.extend({
		defaults : {
			'is_prod' : /^braveguardian\.jp$/.test(location.host),
			'is_stg' : /^stg-braveguardian\.jp$/.test(location.host)
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.setPath();
		},
		setPath : function(){
			var self = this;
			var is_prod = self.get('is_prod');
			var is_stg = self.get('is_stg');
			if( !is_prod && !is_stg ) return;
			var path;
			if( is_stg ){
				path = 'http://stat.sb-amebame.com/pub/content/178/js/';
			} else if( is_prod ){
				path = 'http://stat.amebame.com/pub/content/2513/js/';
			}
			path += 'rotationBannerAds.js';
			self.set('path', path);
		},
		load : function(){
			var self = this;
			var path = self.get('path');
			if( !path ) return;
			require({urlArgs : null}, [path], function(){
				self.trigger('load');
			});
		}
	});
	var View = Backbone.View.extend({
		model : new Model(),
		el_text : '.jsLabiText',
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.$el_text = $(self.el_text);
			self.bindEvents();
			self.model.load();
		},
		bindEvents : function(){
			var self = this;
			self.model.on({
				'load' : function(){
					self.resetSettings();
					self.setStyles();
					self.checkRender();
					self.render();
				}
			});
			self.on({
				'renderNothing' : self.hide
			});
		},
		resetSettings : function(){
			if( _.has(window, 'rotationBannerAdsProcessObj') ){
				if( _.has(window.rotationBannerAdsProcessObj, 'started') ){
					window.rotationBannerAdsProcessObj.started = false;
				}
				if( 
					!!window.rotationBannerAdsProcessObj.cache &&
					!!window.rotationBannerAdsProcessObj.cache[0] &&
					!!window.rotationBannerAdsProcessObj.cache[0].timerId
				){
					window.clearInterval(window.rotationBannerAdsProcessObj.cache[0].timerId);
				}
			}
			$('.rotationBannerAds_arrowprev').off();
			$('.rotationBannerAds_arrownext').off();
		},
		setStyles : function(){
			window.setRotationBannerAdsImgWidth(280);
			window.setRotationBannerAdsMainColor('#008C8C');
		},
		checkRender : function(){
			var self = this;
			var is_text = !!self.$el_text[0];
			if( !is_text ) return;
			var timer = window.setInterval(function(){
				var is_rendered = !!$('.rotationBannerAds_hide')[0];
				if( is_rendered ){
					self.trigger('renderNothing');
					window.clearInterval(timer);
				}
			}, 500);
		},
		render : function(){
			var labi_asid = page_data.labi_asid;
			if( labi_asid ){
				window.loadRotationBannerAdsForLoginUser(labi_asid); // ログイン中
			} else {
				window.loadRotationBannerAdsForNonLoginUser(); // 未ログイン
			}
		},
		hide : function(){
			this.$el_text.hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});
