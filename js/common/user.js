define([
	'zepto',
	'lodash',
	'backbone',
	'backbone-helper'
], function(
	$,
	_,
	Backbone,
	helper
){
	return Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('change', self.saveStorage);
			self.on('initialize', self.loadStorage);
			self.trigger('initialize');
		},
		saveStorage : function(){
			RS.put({
				'user' : this.attributes
			}, false);
		},
		loadStorage : function(){
			this.attributes = RS.get('user', false) || {};
		},
		removeStorage : function(){
			this.clear();
			RS.remove('user', false);
		}
	});
});