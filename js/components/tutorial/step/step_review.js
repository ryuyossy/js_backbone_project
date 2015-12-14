define(function(){
	var page, page_data, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialReview',
		events : {
			'touch .jsTutorialButtonNext' : function(){
				routing.model.goToNextFrame();
			}
		},
		frames : [
			'renderReviewPage',
			'end'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'initialize' : self.model.setIsLoaded
			});
			self.trigger('initialize');
		},
		start : function(){
			$('.jsTutorialMain').show();
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : true,
				'text' : 'よし！お前の配属先も決まったところで、最後におさらいをするぞ！'
			});
			routing.trigger('waitAction');
		},
		renderReviewPage : function(){
			$('.jsTutorialMain').hide();
			$('.jsTutorialReview').show();
			$('#jsTutorial').css('height', 'auto');
			routing.trigger('waitInput');
		},
		end : function(){
			$('.jsTutorialReview').hide();
			$('#jsTutorial').css('height', '480px');
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
