define([
	'components/common/canvas'
], function(
	Canvas
	){
	var Model = Canvas.Model.extend({

	});
	var power;
	var View = Canvas.View.extend({
		el : "#fullScreen",
		load : function(){
			var self = this;
			var page_data = this.model.get('page_data') || this.page.model.get('page_data');
			var name = 'gauge';

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(Manifest){
					self.model.set({
						createjsJson : page_data,
						manifest : Manifest.Manifest,
						name : name
					});
				}
			);
		},
		setExportRoot : function(){
			this._super();
			$('body').on('touchstart', this.stop);
		},
		stop : function(){
			$('body').off('touchstart', this.stop);
			var root = this.exportRoot;
			root.looper.stop();
			var frame = root.looper.timeline.position + 1;
			power = ((frame > 10) ? 20 - frame : frame) * 10;
			if(power == 100) root.onmax.gotoAndPlay(1);
			root.btn.gotoAndPlay("push");
			var $white_out = $('#whiteOut');
			$white_out.addClass('start');
			_.delay(this.next, 910);
		},
		next: function(){
			this.page.model.user.set('power', power);
			var url = '#battle/' + this.page.model.user.get('command') + '/';
			this.page.trigger('changeURL', url, true);
		}
	});

	return {
		Model : Model,
		View : View
	};
});