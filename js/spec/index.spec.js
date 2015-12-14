requirejs.config({
	baseUrl : '../../js/',
	paths : {
		'zepto' : 'lib/zepto.min',
		'lodash' : 'lib/lodash.min',
		'backbone' : 'lib/backbone-0.9.10-min',
		'easel' : 'lib/easeljs-0.5.0.min',
		'tween' : 'lib/tweenjs-0.3.0.min',
		'movieclip' : 'lib/movieclip-0.5.0.min',
		'preload' : 'lib/preloadjs-0.2.0.min',
		'backbone-helper' : 'lib/backbone-helper',
		'backbone-super' : 'lib/backbone-super',
		'jsrender' : 'lib/jsrender',
		'jsrender.helpers' : 'lib/jsrender.helpers',
		'underscore.deferred' : 'lib/underscore.deferred',
		'jasmine' : 'lib/jasmine-1.2.0/jasmine',
		'jasmine-html' : 'lib/jasmine-1.2.0/jasmine-html',
		'sinon' : 'lib/sinon-1.5.0',
		'jasmine-sinon' : 'lib/jasmine-sinon',
		'jasmine-jquery' : 'lib/jasmine-jquery',
		'rockstage': 'lib/rockstage.min'
	},
	shim : {
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
		},
		'backbone-helper' : {
			deps : ['lodash', 'backbone'],
			exports : 'Backbone'
		},
		'backbone-super' : {
			deps : ['lodash', 'backbone'],
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
		'jasmine' : {
			exports: 'jasmine'
		},
		'jasmine-html' : {
			deps: ['jasmine'],
			exports: 'jasmine'
		},
		'sinon' : {
			exports: 'sinon'
		},
		'jasmine-sinon' : {
			deps: ['jasmine', 'sinon']
		},
		'jasmine-jquery' : {
			deps: ['jasmine']
		},
		'rockstage' : {
			exports: 'RS'
		}
	}
});

require([
	'zepto',
	'lodash',
	'backbone',
	'jasmine-html',
	'sinon',
	'rockstage',
	'backbone-helper',
	'backbone-super',
	'jasmine-sinon',
	'jasmine-jquery',
	'jsrender',
	'underscore.deferred',
	'common/router'
], function(
	$,
	_,
	Backbone,
	jasmine,
	sinon,
	RS
){
	// init jasmine
	var jasmineEnv = jasmine.getEnv();
	(function() {
		jasmineEnv.updateInterval = 1000;
		var htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);
		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};
	})();

	require([
		// 'spec/lib/backbone-helper.spec',
		'spec/common/router.spec',
		'spec/common/page.spec',
		'spec/common/popup.spec'
		// 'spec/pages/mypage.spec',
	], function(
		// BackboneHelperSpec,
		RouterSpec,
		PageSpec,
		PopupSpec
		// MypageSpec
	){
		// Backbone.history.start();
		// describe('BackboneHelper クラス', function(){
		// 	console.log("backboneHelperClass");
		// 	BackboneHelperSpec();
		// });
		describe('Router クラス', function(){
			console.log('RouterClass');
			RouterSpec();
		});
		describe('Page クラス', function(){
			console.log("PageClass");
			PageSpec();
		});
		describe('Popup クラス', function(){
			console.log('PopupClass');
			PopupSpec();
		});
		// describe('Mypage クラス', function(){
		// 	MypageSpec();
		// });
		// run spec
		jasmine.getEnv().execute();
	});

});






