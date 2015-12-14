define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			$('#globalHeader').hide();
			$('#globalFooter').hide();
			var frmId = getFrmId();
			if (frmId.length > 0) {
				$link = $('a.toMypage');
				$link.attr('href', $link.attr('href') + '?frm_id=' + frmId);
			}
		}
	});
	var getFrmId = function() {
		var tokens = location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		var values = _.filter($(tokens), function(s){
			return s.indexOf('frm_id=') != -1;
		}).map(function(s){
			var pair = s.split('=');
			return pair.length > 1 ? pair[1] : '';
		});
		return values.length > 0 ? values[0] : '';
	}
	return {
		Model : Model,
		View : View
	};
});