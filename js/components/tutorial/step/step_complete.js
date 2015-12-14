define(function(){
	var page, page_data, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialMain',
		events : {
		},
		frames : [
			'playJobGetAnimation',
			'end'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'remainPost' : self.renderLoading,
				'initialize' : self.model.setIsLoaded
			});
			self.trigger('initialize');
		},
		start : function(){
			$('.jsTutorialMain').show();
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : 'チュートリアルを終了する',
				'text' : 'これで研修は終了だ。<br>立派なガーディアンを目指して頑張ってくれ！！'
			});
			routing.trigger('waitAction');
		},
		playJobGetAnimation : function(){
			var self = this;
			var $fullscreen = $('.jsTutorialFullScreen');
			$('.jsTutorialMain').hide();
			$fullscreen.show();
			routing.trigger('playAnimation', $fullscreen, true);
			routing.trigger('waitInput');
		},
		end : function(){
			var self = this;
			if( routing.model.get('is_loading') ){
				self.trigger('remainPost');
			} else {
				page.trigger('changeURL', 'tutorial/complete/', true);
			}
		},
		renderLoading : function(){
			var self = this;
			routing.model.once({
				'change:is_loading' : function(){
					page.trigger('completeBgLoading');
					self.end();
				}
			});
			page.trigger('incompleteBgLoading');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
