define([
	'components/battle/gauge_canvas'
], function(
	GaugeCanvas
){
	var Model = GaugeCanvas.Model;
	var View = GaugeCanvas.View.extend({
		next: function(){
			$('#whiteOut').removeClass('start');
			this.animation.trigger('endAnimation');
		}
	});

	return {
		Model : Model,
		View : View
	};
});