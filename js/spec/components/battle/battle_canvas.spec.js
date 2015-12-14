define([
	'components/battle/battle_canvas'
], function(
	BattleCanvasClass
	){
	var BattleCanvasExtended = BattleCanvasClass.extend({
		page : {
			model:{
				get: function(){}
			}
		}
	});

	var testdata_json = {
		"own_guild":{
			"name":"ヤタガイクライシス",
			"gp":12345,
			"fainted_flg":false,
			"fronts":[
				{
					"avator_id":3,
					"user_id":1,
					"name":"ノッポ",
					"fainted_flg":false
				},
				{
					"avator_id":1,
					"user_id":2,
					"name":"ブー",
					"fainted_flg":true
				},
				{
					"avator_id":2,
					"user_id":3,
					"name":"カービィ",
					"fainted_flg":false
				}
			]
		},
		"enemy_guild":{
			"name":"ツシマクライシス",
			"gp":12345,
			"fainted_flg":false,
			"fronts":[
				{
					"avator_id":10,
					"user_id":3,
					"name":"モッチー",
					"fainted_flg":true
				},
				{
					"avator_id":8,
					"user_id":4,
					"name":"ポチ",
					"fainted_flg":false
				}
			]
		},
		"user": {
			"user_id": 100
		}
	};
	sinon.stub(BattleCanvasExtended.prototype.page.model, 'get').withArgs('page_data').returns(testdata_json);

	var testdata_Manifest = [
		{src:"img/background.jpg", id:"background"},
		{src:"img/buttle_eff_01.png", id:"buttle_eff_01"},
		{src:"img/buttle_eff_02.png", id:"buttle_eff_02"},
		{src:"img/cha1_1.png", id:"cha1_1"},
		{src:"img/cha1_2.png", id:"cha1_2"},
		{src:"img/cha1_3.png", id:"cha1_3"},
		{src:"img/cha1_eff1.png", id:"cha1_eff1"},
		{src:"img/cha10_1.png", id:"cha10_1"},
		{src:"img/cha10_2.png", id:"cha10_2"},
		{src:"img/cha10_3.png", id:"cha10_3"},
		{src:"img/cha10_eff1.png", id:"cha10_eff1"},
		{src:"img/cha10_eff2.png", id:"cha10_eff2"},
		{src:"img/cha11_1.png", id:"cha11_1"},
		{src:"img/cha11_2.png", id:"cha11_2"},
		{src:"img/cha11_3.png", id:"cha11_3"},
		{src:"img/cha11_4.png", id:"cha11_4"},
		{src:"img/cha11_eff1.png", id:"cha11_eff1"},
		{src:"img/cha12_1.png", id:"cha12_1"},
		{src:"img/cha12_2.png", id:"cha12_2"},
		{src:"img/cha12_3.png", id:"cha12_3"},
		{src:"img/cha12_4.png", id:"cha12_4"},
		{src:"img/cha12_eff1.png", id:"cha12_eff1"},
		{src:"img/cha12_eff2.png", id:"cha12_eff2"},
		{src:"img/cha12_eff3.png", id:"cha12_eff3"},
		{src:"img/cha2_1.png", id:"cha2_1"},
		{src:"img/cha2_2.png", id:"cha2_2"},
		{src:"img/cha2_3.png", id:"cha2_3"},
		{src:"img/cha2_4.png", id:"cha2_4"},
		{src:"img/cha2_eff_1.png", id:"cha2_eff_1"},
		{src:"img/cha3_1.png", id:"cha3_1"},
		{src:"img/cha3_2.png", id:"cha3_2"},
		{src:"img/cha3_3.png", id:"cha3_3"},
		{src:"img/cha3_eff1.png", id:"cha3_eff1"},
		{src:"img/cha3_eff2.png", id:"cha3_eff2"},
		{src:"img/cha4_1.png", id:"cha4_1"},
		{src:"img/cha4_2.png", id:"cha4_2"},
		{src:"img/cha4_3.png", id:"cha4_3"},
		{src:"img/cha4_4.png", id:"cha4_4"},
		{src:"img/cha4_eff1.png", id:"cha4_eff1"},
		{src:"img/cha5_1.png", id:"cha5_1"},
		{src:"img/cha5_2.png", id:"cha5_2"},
		{src:"img/cha5_3.png", id:"cha5_3"},
		{src:"img/cha5_4.png", id:"cha5_4"},
		{src:"img/cha5_eff1.png", id:"cha5_eff1"},
		{src:"img/cha6_1.png", id:"cha6_1"},
		{src:"img/cha6_2.png", id:"cha6_2"},
		{src:"img/cha6_3.png", id:"cha6_3"},
		{src:"img/cha6_4.png", id:"cha6_4"},
		{src:"img/cha6_eff1.png", id:"cha6_eff1"},
		{src:"img/cha7_1.png", id:"cha7_1"},
		{src:"img/cha7_2.png", id:"cha7_2"},
		{src:"img/cha7_3.png", id:"cha7_3"},
		{src:"img/cha7_4.png", id:"cha7_4"},
		{src:"img/cha7_eff1.png", id:"cha7_eff1"},
		{src:"img/cha8_1.png", id:"cha8_1"},
		{src:"img/cha8_2.png", id:"cha8_2"},
		{src:"img/cha8_3.png", id:"cha8_3"},
		{src:"img/cha8_4.png", id:"cha8_4"},
		{src:"img/cha8_5.png", id:"cha8_5"},
		{src:"img/cha8_eff1.png", id:"cha8_eff1"},
		{src:"img/cha8_eff2.png", id:"cha8_eff2"},
		{src:"img/cha9_1.png", id:"cha9_1"},
		{src:"img/cha9_2.png", id:"cha9_2"},
		{src:"img/cha9_3.png", id:"cha9_3"},
		{src:"img/cha9_4.png", id:"cha9_4"},
		{src:"img/cha9_eff1.png", id:"cha9_eff1"},
		{src:"img/down_cha1.png", id:"down_cha1"},
		{src:"img/down_cha10.png", id:"down_cha10"},
		{src:"img/down_cha11.png", id:"down_cha11"},
		{src:"img/down_cha12.png", id:"down_cha12"},
		{src:"img/down_cha2.png", id:"down_cha2"},
		{src:"img/down_cha3.png", id:"down_cha3"},
		{src:"img/down_cha4.png", id:"down_cha4"},
		{src:"img/down_cha5.png", id:"down_cha5"},
		{src:"img/down_cha6.png", id:"down_cha6"},
		{src:"img/down_cha7.png", id:"down_cha7"},
		{src:"img/down_cha8.png", id:"down_cha8"},
		{src:"img/down_cha9.png", id:"down_cha9"},
		{src:"img/down_eff_01.png", id:"down_eff_01"},
		{src:"img/down_eff_02.png", id:"down_eff_02"},
		{src:"img/sub_cha1_1.png", id:"sub_cha1_1"},
		{src:"img/sub_cha1_2.png", id:"sub_cha1_2"},
		{src:"img/sub_cha10_1.png", id:"sub_cha10_1"},
		{src:"img/sub_cha10_2.png", id:"sub_cha10_2"},
		{src:"img/sub_cha10_eff1.png", id:"sub_cha10_eff1"},
		{src:"img/sub_cha11_1.png", id:"sub_cha11_1"},
		{src:"img/sub_cha11_2.png", id:"sub_cha11_2"},
		{src:"img/sub_cha12_1.png", id:"sub_cha12_1"},
		{src:"img/sub_cha12_2.png", id:"sub_cha12_2"},
		{src:"img/sub_cha12_eff1.png", id:"sub_cha12_eff1"},
		{src:"img/sub_cha12_eff2.png", id:"sub_cha12_eff2"},
		{src:"img/sub_cha12_eff3.png", id:"sub_cha12_eff3"},
		{src:"img/sub_cha2_1.png", id:"sub_cha2_1"},
		{src:"img/sub_cha2_2.png", id:"sub_cha2_2"},
		{src:"img/sub_cha2_eff1.png", id:"sub_cha2_eff1"},
		{src:"img/sub_cha3_1.png", id:"sub_cha3_1"},
		{src:"img/sub_cha3_2.png", id:"sub_cha3_2"},
		{src:"img/sub_cha4_1.png", id:"sub_cha4_1"},
		{src:"img/sub_cha4_2.png", id:"sub_cha4_2"},
		{src:"img/sub_cha5_1.png", id:"sub_cha5_1"},
		{src:"img/sub_cha5_2.png", id:"sub_cha5_2"},
		{src:"img/sub_cha6_1.png", id:"sub_cha6_1"},
		{src:"img/sub_cha6_2.png", id:"sub_cha6_2"},
		{src:"img/sub_cha7_1.png", id:"sub_cha7_1"},
		{src:"img/sub_cha7_2.png", id:"sub_cha7_2"},
		{src:"img/sub_cha8_1.png", id:"sub_cha8_1"},
		{src:"img/sub_cha8_2.png", id:"sub_cha8_2"},
		{src:"img/sub_cha9_1.png", id:"sub_cha9_1"},
		{src:"img/sub_cha9_2.png", id:"sub_cha9_2"}
	];

	var BattleCanvas;

	var Specs = function(){
		describe('Viewの', function(){
			afterEach(function(){
				BattleCanvas = null;
			});

			describe('initialize()ゎ',function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
				});
				it('modelを定義する', function(){
					expect(BattleCanvas.model).toBeDefined();
				});
				it('loaderプロパティにPreloadJSのリファレンスを持つ', function(){
					expect(BattleCanvas.loader).toBeDefined();
				});
				it('manifestプロパティにManifestオブジェクトのリファレンスを持つ', function(){
					expect(BattleCanvas.manifest).toBeDefined();
				});
			});

			describe('initialize()ゎ',function(){
				it('setPageData()を呼ぶ', function(){
					var stub = sinon.stub(
						BattleCanvasExtended.prototype,
						'setPageData'
					);
					new BattleCanvasExtended();
					expect(stub).toHaveBeenCalled();
					stub.restore();
				});
				it('setDependentImgs()を呼ぶ', function(){
					var stub = sinon.stub(
						BattleCanvasExtended.prototype,
						'setDependentImgs'
					);
					new BattleCanvasExtended();
					expect(stub).toHaveBeenCalled();
					stub.restore();
				});
				//todo: Deferredからのイベントトリガーのテストを追加する
			});

			describe('setPageData()ゎ', function(){
				it('modelにown_guildとenemy_guildを正しくセットする', function(){
					BattleCanvas = new BattleCanvasExtended();
					expect(BattleCanvas.model.get('own_guild').name).toEqual("ヤタガイクライシス");
					expect(BattleCanvas.model.get('enemy_guild').name).toEqual("ツシマクライシス");
				});
				it('setPageDataCompletedイベントを発火する', function(){
					var spy = sinon.spy();
					BattleCanvas = new BattleCanvasExtended();
					BattleCanvas.on('setPageDataCompleted', spy);
					BattleCanvas.setPageData();
					expect(spy).toHaveBeenCalledOnce();
				});
			});

			describe('loadCanvasData()ゎ', function(){
				it('dfds.loadCanvasDataでDeferredオブジェクトのリファレンスを持つ', function(){
					BattleCanvas = new BattleCanvasExtended();
					expect(BattleCanvas.dfds.loadCanvasData).toBeDefined();
				});
			});

			describe('loadCanvasData()ゎ', function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
					this.requireStub = sinon.stub(window, 'require');
					this.completeStub = sinon.stub(BattleCanvas, 'loadCanvasDataComplete');
					BattleCanvas.loadCanvasData();
				});
				afterEach(function(){
					this.requireStub.restore();
					this.completeStub.restore();
				});
				it('require()で読み込み完了したらloadCanvasDataComplete()を呼ぶ', function(){
					expect(this.requireStub).toHaveBeenCalledWith(
						['/js/createjs/battle.js'],
						BattleCanvas.loadCanvasDataComplete
					);
				});
			});

			describe('loadCanvasDataComplete()ゎ', function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
				});
				it('createjs_containerへのリファレンスを保持する', function(){
					BattleCanvas.loadCanvasDataComplete({canvas:'data'});
					expect(BattleCanvas.createjs_container).toEqual({canvas:'data'});
				});

				it('Deferredオブジェクトをresolve()する', function(){
					var stub = sinon.stub(BattleCanvas.dfds.loadCanvasData, 'resolve');
					BattleCanvas.loadCanvasDataComplete({canvas:'data'});
					expect(stub).toHaveBeenCalledOnce();
				});
			});

			describe('preloadImgs()ゎ', function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
				});
				it('dfds.preloadImgsでDeferredオブジェクトのリファレンスを持つ', function(){
					BattleCanvas.preloadImgs();
					expect(BattleCanvas.dfds.preloadImgs).toBeDefined();
				});
				it('loader.onFileLoadにimgLoaded()をバインドする', function(){
					var spy = sinon.spy(BattleCanvas, 'imgLoaded');
					BattleCanvas.preloadImgs();
					BattleCanvas.loader.onFileLoad({o:{type:"image",id:"id",result:"result"}});
					expect(spy).toHaveBeenCalled();
					spy.restore();
				});
				it('loader.onCompleteにpreloadComplete()をバインドする', function(){
					var spy = sinon.spy(BattleCanvas, 'preloadComplete');
					BattleCanvas.preloadImgs();
					BattleCanvas.loader.onComplete();
					expect(spy).toHaveBeenCalled();
					spy.restore();
				});
				it('setMaxConnections()を呼ぶ', function(){
					this.stub = sinon.stub(BattleCanvas.loader);
					BattleCanvas.preloadImgs();
					expect(this.stub.setMaxConnections).toHaveBeenCalledWith(10);
				});
				it('loadManifest()を呼ぶ', function(){
					this.stub = sinon.stub(BattleCanvas.loader);
					BattleCanvas.preloadImgs();
					expect(this.stub.loadManifest).toHaveBeenCalled([
						{src:"img/cha3_1.png", id:"cha3_1"},
						{src:"img/cha3_2.png", id:"cha3_2"},
						{src:"img/cha3_3.png", id:"cha3_3"},
						{src:"img/cha3_eff1.png", id:"cha3_eff1"},
						{src:"img/cha3_eff2.png", id:"cha3_eff2"},
						{src:"img/down_cha1.png", id:"down_cha1"},
						{src:"img/sub_cha2_1.png", id:"sub_cha2_1"},
						{src:"img/sub_cha2_2.png", id:"sub_cha2_2"},
						{src:"img/sub_cha2_eff1.png", id:"sub_cha2_eff1"},
						{src:"img/down_cha10.png", id:"down_cha10"},
						{src:"img/sub_cha8_1.png", id:"sub_cha8_1"},
						{src:"img/sub_cha8_2.png", id:"sub_cha8_2"}
					]);
				});
			});

			describe('preloadComplete()ゎ', function(){
				it('Deferredオブジェクトをresolve()する', function(){
					BattleCanvas = new BattleCanvasExtended();
					var stub = sinon.stub(BattleCanvas.dfds.preloadImgs, 'resolve');
					BattleCanvas.preloadComplete();
					expect(stub).toHaveBeenCalledOnce();
				});
			});

			describe('setDependentImgs()ゎ', function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
					BattleCanvas.manifest = testdata_Manifest;
				});

				it('getImgsByAvatorId()メソッドをmemberとleader_flgを引数にして呼ぶ', function(){
					var stub = sinon.stub(BattleCanvas, 'getImgsByAvatorId');
					BattleCanvas.setDependentImgs();

					expect(stub).toHaveBeenCalledWith(
						testdata_Manifest,
						{
							"avator_id":3,
							"user_id":1,
							"name":"ノッポ",
							"fainted_flg":false
						},
						true
					);
					expect(stub).toHaveBeenCalledWith(
						testdata_Manifest,
						{
							"avator_id":1,
							"user_id":2,
							"name":"ブー",
							"fainted_flg":true
						},
						false
					);
					expect(stub).toHaveBeenCalledWith(
						testdata_Manifest,
						{
							"avator_id":2,
							"user_id":3,
							"name":"カービィ",
							"fainted_flg":false
						},
						false
					);
					expect(stub).toHaveBeenCalledWith(
						testdata_Manifest,
						{
							"avator_id":10,
							"user_id":3,
							"name":"モッチー",
							"fainted_flg":true
						},
						true
					);
					expect(stub).toHaveBeenCalledWith(
						testdata_Manifest,
						{
							"avator_id":8,
							"user_id":4,
							"name":"ポチ",
							"fainted_flg":false
						},
						false
					);
					stub.restore();
				});

				it('model.manifestに結果のリストをセットする', function(){
					BattleCanvas.setDependentImgs();
					expect(BattleCanvas.model.get('manifest')).toEqual([
						{src:"img/cha3_1.png", id:"cha3_1"},
						{src:"img/cha3_2.png", id:"cha3_2"},
						{src:"img/cha3_3.png", id:"cha3_3"},
						{src:"img/cha3_eff1.png", id:"cha3_eff1"},
						{src:"img/cha3_eff2.png", id:"cha3_eff2"},
						{src:"img/down_cha1.png", id:"down_cha1"},
						{src:"img/sub_cha2_1.png", id:"sub_cha2_1"},
						{src:"img/sub_cha2_2.png", id:"sub_cha2_2"},
						{src:"img/sub_cha2_eff1.png", id:"sub_cha2_eff1"},
						{src:"img/down_cha10.png", id:"down_cha10"},
						{src:"img/sub_cha8_1.png", id:"sub_cha8_1"},
						{src:"img/sub_cha8_2.png", id:"sub_cha8_2"}
					]);
				});
			});

			describe('getImgsByAvatorId()で', function(){
				beforeEach(function(){
					BattleCanvas = new BattleCanvasExtended();
				});

				var equal = [
					[
						[
							{src:"img/cha3_1.png", id:"cha3_1"},
							{src:"img/cha3_2.png", id:"cha3_2"},
							{src:"img/cha3_3.png", id:"cha3_3"},
							{src:"img/cha3_eff1.png", id:"cha3_eff1"},
							{src:"img/cha3_eff2.png", id:"cha3_eff2"}
						],
						[
							{src:"img/down_cha1.png", id:"down_cha1"}
						],
						[
							{src:"img/sub_cha2_1.png", id:"sub_cha2_1"},
							{src:"img/sub_cha2_2.png", id:"sub_cha2_2"},
							{src:"img/sub_cha2_eff1.png", id:"sub_cha2_eff1"}
						]
					],
					[
						[
							{src:"img/down_cha10.png", id:"down_cha10"}
						],
						[
							{src:"img/sub_cha8_1.png", id:"sub_cha8_1"},
							{src:"img/sub_cha8_2.png", id:"sub_cha8_2"}
						]
					]
				];

				[
					testdata_json.own_guild.fronts,
				 	testdata_json.enemy_guild.fronts
				].forEach(function(members, j){
					members.forEach(function(member, i){
						it('avator_id:' + member.avator_id + ',' +
							'fainted_flg:' + member.fainted_flg +
							'で' + (i === 0 ? 'リーダー' : 'サブメンバー') + 'の時'
							,
							function(){
								expect(BattleCanvas.getImgsByAvatorId(testdata_Manifest, member, !!(i === 0))).toEqual(equal[j][i]);
							}
						);
					});
				})
			});

			describe('getFileName()ゎ', function(){
				it('"/images/canvas/ayapi.png"を引数にとると、"ayapi.png"が返る', function(){
					BattleCanvas = new BattleCanvasExtended();
					expect(BattleCanvas.getFileName("/images/canvas/ayapi.png")).toEqual("ayapi.png");
				});
			});
		});
	};
	return Specs;
});
