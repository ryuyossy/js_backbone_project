module.exports = function(grunt) {
	//prod用ディレクトリ
	var prod_dir = '../dist';

	//Flash Toolkit for CreateJSで書き出してぁったファイル群から
	//AMDモジュールを書き出す
	grunt.registerTask('createjs', function() {
		var fs = require('fs');
		var path = require('path');

		var srcPath = 'createjs/';
		var destPath = './';

		grunt.file.expandFiles( srcPath + '/**/*.html' ).forEach(function(file,n){
			//書き出してぁったhtmlのインラインスクリプトから画像プリロード情報だけ抜き出す
			var htmlSrc = grunt.file.read(file);

			var scripts = htmlSrc.match(/<script>([\s\S]*?)<\/script>/g);
			var targetScript = scripts[scripts.length - 1];

			//これがプリロードする画像の情報が入った配列(manifest)
			var manifest = targetScript.match(/var\smanifest\s\=\s(\[[\s\S]*?\])/)[1];

			//canvas要素タグ
			var canvasElement = htmlSrc.match(/<canvas([\s\S]*?)<\/canvas>/g)[0];

			//書き出してぁったjs (createjsのlib情報のすべて)
			var jsSrc = grunt.file.read(file.replace(/\.html$/,".js"));

			//元のjsをAMDモジュール形式で書き出し
			var filename = path.basename(file, ".html");
			var avatars = [
				"00001","00002","10001","10002","11001","11002","12001","12002","13001","13002","13003",
				"20001","20002","21001","21002","21003","22001","22002","23001","23002","30001","30002",
				"31001","31002","31003","32001","32002","33001","33002"
			];
			if(filename == 'battle'){
				//バトル待機アニメゎ更に分割が必要
				var types = ["leader","sub","down"];
				var prefixes = {
					leader: ["leader", "cha"],
					sub: ["sub","sub_cha"],
					down : ["down_cha"]
				};
				avatars.forEach(function(avatar_id){
					types.forEach(function(type){
						var mcSrc = '';
						prefixes[type].forEach(function(prefix){
							var regex = new RegExp('^\\(lib\\.' + prefix + avatar_id + '(.|\n)+?Rectangle\\(.+?\\);\n\n\n', 'gm');
							jsSrc = jsSrc.replace(regex,function(mc){
								mcSrc += mc;
								return '';
							});
						});
						mcSrc = mcSrc.replace(/^(.)/gm, "\t\t\t$1");

						var max = "define(function(){\r\n"
								+ "\tvar Data = {\r\n\t\t"
								+ "lib: {},\r\n\t\t"
								+ "initialize: function(img, createjsJson, createjs){\r\n"
								+ "\t\t\t(function (lib, img, cjs) {\r\n"
								+ "\t\t\tvar p = new cjs.MovieClip();\r\n"
								+ mcSrc
								+ "\t\t\t})(lib = lib||{}, img = img||{}, createjs = createjs||{});\r\n"
								+ "\t\t\tvar lib, img, createjs;"
								+ "this.lib = lib;\r\n"
								+ "\r\n\t\t}\r\n\t};\r\nreturn Data;\r\n});";

						var min = grunt.helper('uglify', max, grunt.config('uglify'));
						grunt.file.write(destPath + 'js/createjs/battle_' + type + avatar_id + '.js', min);
						grunt.helper('min_max_info', min, max);
					});
				});
				jsSrc = jsSrc.replace(/this\.instance\s(.|\n)+?}\)\.prototype/m, "}).prototype");
				jsSrc = jsSrc.replace(/^(.)/gm, "\t\t\t$1");
				jsSrc = jsSrc.replace(/lib = lib\|\|\{\}/, "lib = this.lib");
			}else if(/questboss/.test(filename)){
				//クエストボスアニメも更に分割が必要
				var generate_mc_js = (filename == 'questboss_avatars');

				avatars.forEach(function(avatar_id){	
					var mcSrc = '';
					var regex = new RegExp('^\\(lib\\.id' + avatar_id + '(.|\n)+?Rectangle\\(.+?\\);\n\n\n', 'gm');
					jsSrc = jsSrc.replace(regex,function(mc){
						if(generate_mc_js) mcSrc += mc;
						return '';
					});

					if(generate_mc_js){
						mcSrc = mcSrc.replace(/^(.)/gm, "\t\t\t$1");
						var max = "define(function(){\r\n"
								+ "\tvar Data = {\r\n\t\t"
								+ "lib: {},\r\n\t\t"
								+ "initialize: function(img, createjsJson, createjs, lib){\r\n"
								+ "\t\t\t(function (lib, img, cjs) {\r\n"
								+ "\t\t\tvar p = new cjs.MovieClip();\r\n"
								+ mcSrc
								+ "\t\t\t})(lib = lib||{}, img = img||{}, createjs = createjs||{});\r\n"
								+ "\t\t\tvar lib, img, createjs;"
								+ "this.lib = lib;\r\n"
								+ "\r\n\t\t}\r\n\t};\r\nreturn Data;\r\n});";

						var min = grunt.helper('uglify', max, grunt.config('uglify'));
						grunt.file.write(destPath + 'js/createjs/questboss_id' + avatar_id + '.js', min);
						grunt.helper('min_max_info', min, max);
					}
				});
				
				jsSrc = jsSrc.replace(/\/\/\slinkage(.|\n)+?}\)\.prototype/m, "}).prototype");
				jsSrc = jsSrc.replace(/^(.)/gm, "\t\t\t$1");
				jsSrc = jsSrc.replace(/lib = lib\|\|\{\}/, "lib = this.lib");
			}

			var max = "define(function(){\r\n"
					+ "\tvar Data = {\r\n\t\t"
					+ "lib: {},\r\n\t\t"
					+ "initialize: function(img, createjsJson, createjs){\r\n"
					+ jsSrc
					+ "this.lib = lib;\r\n"
					+ "\r\n\t\t}\r\n\t};\r\nreturn Data;\r\n});";

			var min = grunt.helper('uglify', max, grunt.config('uglify'));
			grunt.file.write(destPath + 'js/createjs/' + filename + '.js', min);
			grunt.helper('min_max_info', min, max);

			//Manifestの配列とElementの入ったモジュールをAMD形式で書き出し
			var dist = fs.openSync(destPath + 'js/createjs/' + path.basename(file, ".html") + '_manifest.js','w+');
			fs.writeSync(dist, "define(function(){");
			fs.writeSync(dist, "\r\nreturn{");
			fs.writeSync(dist, "\r\n\tManifest : " + manifest + ",");
			fs.writeSync(dist, "\r\n\tElement : '" + canvasElement + "'");
			fs.writeSync(dist, "\r\n}\r\n});");
			fs.closeSync(dist);

			//ログでぉしらせする
			grunt.log.writeln("CreateJS:" + file + " has converted.");
		});
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerHelper('gzipFiles',function(){
		var gzip = {};
		var ext = ["js","html","css"];

		ext.forEach(function(ext){
			grunt.file.expandFiles(prod_dir + './**/*.' + ext).forEach(function(file,n){
				gzip[file] = file;
			});
		});
		return gzip;
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerHelper('copyFiles',function(){
		var copy = {};
		var dir = ["tmpl","img"];

		dir.forEach(function(dir){
			copy[prod_dir + '/' +  dir + '/'] = dir + '/**';
		});

		copy[prod_dir + '/js/lib/require.min.js'] = 'js/lib/require.min.js';

		grunt.file.expandFiles( 'js/createjs/**/*.js' ).forEach(function(file,n){
			var match = 'js/createjs/';
			var replace = prod_dir + '/js/createjs/';
			copy[file.replace(match,replace)] = file;
		});

		return copy;
	});

	grunt.registerHelper('createjsFiles',function(){
		var min = {};
		var dir = ["createjs"];
		var path = require('path');
		var s = path.sep;

		dir.forEach(function(dirname){
			grunt.file.expandFiles('./js/' + dirname + '/**/*.js').forEach(function(file,n){
				var match = 'js/' + dirname + '/';
				var replace = prod_dir + '/js/' + dirname + '/';
				min[file] = {
					src : [file],
					dest : file.replace(match, replace)
				};
			});
		});
		return min;
	});

	grunt.registerHelper('minFiles',function(){
		var min = {};
		var dir = ["components", "pages"];
		var path = require('path');
		var s = path.sep;

		dir.forEach(function(dirname){
			grunt.file.expandFiles('./js/' + dirname + '/**/*.js').forEach(function(file,n){
				var match = 'js/' + dirname + '/';
				var replace = prod_dir + '/js/' + dirname + '/';
				min[file] = {
					src : [file],
					dest : file.replace(match, replace)
				};
			});
		});
		return min;
	});

	grunt.registerHelper('jsPages',function(){
		var pages = [{
						name: 'index',
						include: [
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
							'easel','tween','movieclip','preload',
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
						]
					}];
		var path = require('path');
		var s = path.sep;
		var dirname = 'pages';
		
		grunt.file.expandFiles('./js/' + dirname + '/**/*.js').forEach(function(file,n){
			pages.push({
				name : file.replace(/^.+(pages.+)\.js$/, '$1'),
				exclude: ['index']
			});
		});		
		return pages;
	});


	grunt.loadNpmTasks('grunt-compass');

	//PagesとComponentsのRequireJS依存関係をindex.htmlに保持するためのタスク
	var deps = [];
	grunt.registerTask('writedeps', function() {
		var arr = [];
		deps.forEach(function(dep){
			if(dep.components.length == 0) return;
			arr.push('"' + dep.page + '":["' + dep.components.join('","') + '"]');
		});
		var html = grunt.file.read('./index.html');
		html = html.replace(/<script id="deps"><\/script>/m, '<script id="deps">deps={' + arr.join(',') + '}</script>');
		grunt.file.write(prod_dir + '/index.html', html);
		grunt.log.writeln("Pages & Components dependencies were written on index.html");
	});

	grunt.loadNpmTasks('grunt-requirejs');

	grunt.initConfig({
		copy: {
			dist: {
				files: grunt.helper('copyFiles')
			}
		},
		min:grunt.helper('minFiles'),
		compass: {
			dev: {
				src: './scss',
				dest: './css',
				linecomments: true,
				forcecompile: true,
				debugsass: false,
				images: './img',
				relativeassets: true
			},
			prod: {
				src: './scss',
				dest: prod_dir + '/css',
				outputstyle: 'compressed',
				linecomments: false,
				forcecompile: true,
				debugsass: false,
				images: './img',
				relativeassets: true
			}
		},
		requirejs: {
			baseUrl: './js/',
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
				'backbone-super' : 'lib/backbone-super',
				'backbone-helper' : 'lib/backbone-helper',
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
			},
			dir: prod_dir + '/js/',
			modules: grunt.helper('jsPages'),
			pragmas: {
				doExclude: true
			},
			skipModuleInsertion: false,
			optimizeAllPluginResources: false,
			findNestedDependencies: false,
			onBuildWrite:function(moduleName, path, contents) {
				if(/^pages/.test(moduleName)){
					deps.push({
						page : moduleName.replace('pages/',''),
						components : []
					});
				}
				if(/^components/.test(moduleName)){
					deps[deps.length - 1].components.push(moduleName.replace('components/',''));
				}
				return contents;
			}
		},
		compress:{
			gzip:{
				options:{
					mode:'gzip'
				},
				files: grunt.helper('gzipFiles')
			}
		},
		watch : {
			scss : {
				files : [
					'scss/**/*.scss'
				],
				tasks : 'compass:dev'
			}
		}
	});

	grunt.registerTask('dev', 'compass-clean compass:dev');
	grunt.registerTask('prod', 'copy requirejs writedeps compass-clean compass:prod');
	grunt.registerTask('gzip', 'compress:gzip');
	grunt.registerTask('canvas', 'createjs min:createjs');
};