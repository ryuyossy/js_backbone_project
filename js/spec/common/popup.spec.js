define([
	'common/popup'
], function(
	PopupClass
){
	var Specs = function(){
		var Popup = new PopupClass.View({
			model : new PopupClass.Model({ title: 'PopupClassのテスト' }),
			collection : new PopupClass.Collection()
		});
		describe('Model', function(){
			describe('initialize', function(){
				it('インスタンス生成時にinitializeイベントが発火しているか確認', function(){
					var stub = sinon.stub(
						PopupClass.Model.prototype,
						'trigger'
					);
					new PopupClass.Model();
					expect(stub).toHaveBeenCalledWith('initialize');
					stub.restore();
				});
			});

			describe('setIsClosable', function(){
				beforeEach(function(){
					Popup.model.set({ is_closable : null });
				});
				it('is_closableプロパティがtrueで渡されたらtrueでsetする', function(){
					Popup.model.set({ is_closable : true });
					Popup.model.setIsClosable();
					expect(Popup.model.get('is_closable')).toBeTruthy();
				});
				it('is_closableプロパティがfalseで渡されたらfalseでsetする', function(){
					Popup.model.set({ is_closable : false });
					Popup.model.setIsClosable();
					expect(Popup.model.get('is_closable')).toBeFalsy();
				});
				it('is_closableプロパティが何も指定されなかったらtrueでsetする', function(){
					Popup.model.setIsClosable();
					expect(Popup.model.get('is_closable')).toBeTruthy();
				});
			});

			describe('getPopupTemplate', function(){
				var self = this;
				beforeEach(function(){
					self.$testDiv = $('<div id="testPopupTemplate"/>')
						.text('fuga').append($('<p/>').text('piyo'));
					$('body').append(self.$testDiv);
					Popup.model.set({ popup_template_contents : null });
				});
				afterEach(function(){
					self.$testDiv.remove();
				});
				it('templateプロパティが空のときはデフォルトのHTMLをpopup_templete_contentsにsetする', function(){
					var html = $('#jsTemplatePopupDefault').html();
					Popup.model.set({ template : null });
					Popup.model.getPopupTemplate();
					var popupTemplateContents = Popup.model.get('popup_template_contents');
					expect(popupTemplateContents).toEqual(html);
				});
				it('templateプロパティを指定して特定のHTMLをpopup_template_contentsにsetできる', function(){
					Popup.model.set({ template : '#testPopupTemplate' });
					Popup.model.getPopupTemplate();
					var popupTemplateContents = Popup.model.get('popup_template_contents');
					expect(popupTemplateContents).toEqual(self.$testDiv.html());
				});
			});

			describe('getData', function(){
				var self = this;
				beforeEach(function(){
					self.fakeErrorResult = (function(){
						var data = {
							status  : '404'
							,errors : '404 not found'
							,redirect_url : '/'
						};
						var dfd = new _.Deferred();
						dfd.reject(data);
						return dfd.promise();
					})();
					self.stubs = {
						 loadPopupData  : sinon.stub(Popup.model, 'loadPopupData')
						,loadCommonData : sinon.stub(Popup.model, 'loadCommonData')
					};
					self.spys = {
						 succeedSpy : sinon.spy()
						,failSpy    : sinon.spy()
					};
					Popup.model.on('succeedLoading', self.spys.succeedSpy);
					Popup.model.on('failLoading', self.spys.failSpy);
					Popup.model.set({ data_path : 'mypage/get '});
				});
				afterEach(function(){
					_.each(self.stubs, function(stub){
						stub.restore();
					});
				});
				it('データが正常に読み込めたらsucceedLoadingイベントが発火する', function(){
					Popup.model.getData();
					expect(self.spys.succeedSpy).toHaveBeenCalledOnce();
				});
				it('データが正常に読み込めたらfailLoadingイベントは発火しない', function(){
					Popup.model.getData();
					expect(self.spys.failSpy).not.toHaveBeenCalled();
				});
				it('データ読み込みに失敗したらfailLoadingイベントが発火する', function(){
					self.stubs.loadPopupData.returns(self.fakeErrorResult);
					Popup.model.getData();
					expect(self.spys.failSpy).toHaveBeenCalledOnce();
				});
				it('データ読み込みに失敗したらsucceedLoadingイベントは発火しない', function(){
					self.stubs.loadPopupData.returns(self.fakeErrorResult);
					Popup.model.getData();
					expect(self.spys.succeedSpy).not.toHaveBeenCalled();
				});
				it('data_pathプロパティに何も設定されていなければsucceedLoadingイベントが発火する', function(){
					Popup.model.set({ data_path : null });
					Popup.model.getData();
					expect(self.spys.succeedSpy).toHaveBeenCalledOnce();
					expect(self.spys.failSpy).not.toHaveBeenCalled();
				});
			});

			describe('loadCommonData', function(){
				var self = this;
				beforeEach(function(){
					self.spy = sinon.spy($, 'ajax');
					self.xhr = sinon.useFakeXMLHttpRequest();
					self.requests = [];
					self.xhr.onCreate = function(xhr){
						self.requests.push(xhr);
					};
					Popup.model.set({ popup_data : null });
				});
				afterEach(function(){
					self.spy.restore();
					self.xhr.restore();
				});
				it('common.jsonから共通情報を読み込みpopup_dataプロパティにsetする', function(){
					self.isError = undefined;
					runs(function(){
						_.when(Popup.model.loadCommonData())
						.then(
							 function(){ self.isError = false; }
							,function(){ self.isError = true; }
						);
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waitsFor(function(){
						return self.isError !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.isError).toBeFalsy();
						expect(Popup.model.get('popup_data')).toEqual({ status : 200 });
					});
				});
				it('statusが500で返ってきたら通信失敗になる', function(){
					self.isError = undefined;
					runs(function(){
						_.when(Popup.model.loadCommonData())
						.then(
							 function(){ self.isError = false; }
							,function(){ self.isError = true; }
						);
						self.requests[0].respond(200, {}, '{"status":500}');
					});
					waitsFor(function(){
						return self.isError !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.isError).toBeTruthy();
						expect(Popup.model.get('popup_data')).toEqual({ status : 500 });
					});
				});
				it('通信に失敗したらpopup_dataプロパティに何もセットされない', function(){
					self.isError = undefined;
					runs(function(){
						_.when(Popup.model.loadCommonData())
						.then(
							 function(){ self.isError = false; }
							,function(){ self.isError = true; }
						);
						self.requests[0].respond(404, {}, '404 not found');
					});
					waitsFor(function(){
						return self.isError !== undefined;
					}, 'API通信完了', 500);
					runs(function(){
						expect(self.isError).toBeTruthy();
						expect(Popup.model.get('popup_data')).toEqual(null);
					});
				});
			});

			describe('loadPopupData', function(){
				var self = this;
				beforeEach(function(){
					Popup.model.set({
						 data_path : 'deck/equip/change_confirm'
						,ajax_type : 'POST'
						,ajax_data : {
							 equip_type    : 1
							,deck_no       : 0
							,place_no      : 0
							,user_equip_no : 13612797592743
						}
						,popup_data : null
					});
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
					Popup.model.set({ popup_data : null });
				});
				it('API叩くとJSONを返す', function(){
					var json;
					runs(function(){
						_.when(Popup.model.loadPopupData())
						.then(
							 function() { json = Popup.model.get('popup_data'); }
							,function(e){ json = false; }
						);
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waitsFor(function(){
						return json !== undefined;
					}, 'API通信完了', 100);
					runs(function(){
						expect(json).toEqual({ status:200 });
					});
				});
				it('ajax_typeが未指定の場合はGETになる', function(){
					runs(function(){
						Popup.model.set({ ajax_type : '' });
						Popup.model.loadPopupData();
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waits(100);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({ type : 'GET' });
					});
				});
				it('ajax_typeにPOSTを指定できる', function(){
					runs(function(){
						Popup.model.set({ ajax_type : 'POST' });
						Popup.model.loadPopupData();
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waits(100);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({ type : 'POST' });
					});
				});
				it('ajax_typeをpostと指定してもPOSTで送信できる', function(){
					runs(function(){
						Popup.model.set({ ajax_type : 'post' });
						Popup.model.loadPopupData();
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waits(100);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({ type : 'POST' });
					});
				});
				it('dataプロパティにリクエストパラメータを指定できる', function(){
					runs(function(){
						Popup.model.set({
							ajax_data : {
								test_message : 'set request parameter'
							}
						});
						Popup.model.loadPopupData();
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waits(100);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							data : { test_message : 'set request parameter' }
						});
					});
				});
				it('dataTypeプロパティにjsonが指定されている', function(){
					runs(function(){
						Popup.model.loadPopupData();
						self.requests[0].respond(200, {}, '{"status":200}');
					});
					waits(100);
					runs(function(){
						expect(self.spy).toHaveBeenCalledWithMatch({
							dataType: 'json'
						});
					});
				});
				it('statusが200以外だとエラーになる', function(){
					runs(function(){
						self.is_error = undefined;
						_.when(Popup.model.loadPopupData())
						.then(
							function(){self.is_error = false;},
							function(){self.is_error = true;}
						);
						self.requests[0].respond(200, {}, '{"status":500, "message":"failure"}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 100);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
				it('通信が失敗するとエラーになる', function(){
					runs(function(){
						self.is_error = undefined;
						_.when(Popup.model.loadPopupData())
						.then(
							function(){self.is_error = false;},
							function(){self.is_error = true;}
						);
						self.requests[0].respond(404, {}, '{}');
					});
					waitsFor(function(){
						return self.is_error !== undefined;
					}, 'API通信完了', 100);
					runs(function(){
						expect(self.is_error).toBeTruthy();
					});
				});
			});

			describe('makeFrameHTML', function(){
				beforeEach(function(){
					Popup.model.set({
						is_closable : true
						,popup_html  : null
					});
				});
				afterEach(function(){
					Popup.model.set({
						 title  : 'PopupClassのテスト'
						,titles : null
					});
				});
				it('デフォルトポップアップ用HTMLをpopup_htmlプロパティにsetする', function(){
					Popup.model.makeFrameHTML();
					var $html        = $(Popup.model.get('popup_html'));
					var sectionClass = $html.attr('class');
					var spanClass    = $html.find('span').eq(0).attr('class');
					var h1Text       = $html.find('h1').text();
					var divClass     = $html.find('div').eq(0).attr('class');
					expect(sectionClass).toEqual('modalBox jsPopup');
					expect(spanClass).toEqual('close jsClosePopup');
					expect(h1Text).toEqual('PopupClassのテスト');
					expect(divClass).toEqual('jsPopupContents');
				});
				it('titleが配列形式で複数存在したら最初の要素をタイトルとしてsetする', function(){
					Popup.model.set({
						 title : null
						,titles: ['makeFrameHTMLテスト1', 'makeFrameHTMLテスト2']
					});
					Popup.model.makeFrameHTML();
					var $html        = $(Popup.model.get('popup_html'));
					var h1Text       = $html.find('h1').text();
					expect(h1Text).toEqual('makeFrameHTMLテスト1');
				});
				// TODO: local_dataのテストとか書いた方がいい
			});

			describe('makeContentsHTML', function(){
				var self = this;
				beforeEach(function(){
					var defaultPopup = $('#jsTemplatePopupDefault').html();
					Popup.model.set({ popup_template_contents : defaultPopup });
					self.spy = sinon.spy();
					Popup.model.on('makeContentsHTML', self.spy);
				});
				it('呼び出すとmakeContentsHTMLイベントが発火する', function(){
					Popup.model.set({
						popup_template_contents : 'test'
					});
					Popup.model.makeContentsHTML();
					expect(self.spy).toHaveBeenCalledOnce();
				});
				it('popup_template_contentsが空だとpopup_htmlには空がsetされる', function(){
					Popup.model.set({ popup_template_contents : null });
					Popup.model.makeContentsHTML();
					expect(Popup.model.get('popup_html')).toEqual('');
					expect(self.spy).toHaveBeenCalledOnce();
				});
				it('messageプロパティに指定した文章をHTMLのpタグ内に表示してsetする', function(){
					var message = 'make contents html';
					Popup.model.set({ message : message });
					Popup.model.makeContentsHTML();
					var $html = $(Popup.model.get('popup_html'));
					var text = $html.find('p').text();
					expect(text).toEqual(message);
				});
				it('is_closableプロパティがtrueなら閉じるボタンありでsetする', function(){
					Popup.model.set({ is_closable : true });
					Popup.model.makeContentsHTML();
					var $html = $(Popup.model.get('popup_html'));
					expect($html.find('.jsClosePopup').text()).toEqual('閉じる');
				});
				it('is_closableプロパティがfalseなら閉じるボタンなしでsetする', function(){
					Popup.model.set({ is_closable : false });
					Popup.model.makeContentsHTML();
					var $html = $(Popup.model.get('popup_html'));
					var text = $html.find('.modalInner > .jsClosePopup').text();
					expect(text).toEqual(null);
				});
				it('is_closableプロパティがundefinedなら閉じるボタンありでsetする', function(){
					Popup.model.set({ is_closable : undefined });
					Popup.model.makeContentsHTML();
					var $html = $(Popup.model.get('popup_html'));
					expect($html.find('.jsClosePopup').text()).toEqual('閉じる');
				});
				// TODO: jsTemplatePopupDefaultではdata, local_dataの確認できない
			});
		});

		describe('View', function(){
			describe('initialize', function(){});
			describe('add', function(){});
			describe('bindEvents', function(){});
			describe('renderBG', function(){});
			describe('renderLoading', function(){});
			describe('render', function(){});
			describe('runSuccessCallback', function(){});
			describe('getCloseElement', function(){});
			describe('getCurrentElement', function(){});
			describe('offEvents', function(){});
			describe('offEventsAll', function(){});
			describe('remove', function(){});
			describe('removePopups', function(){});
			describe('removeAll', function(){});
			describe('hide', function(){});
		});
	}
	return Specs;
});