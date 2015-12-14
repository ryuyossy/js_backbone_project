define([
	 'common/router'
], function(
	 RouterClass
){
	var operator = new RouterClass.Operator({
		model : new RouterClass.Model()
	});
	var router_pages = operator.model.get('router_pages');
	_.extend(RouterClass.Router.prototype, router_pages, {
		operator : operator
	});
	var Router = new RouterClass.Router();
	var Specs = function(){
		describe('Model', function(){
			describe('loadCommonTemplates', function(){
				var self = this;
				beforeEach(function(){
					self.stubs = {
						 insertCommonTemplate : sinon.stub(operator, 'insertCommonTemplate')
						,loadPage             : sinon.stub(operator, 'loadPage')
					};
					self.spy = sinon.spy();
					operator.model.set({ template : null });
					operator.model.off('change:template');
				});
				afterEach(function(){
					_.each(self.stubs, function(stub){
						stub.restore();
					});
					operator.model.on({
						 'change:template' : operator.insertCommonTemplate
						,'change:template' : operator.loadPage
					});
				});
				it('共通テンプレートの読み込みが完了したらtemplateプロパティにsetする', function(){
					runs(function(){
						operator.model.loadCommonTemplates();
					});
					waits(200);
					runs(function(){
						expect(operator.model.get('template')).toBeTruthy();
					});
				});
				it('共通テンプレートの読み込みに失敗したらtemplateプロパティ何もsetされない', function(){
					var isError = undefined;
					var fakeResult = (function(){
						var data = {
							 status : 404
							,errors : '404 not found'
							,redirect_url : '/'
						};
						var dfd = new _.Deferred();
						dfd.reject(data);
						return dfd.promise();
					})();
					self.stubs.loadTemplate = sinon.stub(operator.model, 'loadTemplate')
					self.stubs.loadTemplate.returns(fakeResult);
					runs(function(){
						_.when(operator.model.loadCommonTemplates())
						.then(
							 function(){ isError = false; }
							,function(){ isError = true; }
						);
					});
					waits(200);
					runs(function(){
						expect(operator.model.get('template')).toBe(null);
					});
				});
			});

			describe('loadTemplate', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy($, 'ajax');
					self.xhr = sinon.useFakeXMLHttpRequest();
					self.requests = [];
					self.xhr.onCreate = function(xhr){
						self.requests.push(xhr);
					};
				});
				afterEach(function(){
					self.spy.restore();
					self.xhr.restore();
				});
				it('非同期でテンプレートの読み込みが行える', function(){
					var isError = undefined;
					var type = 'list';
					runs(function(){
						_.when(operator.model.loadTemplate(type))
						.then(
							 function(){ isError = false; }
							,function(){ isError = true; }
						);
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waitsFor(function(){
						return isError != undefined;
					}, '非同期通信', 200);
					runs(function(){
						expect(isError).toBeFalsy();
					});
				});
				it('テンプレートの読み込みに失敗したらエラーが発生する', function(){
					var isError = undefined;
					var type = 'list';
					runs(function(){
						_.when(operator.model.loadTemplate(type))
						.then(
							 function(){ isError = false; }
							,function(){ isError = true; }
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return isError != undefined;
					}, '非同期通信', 200);
					runs(function(){
						expect(isError).toBeTruthy();
					});
				});
			});
		});

		describe('Operator(View)', function(){
			describe('initialize', function(){
			});
			describe('bindLinks', function(){
				var self = this;
				beforeEach(function(){
					self.stubs = {
						 changeURL : sinon.stub(Router, 'changeURL')
						,backPage  : sinon.stub(Router, 'backPage')
					}
					self.$dataHref    = $('<button data-href="http://localhost"></button>');
					self.$backPage    = $('<button data-role="backpage"></button>');
					self.$naturalElem = $('<button id="bindLinksTest"></button>');
					$('body').append(self.$dataHref)
						.append(self.$backPage)
						.append(self.$naturalElem);
				});
				afterEach(function(){
					_.each(self.stubs, function(stub){
						stub.restore();
					});
					Router.off('backPage');
					Router.on('backPage', Router.backPage);
					self.$dataHref.remove();
					self.$backPage.remove();
					self.$naturalElem.remove();
				});
				// XXX: テスト通らない
				it('data-href属性を持つリンクをタップしたら画面を遷移させる', function(){
					var stub = self.stubs.changeURL;
					self.$dataHref.trigger('touch');
					expect(stub).toHaveBeenCalled();
				});
				it('data-href属性を持たない要素をタップしたら何もしない', function(){
					var stub = self.stubs.changeURL;
					self.$naturalElem.trigger('touch');
					expect(stub).not.toHaveBeenCalled();
				});
				// Router.backpageをスタブ化できていない
				// it('data-role=backpageを持つ要素をタップしたらページを戻る', function(){
				// 	var stub = self.stubs.backPage;
				// 	$('button[data-role=backpage]').trigger('touch');
				// 	expect(stub).toHaveBeenCalledOnce();
				// });
			});

			describe('initCommonParts', function(){
				beforeEach(function(){
					operator.model.set({
						 loader   : null
						,mainmenu : null
						,button   : null
						,user     : null
					});
					operator.initCommonParts();
				});
				it('loaderプロパティにLoaderクラスのインスタンスをsetする', function(){
					var loader = operator.model.get('loader');
					expect(loader).toBeDefined();
				});
				it('mainmenuプロパティにMainmenuクラスのインスタンスをsetする', function(){
					var mainmenu = operator.model.get('mainmenu');
					expect(mainmenu).toBeDefined();
				});
				it('buttonプロパティにButtonクラスのインスタンスをsetする', function(){
					var button = operator.model.get('button');
					expect(button).toBeDefined();
				});
				it('userプロパティにUserクラスのインスタンスをsetする', function(){
					var user = operator.model.get('user');
					expect(user).toBeDefined();
				});
			});

			// mainmenuへのイベントを設定しているがmainmenuがクロージャ内変数のためテストできず
			describe('bindEvents', function(){
			});

			describe('setRouterPages', function(){
				beforeEach(function(){
					operator.model.set({
						router_pages : null
					});
					operator.setRouterPages();
				});
				it('router_pagesプロパティにルーティング情報をsetする', function(){
					expect(operator.model.get('router_pages')).toBeDefined();
				});
				// TODO: RouterPages[key]で行われる処理に対してもテストするべき
			});
			// 実行されるコンテキストがよくわからないので後回し
			describe('makeQuery', function(){
			});
			describe('loadPage', function(){
				// var self = this;
				// beforeEach(function(){
				// 	operator.model.set({
				// 		page : {
				// 			path : 'pages/mypage'
				// 			,url : 'mypage/'
				// 		}
				// 		,template : ''
				// 	});
				// 	self.spy =  sinon.spy();
				// 	operator.off('loadPage');
				// });
				// afterEach(function(){
				// 	self.spy.restore();
				// 	operator.on('loadPage', operator.unsetTicker);
				// 	operator.on('loadPage', operator.initPage);
				// 	operator.on('loadPage', operator.bindPageEvents);
				// });
				// it('templateプロパティがsetされていればloadPageイベントが発火する', function(){
				// 	operator.on('loadPage', self.spy);
				// 	runs(function(){
				// 		operator.loadPage();
				// 	});
				// 	waits(100);
				// 	runs(function(){
				// 		expect(self.spy).toHaveBeenCalled();
				// 	});
				// });
			});
			describe('initPage', function(){

			});
			describe('bindPageEvents', function(){

			});
			describe('changeURL', function(){

			});
			describe('insertCommonTemplate', function(){

			});
			describe('unsetTicker', function(){

			});
			describe('setTicker', function(){

			});
		});

		describe('Router', function(){
			it('定義されている', function(){
				expect(Router).toBeDefined();
			});
			describe('urls', function(){
				it('定義されている', function(){
					expect(Router.urls).toBeDefined();
				});
			});
			describe('routes', function(){
				it('定義されている', function(){
					expect(Router.routes).toBeDefined();
				});
			});
			// describe('initializeイベント', function(){
			// 	var self = this;
			// 	beforeEach(function(){
			// 		self.callbacks = Router.getCallbacks('initialize');
			// 		self.stubs = {
			// 			 setURLs               : sinon.stub(Router, 'setURLs')
			// 			,bindLinks             : sinon.stub(Router, 'bindLinks')
			// 			,initializeCommonParts : sinon.stub(Router, 'initializeCommonParts')
			// 		};
			// 		Router.off('initialize');
			// 	});
			// 	afterEach(function(){
			// 		_.each(self.stubs, function(stub){
			// 			stub.restore();
			// 		});
			// 		Router.off('initialize');
			// 		Router.on('initialize', Router.setURLs);
			// 		Router.on('initialize', Router.bindLinks);
			// 		Router.on('initialize', Router.initializeCommonParts);
			// 	});
			// 	it('setURLs()を紐付け', function(){
			// 		var stub = self.stubs.setURLs;
			// 		Router.on('initialize', stub);
			// 		Router.trigger('initialize');
			// 		expect(stub).toHaveBeenCalledOnce();
			// 	});
			// 	it('setLinkEvents()を紐付け', function(){
			// 		var stub = self.stubs.bindLinks;
			// 		Router.on('initialize', stub);
			// 		Router.trigger('initialize');
			// 		expect(stub).toHaveBeenCalledOnce();
			// 	});
			// 	it('initializeCommonParts()を紐付け', function(){
			// 		var stub = self.stubs.initializeCommonParts;
			// 		Router.on('initialize', stub);
			// 		Router.trigger('initialize');
			// 		expect(stub).toHaveBeenCalledOnce();
			// 	});
			// });
			describe('setURLs', function(){
				it('urlsのキーとバリューをroutesの逆にする', function(){
					var urls = Router.urls;
					var routes = Router.routes;
					var isReverse = true;
					_.each(urls, function(v, k){
						if( k !== routes[k] ){
							isReverse = false;
							return false;
						}
					});
					expect(isReverse).toBeTruthy();
				});
			});
			describe('bindEvents', function(){
			});
			describe('changeURL', function(){
				var self = this;
				beforeEach(function(){
					self.stubs = {
						 unsetTicker  : sinon.stub(operator, 'unsetTicker')
						,navigate     : sinon.stub(Router, 'navigate')
						,showNotFound : sinon.stub(Router, 'showNotFound')
					};
					Router.off('navigate');
					Router.on('navigate', self.stubs.unsetTicker);
					Router.off('notFound');
					Router.on('notFound', self.stubs.showNotFound);
				});
				afterEach(function(){
					Router.navigate('', {trigger: false});
					_.each(self.stubs, function(stub){
						stub.restore();
					});
					Router.off('navigate');
					Router.on('navigate', Router.unsetTicker);
					Router.off('notFound');
					Router.on('notFound', Router.showNotFound);
				});
				it('URLのハッシュを対応する文字列に書き換える', function(){
					var stub = self.stubs.navigate;
					Router.changeURL('Mypage');
					expect(stub).toHaveBeenCalledOnce();
					expect(stub).toHaveBeenCalledWith('mypage/');
				});
				it('対応するハッシュが存在しなければnotFoundイベントが発火', function(){
					var showNotFound = self.stubs.showNotFound;
					var unsetTicker  = self.stubs.unsetTicker;
					Router.changeURL('HogeFugaPiyo');
					expect(showNotFound).toHaveBeenCalledOnce();
					expect(unsetTicker).not.toHaveBeenCalled();
				});
			});
			// ブラウザのヒストリーバックをラップしているだけなのでテストしない
			describe('backPage', function(){});
			describe('showNotFound', function(){
				var self = this;
				beforeEach(function(){
					self.stub = sinon.stub(Router, 'changeURL');
				});
				afterEach(function(){
					self.stub.restore();
				});
				it('404ページへ遷移する', function(){
					Router.showNotFound();
					expect(self.stub).toHaveBeenCalledWith('404/', true);
				});
			});
		});
	};
	return Specs;
});
