define(function(){
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#battle',
		initialize : function(){
			var self = this;
			_.bindAll(this);
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('initialize', self.isInfobar);
			self.trigger('initialize');
		},
		events : {
			'touch #battle .reload' : 'reload'
		},
		reload : function(){
			window.location.reload(true);
		},
		isInfobar : function(){
			var self = this;
			var infobarUA = 'Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01 Build/S6160) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf(infobarUA) !== -1) {
				self.showNavicoVerNonAnimation();
			} else {
				self.showNavico();
			}
		},
		showNavico : function(){
			var self = this;
			var $navico = $(self.el).find('.navicoAnnouncementOfBattle');
			if ($navico.length === 0) return;
			_.delay(function(){
				$navico.show();
				$navico.addClass('moveNavicoAnnounce');
			}, 80);
		},
		showNavicoVerNonAnimation : function(){
			var self = this;
			var $navico = $(self.el).find('.navicoAnnouncementOfBattle');
			var showTime = 2500;
			var delayTime = 3000;
			if ($navico.length === 0) return;
			_.delay(function(hideNavico){
				$navico.css('margin-left', '6px');
				$navico.show();
				_.delay(function(){
					$navico.hide();
				}, showTime);
			}, delayTime);
		}
	});

	return {
		Model : Model,
		View : View
	};
});