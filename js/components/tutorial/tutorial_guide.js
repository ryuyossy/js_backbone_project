define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '.jsTutorialCommon',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('render', self.renderMessage);
			self.trigger('initialize');
		},
		renderGerge : function(current_step, max_step){
			$('.jsTutorialGergeNum').text(current_step + '/' + max_step);
			$('.jsTutorialGergeBar').css({'width' : current_step + '0%'});
		},
		render : function(option){
			var self = this;
			var characters = [
				'navico', 'elder'
			];
			var $btnS = $('.jsTutorialButtonSingle');
			var $el = $('.jsTutorialGuideMain, .jsTutorialGuideCharacter');
			_.without(characters, option.character);
			_.each(characters, function(character){
				$el.removeClass(character);
			});
			$el.addClass(option.character);
			if( option.exist_button ){
				if( _.isString(option.exist_button) ){
					$btnS.text(option.exist_button);
				} else {
					$btnS.text('次へ進む');
				}
				$('.jsTutorialProceed').hide();
				$btnS.show();
			} else {
				$('.jsTutorialProceed').show();
				$btnS.hide();
			}
			$('.jsTutorialGuide').show();
			self.$el.show();
			$('.jsTutorialGuideMessage').html(option.text);
			self.trigger('render', $('.jsTutorialGuideMessage'), option.text);
		},
		renderMessage : function($el, msg, count){
			count = count || 0;
			var self = this;
			var text = msg.substring(0, count);
			if( text.slice(-1)==='<' ) text = text.slice(0, -1);
			$el.html(text);
			count += 5;
			var rep = setTimeout(function(){
				if(count > msg.length + 5) return;
				self.renderMessage($el, msg, count)
			}, 50);
		},
		hide : function(){
			$('.jsTutorialButtonSingle').hide();
			$('.jsTutorialGuide').hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});



