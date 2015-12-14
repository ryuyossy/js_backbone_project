requirejs.config({
	baseUrl : '../../js/',
	paths: {
		'dateformat' : 'lib/dateformat',
		'zepto' : 'lib/zepto.min',
		'lodash' : 'lib/lodash.min',
		'backbone' : 'lib/backbone-0.9.10-min',
		'rockstage' : 'lib/rockstage.min',
		'easel' : 'lib/easeljs-0.5.0.min',
		'tween' : 'lib/tweenjs-0.3.0.min',
		'movieclip' : 'lib/movieclip-0.5.0.min',
		'preload' : 'lib/preloadjs-0.2.0.min',
		'jquery.event.touch' : 'lib/jquery.event.touch',
		'backbone-helper' : 'lib/backbone-helper',
		'backbone-super' : 'lib/backbone-super',
		'jsrender' : 'lib/jsrender',
		'jsrender.helpers' : 'lib/jsrender.helpers',
		'underscore.deferred' : 'lib/underscore.deferred'
	},
	shim : {
		'dateformat' : {
			exports : 'DateFormat'
		},
		'zepto' : {
			exports : '$'
		},
		'lodash' : {
			exports : '_'
		},
		'backbone' : {
			deps : ['lodash', 'zepto'],
			exports : 'Backbone'
		},
		'rockstage' : {
			exports : 'RS'
		},
		'jquery.event.touch' : {
			deps : ['zepto'],
			exports : '$'
		},
		'backbone-super' : {
			deps : ['backbone'],
			exports : 'Backbone'
		},
		'backbone-helper' : {
			deps : ['backbone'],
			exports : 'Backbone'
		},
		'jsrender' : {
			deps : ['zepto'],
			exports : '$'
		},
		'jsrender.helpers' : {
			deps: ['jsrender']
		},
		'underscore.deferred' : {
			deps : ['lodash'],
			exports : '_'
		},
		'tween':{
			deps:['easel']
		},
		'movieclip':{
			deps:['easel','tween']
		},
		'preload':{
			deps:['easel']
		},
		'easel':{
			exports:'createjs'
		}
	}
});

require([
	'dateformat',
	'zepto',
	'lodash',
	'backbone',
	'rockstage',
	'jquery.event.touch',
	'backbone-helper',
	'backbone-super',
	'jsrender',
	'jsrender.helpers',
	'underscore.deferred',
	'easel','tween','movieclip','preload'
], function(
	DateFormat,
	$,
	_,
	Backbone,
	RS
){
	require([
		'common/router',
		'common/router-pages',
		'common/page',
		'common/popup',
		'common/tab',
		'common/list',
		'common/counter',
		'common/form',
		'common/button',
		'common/error',
		'common/user',
		'common/mainmenu',
		'common/loader',
		'common/timer',
		'common/short_tutorial'
	], function(RouterClass){
		var operator = new RouterClass.Operator({
			model : new RouterClass.Model()
		});
		var router_pages = operator.model.get('router_pages');
		_.extend(RouterClass.Router.prototype, router_pages, {
			operator : operator
		});
		new RouterClass.Router();
		Backbone.history.start();
	});
});
