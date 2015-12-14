define(function(){
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		model : new Model(),
		events : {
			'touch .jsCounterDecrement, .jsCounterIncrement' : 'getElementData',
			'change .jsCounterNum' : 'validateCounterNum'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('changeNum', self.renderNum);
			self.on('changeNum', self.changeButton);
			self.trigger('initialize');
		},
		getElementData : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			var $jsCounter = $el.parents('.jsCounter');
			var max = $jsCounter.attr('data-max') - 0;
			var $num = $jsCounter.find('.jsCounterNum');
			var num = $num.val() - 0;
			if( $el.hasClass('jsCounterDecrement') ){
				num--;
			} else if( $el.hasClass('jsCounterIncrement') ){
				num++;
			}
			self.model.set({
				$el : $jsCounter,
				max : max,
				$num : $num,
				num : num
			});
			self.trigger('changeNum');
		},
		renderNum : function(){
			var self = this;
			var $el = self.model.get('$el');
			var max = self.model.get('max');
			var $num = self.model.get('$num');
			var num = self.model.get('num');
			if( num >= max ){
				num = max;
			} else if( num <= 1 ){
				num = 1;
			}
			$num.val(num);
		},
		changeButton : function(){
			var self = this;
			var $el = self.model.get('$el');
			var num = self.model.get('num');
			var max = self.model.get('max');
			$el.find('.jsCounterIncrement, .jsCounterDecrement')
				.removeClass('disable');
			if( num >= max ){
				self.model.set({num : num - 1}, {silent : true});
				$el.find('.jsCounterIncrement').addClass('disable');
			} else if( num <= 1 ){
				self.model.set({num : 1}, {silent : true});
				$el.find('.jsCounterDecrement').addClass('disable');
			}
		},
		validateCounterNum : function(e){
			var $el = $(e.currentTarget);
			var $jsCounter = $el.parents('.jsCounter');
			var max = $jsCounter.attr('data-max') - 0;
			var num = $el.val();
			if( !num.match(/^[1-9][0-9]*$/g) ){
				$el.val(1);
			} else if( num-0 > max ){
				$el.val(max);
			}
		}
	});
	return View;
});
