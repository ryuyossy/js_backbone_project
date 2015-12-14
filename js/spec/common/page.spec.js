define([
	'common/page',
	'common/popup',
	'common/tab',
	'common/list',
	'common/counter',
	'common/form',
	'common/error',
	'common/timer',
	'common/animation',
	'rockstage'
], function(
	PageClass,
	PopupClass,
	TabClass,
	ListClass,
	CounterClass,
	FormClass,
	ErrorClass,
	TimerClass,
	AnimationClass,
	RS
){
	var Specs = function(){
		describe('Model', function(){
			var Page = new PageClass.View({
				model : new PageClass.Model()
			});
			describe('initialize', function(){
				it('インスタンス生成時にinitializeイベントが発火しているか確認', function(){
					var stub = sinon.stub(
						PageClass.Model.prototype,
						'trigger'
					);
					new PageClass.Model();
					expect(stub).toHaveBeenCalledWith('initialize');
					stub.restore();
				});
			});
			describe('checkForm', function(){
				var self = this;
				beforeEach(function(){
					self.formTarget = 'EquipSellList';
					RS.put({
						form_target : self.formTarget,
						form_data   : {
							user_equip_nos : [ 1234567890 ]
						}
					}, false);
					Page.model.set({
						id : 'EquipSellList'
					});
					self.stubs = {
						 loadFirst      : sinon.stub(Page.model, 'loadFirst')
						,removeFormData : sinon.stub(Page.model, 'removeFormData')
						,redirect       : sinon.stub(Page, 'redirect')
					};
					Page.model.off('checkForm');
					Page.model.on('checkForm', self.stubs.loadFirst);
					Page.model.off('proveUnequalFormTarget');
					Page.model.on('proveUnequalFormTarget', self.stubs.removeFormData);
					Page.model.off('proveNoFormData');
					Page.model.on('proveNoFormData', self.stubs.redirect);
				});
				afterEach(function(){
					_.each(self.stubs, function(stub){
						stub.restore();
					});
				});
				it('form_target, form_dataが正常にあればcheckFormイベントが発火する', function(){
					Page.model.checkForm();
					expect(self.stubs.redirect).not.toHaveBeenCalled();
					expect(self.stubs.removeFormData).not.toHaveBeenCalled();
					expect(self.stubs.loadFirst).toHaveBeenCalledOnce();
				});
				it('targetが正しくない場合はproveUnequalFormTargetイベントが発火する', function(){
					RS.put({ form_target : 'hogehoge' }, false);
					Page.model.checkForm();
					expect(self.stubs.redirect).not.toHaveBeenCalled();
					expect(self.stubs.removeFormData).toHaveBeenCalledOnce();
					expect(self.stubs.loadFirst).toHaveBeenCalledOnce();
				});
				it('リダイレクトが設定されform_dataが空の場合はproveNoFormDataが発火する', function(){
					RS.put({ form_data : '' }, false);
					Page.model.set({ redirect_url: 'http://localhost' });
					Page.model.checkForm();
					expect(self.stubs.redirect).toHaveBeenCalled();
					expect(self.stubs.removeFormData).not.toHaveBeenCalled();
					expect(self.stubs.loadFirst).not.toHaveBeenCalled();
				});
			});
			describe('checkPost', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy();
					Page.model.off('provePOST');
					Page.model.on('provePOST', self.spy);
				});
				afterEach(function(){
					Page.model.off('provePOST');
					Page.model.on('provePOST', Page.model.replaceFormData);
					Page.model.on('provePOST', Page.model.removeFormData);
				});
				it('POSTの場合はprovePOSTイベントを発火', function(){
					Page.model.set({
						ajax_type : 'POST'
					}, false);
					Page.model.checkPost();
					expect(self.spy).toHaveBeenCalledOnce();
				});
				it('post(小文字)の場合もprovePOSTイベントを発火', function(){
					Page.model.set({
						ajax_type : 'post'
					}, false);
					Page.model.checkPost();
					expect(self.spy).toHaveBeenCalledOnce();
				});
				it('GET(POST以外)の場合はprovePOSTイベントは発火しない', function(){
					Page.model.set({
						ajax_type : 'GET'
					}, false);
					Page.model.checkPost();
					expect(self.spy).not.toHaveBeenCalled();
				});
			});
			describe('replaceFormData', function(){
				var self = this;
				beforeEach(function(){
					self.formTarget =
						["ComposeBaseSelect", "ComposeSelectConfirm", "ComposeResult"];
					self.formData = {
						 material_no       : [ 1234567890 ]
						,material_type     : 1
						,total_compose_num : 1
						,user_equip_no     : "1350268201200"
					};
					RS.put({
						 form_target : self.formTarget
						,form_data   : self.formData
					}, false);
				});
				it('モデルのデータをストレージのデータに置き換える', function(){
					var formData   = self.formData;
					Page.model.replaceFormData();
					expect(Page.model.get('form_target')).toEqual(self.formTarget);
					expect(Page.model.get('form_data')).toEqual(self.formData);
				});
			});
			describe('removeFormData', function(){
				it('ストレージのデータを消去', function(){
					Page.model.removeFormData();
					expect(RS.get('form_target', false)).not.toBeDefined();
					expect(RS.get('form_data', false)).not.toBeDefined();
				});
			});
			describe('setDummyFormData', function(){
				var self = this;
				beforeEach(function(){
					self.formTarget =
						["ComposeBaseSelect", "ComposeSelectConfirm", "ComposeResult"];
				});
				it('form_targetが配列ならストレージにダミーデータを入れる', function(){
					Page.model.setDummyFormData(self.formTarget);
					var formTarget = RS.get('form_target', false);
					var timestamp  = RS.get('form_data', false).timestamp;
					expect(formTarget).toEqual(self.formTarget);
					expect(timestamp).toMatch(/^[0-9]+$/);
				});
				it('form_targetが文字列ならストレージにダミーデータを入れる', function(){
					Page.model.setDummyFormData(self.formTarget[0]);
					var formTarget = RS.get('form_target', false);
					var timestamp  = RS.get('form_data', false).timestamp;
					expect(formTarget).toEqual(self.formTarget[0]);
					expect(timestamp).toMatch(/^[0-9]+$/);
				});
				it('form_targetが空の場合はエラーが投げられる', function(){
					var isError = undefined;
					try{
						Page.model.setDummyFormData();
					} catch(e) {
						isError = true;
					};
					expect(isError).toBeTruthy();
				});
			});
			describe('loadFirst', function(){
				var self = this;
				self.checkSpec = function(){
					var stub = self.stub;
					var event = self.event;
					var fakeResult = self.fakeResult();
					var callback = self.callback;
					stub.json.returns({
						"errors": 404
					});
					stub.template.returns(fakeResult);
					stub.css.returns(fakeResult);
					stub.common.returns(fakeResult);
					Page.model.off(event);
					Page.model.on(event, callback);
					Page.model.loadFirst();
					expect(callback).toHaveBeenCalledOnce();
					Page.model.off(event, callback);
					Page.model.set({
						data_path : '/mypage/get'
						,query    : {}
					});
					RS.put({
						timestamp : 1359425443
					}, false);
				};
				beforeEach(function(){
					self.callback = sinon.spy();
					self.stub = {
						json     : sinon.stub(Page.model, 'loadPageData'),
						template : sinon.stub(Page.model, 'loadPageTemplate'),
						css      : sinon.stub(Page.model, 'loadPageStyles'),
						common   : sinon.stub(Page.model, 'loadCommonData')
					};
				});
				afterEach(function(){
					self.callback = undefined;
					self.stub.json.restore();
					self.stub.template.restore();
					self.stub.css.restore();
					self.stub.common.restore();
				});
				it('ページ描画に必要な全通信が成功したらsucceedLoadingイベントを発火',
					function(){
						self.event = 'succeedLoading';
						self.fakeResult = function(){
							var dfd = new _.Deferred();
							dfd.resolve();
							return dfd.promise();
						};
						self.checkSpec();
					}
				);
				it('ページ描画に必要な通信のいずれかが失敗したらcatchErrorイベントを発火',
					function(){
						self.event = 'catchError';
						self.fakeResult = function(){
							var data = {
								status  : '404'
								,errors : '404 not found'
								,redirect_url : '/'
							};
							var dfd = new _.Deferred();
							dfd.reject(data);
							return dfd.promise();
						};
						self.checkSpec();
					}
				);
			});
			describe('getDataPath', function(){
				it('ローカル環境であればローカルのJSONのパスを返す', function(){
					var path = '/mypage/get';
					var expectPath = '/json' + path + '.json';
					expect(Page.model.getDataPath(path)).toEqual(expectPath);
				});
				// XXX: サーバ環境であれば引数に渡したパスそのものを返すが、テストできないので省略
			});
			describe('getRevisionNumber', function(){
				beforeEach(function(){
					window.rev = {
						 './css/ability.css'      : "62ddd4fed7"
						,'./css/battle.css'       : "3ba178c9ef"
						,'./css/collection.css'   : "493f8cb28a"
						,'./css/common_parts.css' : "469a074770"
					};
				});
				it('指定したパスが存在すればそのファイルのrevision番号を返す', function(){
					var path = '/css/ability.css';
					var revisionNumber = Page.model.getRevisionNumber(path);
					expect(revisionNumber).not.toBeNull();
					expect(revisionNumber).toBe('62ddd4fed7');
				});
				it('指定したパスが存在しなければnullを返す', function(){
					var path = '/css/test.css';
					var revisionNumber = Page.model.getRevisionNumber(path);
					expect(revisionNumber).toBeNull();
					expect(revisionNumber).not.toBe('62ddd4fed7');
				});
			});
			describe('loadPageData（通常時）', function(){
				var self = this;
				beforeEach(function(){
					self.data_path = '/mypage/get';
					Page.model.set({
						data_path : self.data_path
					});
					self.spy = sinon.spy($, 'ajax');
				});
				afterEach(function(){
					self.spy.restore();
				});
				it('APIを叩くとJSONを返す', function(){
					var json;
					runs(function(){
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(json).toBeDefined();
					});
				});
				it('ajax_typeが未指定の場合はGETになる', function(){
					var json;
					runs(function(){
						Page.model.set({
							ajax_type : ''
						});
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							type : 'GET'
						});
					});
				});
				it('ajax_typeにPOSTを指定できる', function(){
					var json;
					runs(function(){
						Page.model.set({
							ajax_type : 'POST'
						});
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							type : 'POST'
						});
					});
				});
				it('ajax_typeにpostと入れてもPOSTを指定できる', function(){
					var json;
					runs(function(){
						Page.model.set({
							ajax_type : 'post'
						});
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							type : 'POST'
						});
					});
				});
				it('dataにAPIリクエストパラメータを指定できる', function(){
					var json;
					runs(function(){
						Page.model.set({
							ajax_data : {
								hoo : 'hoohoo',
								bar : 'barbar'
							}
						});
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							data : {
								hoo : 'hoohoo',
								bar : 'barbar'
							}
						});
					});
				});
				it('dataTypeにjsonが指定されている', function(){
					var json;
					runs(function(){
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							dataType: 'json'
						});
					});
				});
				it('APIを叩いたときに返るJSONがローカルJSONファイルと一致する', function(){
					var json;
					var json_local;
					runs(function(){
						_.when(Page.model.loadPageData())
						.done(function(){
							json = Page.model.get('page_data');
						});
					});
					waitsFor(function(){
						return json;
					}, 'API通信完了', 500);
					runs(function(){
						$.ajax({
							url : '/json' + self.data_path + '.json',
							success : function(json){
								json_local = json;
							}
						});
					});
					waitsFor(function(){
						return json_local;
					}, 'ローカルJSONファイル読込完了', 500);
					runs(function(){
						expect(json).toEqual(json_local);
					});
				});
			});
			describe('loadPageData（異常時）', function(){
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
				it('非同期通信が失敗するとエラーになる', function(){
					runs(function(){
						self.is_error = undefined;
						_.when(Page.model.loadPageData())
						.then(
							function(){self.is_error = false;},
							function(){self.is_error = true;}
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
				it('APIを叩いたときに200以外のstatusが返るとエラーになる', function(){
					runs(function(){
						self.is_error = undefined;
						_.when(Page.model.loadPageData())
						.then(
							function(){self.is_error = false;},
							function(){self.is_error = true;}
						);
						self.requests[0].respond(200, {}, '{"status" : 404}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
			});
			describe('loadPageTemplate（通常時）', function(){
				var self = this;
				beforeEach(function(){
					self.template_path = '/tmpl/mypage.html';
					Page.model.set({
						template_path : self.template_path
					});
					self.spy = sinon.spy($, 'ajax');
					self.stub = sinon.stub(Page.model, 'getRevisionNumber');
					self.stub.returns({});
					runs(function(){
						self.json = undefined;
						_.when(Page.model.loadPageTemplate())
						.done(function(){
							self.template = Page.model.get('page_template');
						});
					});
					waitsFor(function(){
						return self.template;
					}, 'API通信完了', 500);
				});
				afterEach(function(){
					self.spy.restore();
					self.stub.restore();
				});
				it('テンプレートを読み込む', function(){
					expect(self.template).toBeDefined();
				});
				it('dataTypeにhtmlが指定されている', function(){
					expect(self.spy).toHaveBeenCalledWithMatch({
						dataType: 'html'
					});
				});
				it('読み込んだテンプレートが正しい', function(){
					runs(function(){
						$.ajax({
							url : self.template_path,
							success : function(template){
								self.template_local = template;
							}
						});
					});
					waitsFor(function(){
						return self.template_local;
					}, 'ローカルJSONファイル読込完了', 500);
					runs(function(){
						expect(self.template).toEqual(self.template_local);
					});
				});
			});
			describe('loadPageTemplate（異常時）', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy($, 'ajax');
					self.stub = sinon.stub(Page.model, 'getRevisionNumber');
					self.stub.returns({});
					self.xhr = sinon.useFakeXMLHttpRequest();
					self.requests = [];
					self.xhr.onCreate = function(xhr){
						self.requests.push(xhr);
					};
				});
				afterEach(function(){
					self.spy.restore();
					self.stub.restore();
					self.xhr.restore();
				});
				it('非同期通信が失敗するとエラーになる', function(){
					runs(function(){
						self.is_error = undefined;
						_.when(Page.model.loadPageTemplate())
						.then(
							function(){self.is_error = false;},
							function(){self.is_error = true;}
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
			});
			describe('loadPageStyles（通常時）', function(){
				var self = this;
				beforeEach(function(){
					self.stub = sinon.stub(Page.model, 'loadStyle');
					self.stub.returns({});
					Page.model.set({
						href : '/'
					});
				});
				afterEach(function(){
					self.stub.restore();
					$('head>style.page_style').remove();
				});
				it('スタイルを読み込む', function(){
					self.css_path = 'css/mypage.css';
					Page.model.set({
						style_path: self.css_path
					});
					self.is_error = undefined;
					Page.model.loadPageStyles()
					.then(
						function(){self.is_error = false;},
						function(){self.is_error = true;}
					);
					expect(self.is_error).toBe(false);
				});
				it('複数のスタイルを読み込む', function(){
					self.css_path = [
						 'css/mypage.css'
						,'css/mission.css'
						,'css/shop.css'
					];
					Page.model.set({
						style_path: self.css_path
					});
					self.is_error = undefined;
					Page.model.loadPageStyles()
					.then(
						function(){self.is_error = false;},
						function(){self.is_error = true;}
					);
					self.styleLength = $('head>style.page_style').length;
					expect(self.is_error).toBe(false);
					// common_parts.css is appended always, so length plus one
					expect(self.styleLength).toEqual(self.css_path.length + 1);
				});
			});
			describe('loadPageStyles（異常時）', function(){
				var self = this;
				beforeEach(function(){
					self.stub = sinon.stub(Page.model, 'loadStyle');
					self.stub.returns(new _.Deferred().reject());
					Page.model.set({
						href : '/'
					});
				});
				afterEach(function(){
					self.stub.restore();
					$('head>style.page_style').remove();
				});
				it('スタイルを読み込みに失敗した時', function(){
					self.css_path = 'css/mypage.css';
					Page.model.set({
						style_path: self.css_path
					});
					self.is_error = undefined;
					Page.model.loadPageStyles()
					.then(
						function(){self.is_error = false;},
						function(){self.is_error = true;}
					);
					expect(self.is_error).toBeTruthy();
				});
			});
			describe('loadStyle', function(){
				var self = this;
				beforeEach(function(){
					self.href = '/css/mypage.css';
					self.spy  = sinon.spy($, 'ajax');
					self.stub = sinon.stub(Page.model, 'getRevisionNumber');
					self.xhr = sinon.useFakeXMLHttpRequest();
					self.requests = [];
					self.xhr.onCreate = function(xhr){
						self.requests.push(xhr);
					};
				});
				afterEach(function(){
					self.spy.restore();
					self.stub.restore();
					$('head>style.page_style').remove();
				});
				it('Ajaxでスタイル情報を読み込む(通常時)', function(){
					self.is_error = undefined;
					runs(function(){
						_.when(Page.model.loadStyle(self.href))
						.then(
							 function(){self.is_error = false;}
							,function(){self.is_error = true;}
						);
						self.requests[0].respond(200, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBe(false);
					});
				});
				it('Ajaxでスタイル情報を読み込む(異常時)', function(){
					self.is_error = undefined;
					runs(function(){
						_.when(Page.model.loadStyle(self.href))
						.then(
							 function(){self.is_error = false;}
							,function(){self.is_error = true;}
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBe(true);
					});
				});
			});
			describe('setImgUrlRoot', function(){
				var self = this;
				it('RSに画像を読み込むパスのルートを設定する', function(){
					self.img_url_root = 'img/';
					Page.model.set({
						page_data: {
							img_url_root: self.img_url_root
						}
					});
					Page.model.setImgUrlRoot();
					expect(RS.get('img_url_root', false))
						.toEqual(self.img_url_root);
				});
			});
			describe('makeHTML', function(){
				var self = this;
				it('テンプレートからHTMLを生成する', function(){
					Page.model.set({
						 PAGEID             : '100'
						,query              : ''
						,page_data          : {}
						,extended_page_data : {}
					});
					Page.model.makeHTML();
					// FIXME: チェックが甘い
					expect(Page.model.get('page_html')).toBeTruthy();
				});
			});
			describe('makeHeader', function(){
				var self = this;
				beforeEach(function(){
					self.$tmplHeader = $('<div id="jsTemplateHeader" />').text('hoge');
					self.$header     = $('<header id="globalHeader" />');
					$('body').append(self.$tmplHeader);
					self.$globalHeader = $('body').append(self.$header);
					Page.model.set({
						page_data: {
							status: 200
						}
					});
				});
				afterEach(function(){
					self.$tmplHeader.remove();
					self.$header.remove();
				});
				it('グローバルヘッダーを生成する', function(){
					var beforeContent = $('#globalHeader').html();
					Page.model.makeHeader();
					var afterContent = $('#globalHeader').html();
					// XXX: チェックが変かもしれない
					expect(afterContent).toBeGreaterThan(beforeContent);
				});
			});
			describe('addPageData', function(){
				var self = this;
				beforeEach(function(){
					Page.model.set({
						status: 200
					});
				});
				it('page_dataを追加する', function(){
					Page.model.addPageData({
						 hoge : 'fuga'
						,foo  : 'bar'
					});
					var pageData = Page.model.get('extended_page_data');
					expect(pageData).toEqual({
						 status : 200
						,hoge   : 'fuga'
						,foo    : 'bar'
					});
				});
			});
			// TODO: loadCommonDataのテストコードをloadPageDataの前に置くと
			//       テストが通らなくなるので要原因調査
			//       -> おそらくPageインスタンスの状態をテストコードで変化させてるため
			describe('loadCommonData: 共通設定を読み込む', function(){
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
				it('正常に読み込み完了', function(){
					self.is_error = undefined;
					runs(function(){
						_.when(Page.model.loadCommonData())
						.then(
							 function(){self.is_error = false;}
							,function(){self.is_error = true;}
						);
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBe(false);
						expect(Page.model.get('status')).toBe(200);
					});
				});
				it('通信エラーが発生したらdeferredのrejectが走る', function(){
					self.is_error = undefined;
					runs(function(){
						_.when(Page.model.loadCommonData())
						.then(
							 function(){self.is_error = false;}
							,function(){self.is_error = true;}
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
				it('サーバーエラーが発生したらdeferredのrejectが走る', function(){
					self.is_error = undefined;
					// respondでstatus500を指定しても上書きされてしまうのでここでも記述しておく
					Page.model.set({
						'page_data' : { 'status' : 500 }
					});
					runs(function(){
						_.when(Page.model.loadCommonData())
						.then(
							 function(){self.is_error = false;}
							,function(){self.is_error = true;}
						);
						self.requests[0].respond(200, {}, '{"status":500}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
			});
		});
		describe('View', function(){
			var self = this;
			var Page = new PageClass.View({
				model : new PageClass.Model()
			});
			var Popups;
			PopupClass.View = PopupClass.View.extend({
				page : self
			});
			Popups = new PopupClass.View({
				collection : new PopupClass.Collection()
			});
			it('modelが定義されている', function(){
				expect(Page.model).toBeDefined();
			});
			describe('initialize', function(){
				it('インスタンス生成時にinitializeイベントが発火しているか確認', function(){
					var stub = sinon.stub(
						PageClass.View.prototype,
						'trigger'
					);
					new PageClass.View();
					expect(stub).toHaveBeenCalledWith('initialize');
					stub.restore();
				});
			});
			describe('list', function(){
				var self = this;
				beforeEach(function(){
					self.$el = $('<div class="list-test" />').text('list test');
					self.parameter = {
						 el     : self.$el
						,status : 200
					};
					self.list = Page.list(self.parameter);
				});
				it('指定したelementを含んだlistクラスのViewを返す', function(){
					expect(self.list.el).toMatch(self.$el);
				});
				it('渡したパラメータを引き継いだlistクラスのモデルを返す', function(){
					expect(self.list.model.get('status')).toEqual(self.parameter.status);
				});
			});
			// XXX: テストの仕方がわからない
			describe('initiatePopup', function(){
			});
			describe('bindCommonEvents', function(){
				var self = this;
				var Page = new PageClass.View({
					model : new PageClass.Model()
				});
				beforeEach(function(){
					self.stubs = {
						checkForm             : sinon.stub(Page.model, 'checkForm'),
						checkPost             : sinon.stub(Page.model, 'checkPost'),
						openFirstPopup        : sinon.stub(Page, 'openFirstPopup'),
						instantiateTab        : sinon.stub(Page, 'instantiateTab'),
						initializeCounter     : sinon.stub(Page, 'initializeCounter'),
						initializeForm        : sinon.stub(Page, 'initializeForm'),
						initializeTimer       : sinon.stub(Page, 'initializeTimer'),
						instantiateAnimation  : sinon.stub(Page, 'instantiateAnimation'),
						instantiateComponents : sinon.stub(Page, 'instantiateComponents'),
						resetFullScreen       : sinon.stub(Page, 'resetFullScreen'),
						bindEvents            : sinon.stub(Page, 'bindEvents'),
						setDummyFormData      : sinon.stub(Page.model, 'setDummyFormData'),
						add                   : sinon.stub(Popups, 'add'),
						initializeError       : sinon.stub(Page, 'initializeError'),
						render                : sinon.stub(Page, 'render'),
						redirect              : sinon.stub(Page, 'redirect'),
						loadFirst             : sinon.stub(Page.model, 'loadFirst')
					};
					Page.bindCommonEvents();
					Page.off('becomeCurrent render submitDummy openPopup closePopup closeAllPopup catchError');
					Page.model.off('checkForm proveNoFormData change:page_html catchError');
				});
				afterEach(function(){
					_.each(self.stubs, function(stub){
						stub.restore();
					});
				});
				describe('becomeCurrentイベント', function(){
					it('checkForm()をバインド', function(){
						var stub = self.stubs.checkForm;
						Page.on('becomeCurrent', stub);
						Page.trigger('becomeCurrent');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('renderイベント', function(){
					it('model.checkPost()をバインド', function(){
						var stub = self.stubs.checkPost;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('openFirstPopup()をバインド', function(){
						var stub = self.stubs.openFirstPopup;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('instantiateTab()をバインド', function(){
						var stub = self.stubs.instantiateTab;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('initializeCounter()をバインド', function(){
						var stub = self.stubs.initializeCounter;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('initializeForm()をバインド', function(){
						var stub = self.stubs.initializeForm;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('initializeTimer()をバインド', function(){
						var stub = self.stubs.initializeTimer;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('instantiateAnimation()をバインド', function(){
						var stub = self.stubs.instantiateAnimation;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('instantiateComponents()をバインド', function(){
						var stub = self.stubs.instantiateComponents;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('resetFullScreen()をバインド', function(){
						var stub = self.stubs.resetFullScreen;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('bindEvents()をバインド', function(){
						var stub = self.stubs.bindEvents;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
					it('instantiateComponents()をバインド', function(){
						var stub = self.stubs.instantiateComponents;
						Page.on('render', stub);
						Page.trigger('render');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('submitDummyイベント', function(){
					it('model.setDummyFormDataをバインド', function(){
						var stub = self.stubs.setDummyFormData;
						Page.on('submitDummy', stub);
						Page.trigger('submitDummy', []);
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('openPopupイベント', function(){
					it('Popup.addをバインド', function(){
						var stub = self.stubs.add;
						Page.on('openPopup', stub);
						Page.trigger('openPopup');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('catchErrorイベント', function(){
					it('initializeErrorをバインド', function(){
						var stub = self.stubs.initializeError;
						Page.on('catchError', stub);
						Page.trigger('catchError');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('change:page_htmlイベント', function(){
					it('render()をバインド', function(){
						var stub = self.stubs.render;
						Page.model.on('change:page_html', stub);
						Page.model.trigger('change:page_html');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('proveNoFormDataイベント', function(){
					it('redirect()をバインド', function(){
						var stub = self.stubs.redirect;
						Page.model.on('proveNoFormData', stub);
						Page.model.trigger('proveNoFormData');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('model.checkFormイベント', function(){
					it('model.loadFirst()をバインド', function(){
						var stub = self.stubs.loadFirst;
						Page.model.on('checkForm', stub);
						Page.model.trigger('checkForm');
						expect(stub).toHaveBeenCalledOnce();
					});
				});
				describe('model.catchErrorイベント', function(){
					it('モデルでエラーが発生したらViewのcatchErrorイベントをキックする', function(){
						var stub = self.stubs.initializeError;
						Page.model.on('catchError', stub);
						Page.model.trigger('catchError', { status: 404 }, true);
						expect(stub).toHaveBeenCalledOnce();
					});
				});
			});
			describe('render', function(){
				var self = this;
				beforeEach(function(){
					var $jsPage = $('<div class="jsPage" />').text('render test');
					$('body').append($jsPage);
					self.$el = $jsPage;
					self.stub = sinon.stub(Page, 'trigger');
				});
				afterEach(function(){
					self.stub.restore();
					self.$el.remove();
				});
				it('HTML内jsPageクラスにDOMを代入する', function(){
					Page.render();
					self.inner_html = self.$el.html();
					expect(self.inner_html).not.toBeNull();
				});
				it('HTML内jsPageクラスに代入されたDOMがpage_htmlと一致する', function(){
					var html = Page.model.get('page_html');
					self.$el.html(html);
					Page.model.set({
						page_html : '<div class="test">hoge</div>'
					});
					Page.render();
					expect(self.$el.html()).toEqual(self.$el.html());
				});
				it('renderイベントを発火する', function(){
					Page.render();
					expect(self.stub).toHaveBeenCalledWith('render');
				});
			});
			// reloadはブラウザのリロードをするだけなのでテストしない
			describe('reload', function(){
			});
			describe('redirect', function(){
				var self = this;
				beforeEach(function(){
					self.url = 'http://www.yahoo.co.jp';
					Page.model.set({
						redirect_url : self.url
					});
					self.spy = sinon.spy();
					Page.off('changeURL');
					Page.on('changeURL', self.spy);
					Page.redirect();
				});
				afterEach(function(){
					Page.off('changeURL');
				});
				it('changeURLイベントにバインド', function(){
					expect(self.spy).toHaveBeenCalledOnce();
				});
				it('指定したURLへリダイレクトする', function(){
					expect(self.spy).toHaveBeenCalledWith(self.url, true);
				});
			});
			// どうやってテスト書こうか
			describe('instantiateTab', function(){
			});
			// XXX: initialize系のテストが書けない
			describe('initializeCounter', function() {
			});
			describe('initializeForm', function() {
				var self = this;
				it('FormClassのインスタンスを生成する', function(){
					// var initializeForm = Page.initializeForm;
					// var Form;
					// initializeForm.apply(self);
					// console.log(Form);
				});
			});
			describe('initializeTimer', function() {
				var self = this;
				// it('page_dataがあればインスタンスが生成される', function(){
				// 	var initializeTimer = Page.initializeTimer;
				// 	var Timer;
				// 	self.model = new PageClass.Model();
				// 	self.model.set({
				// 		page_data : {
				// 			status : 200
				// 		}
				// 	});
				// 	initializeTimer();
				// 	console.log(' timer ----');
				// 	console.log(Timer);
				// });
				// it('page_dataがなければインスタンスは生成されない', function(){
				// });
				// it('TimerのbattleStartイベントをPopups.addにバインド', function(){
				// });
				// it('TimerのbattleFinishイベントをPopups.addにバインド', function(){
				// });
				// it('navigateイベントをTimer.model.removeTimerにバインド', function(){
				// });
			});
			describe('instantiateAnimation', function(){
			});
			describe('instantiateComponents', function(){
				beforeEach(function(){
					var Model = Backbone.Model;
					var View = Backbone.View.extend({
						model: new Model(),
						initialize: function(){
							this.model.set({ is_init : true });
						}
					});
					var component = {
						Model : Model
						,View : View
					};
					Page.components = {
						 'test1' : component
						,'test2' : component
					}
					Page.instantiateComponents();
				});
				afterEach(function(){
					Page.components = {};
				});
				it('components内のクラスを全てインスタンス化する', function(){
					var is_init = Page.components.test1.model.get('is_init');
					expect(is_init).toBeTruthy();
				});
				it('components内のクラスからpageを呼び出し可能にする', function(){
					expect(Page.components.test1.page).toEqual(Page);
				});
			});
			describe('resetFullScreen', function(){
				var self = this;
				beforeEach(function(){
					self.$fullScreen   = $('<div id="fullScreen" />');
					self.$complete     = $('<div class="onComplete" />').show();
					self.$globalHeader = $('<header id="globalHeader" />').hide();
					self.$globalFooter = $('<footer id="globalFooter" />').hide();
					self.$footer       = $('<div id="footer" />').hide();
					self.$test         = $('<div id="jsContents" />');
					self.$body         = $('body');
					self.$body.append(self.$test);
					self.$test.append(self.$complete);
					self.$test.append(self.$globalHeader);
					self.$test.append(self.$globalFooter);
					self.$test.append(self.$footer);
				});
				afterEach(function(){
					Page.resetFullScreen();
					self.$test.remove();
				});
				it('フルスクリーンを解除する', function(){
					Page.resetFullScreen();
					expect(self.$complete.css('display')).toBe('none');
				});
				it('グローバルヘッダーを表示する', function(){
					Page.resetFullScreen();
					expect(self.$globalHeader.css('display')).toBe('block');
				});
				it('グローバルフッターを表示する', function(){
					Page.resetFullScreen();
					expect(self.$globalFooter.css('display')).toBe('block');
				});
				it('フッターを表示する', function(){
					Page.resetFullScreen();
					expect(self.$footer.css('display')).toBe('block');
				});
				it('フルスクリーンのときはグローバルヘッダー,グローバルフッター,フッターは非表示', function(){
					self.$test.append(self.$fullScreen);
					Page.resetFullScreen();
					expect(self.$globalHeader.css('display')).toBe('none');
					expect(self.$globalFooter.css('display')).toBe('none');
					expect(self.$footer.css('display')).toBe('none');
				});
			});
			// テストの仕方がわからない
			describe('initializeError', function(){
			});
			describe('closeAllPopup', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy();
					Page.off('closeAllPopup');
					Page.on('closeAllPopup', self.spy);
				});
				afterEach(function(){
					Page.off('closeAllPopup');
				})
				it('closeAllPopupイベントをキックする', function(){
					Page.closeAllPopup();
					expect(self.spy).toHaveBeenCalled();
				});
			});
			describe('openFirstPopup', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy();
					Page.off('openPopup');
					Page.on('openPopup', self.spy);
				});
				afterEach(function(){
					Page.off('openPopup');
				});
				it('ポップアップがストレージになければopenPopupイベントは発生しない', function(){
					Page.openFirstPopup();
					expect(self.spy).not.toHaveBeenCalled();
				});
				it('ポップアップがストレージにあればopenPopupイベントをキックする', function(){
					RS.put({ first_popup: 'popup' }, false);
					Page.openFirstPopup();
					expect(self.spy).toHaveBeenCalledOnce();
				});
			});
			// TODO: テストがあまい
			// FIXME: テスト通らない
			describe('unbindEvents', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy();
					Page.off('navigate');
					Page.off('testEvent');
					Page.on('testEvent', self.spy);
				});
				afterEach(function(){
					Page.off('testEvent');
				});
				it('イベントがすべてアンバインドされる', function(){
					Page.unbindEvents();
					Page.trigger('testEvent');
					expect(self.spy).not.toHaveBeenCalled();
				});
			});
			describe('unbindEvent', function(){
			});
		});
	};
	return Specs;
});
