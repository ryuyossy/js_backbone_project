define(['easel','tween','movieclip','preload'],function(){
	var Data = {
		lib: {},
		initialize: function(img, createjsJson, createjs){
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.yell_specialDefencePower = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_0 = function() {
		//-----------------------------------------------------------------
		//jsonオブジェクトの取り込み
		
		//ローカルテスト用json
		var testJson = {
			combo : 980
		};
		
		if(typeof createjsJson == "undefined"){
			this.json = testJson;
		}else{
			this.json = createjsJson;
		}
		
		//-----------------------------------------------------------------
		//ダメージの数字の桁数
		
		this.getKeta = function(num){
			if(num < 0){
				throw new Error('argument "num" must not be negative value');
			}
			return Math.floor(Math.log(num) / Math.log(10)) + 1;
		}
		
		this.comboKeta = this.getKeta(this.json.combo);
	}
	this.frame_1 = function() {
		this.main.loop = false;
		
		if(this.json.combo > 0){
			var strs = this.json.combo.toString().match(/\d/g);
			var self = this;
			
			strs.forEach(function(str,i){
				var parent = self['combo' + self.comboKeta]['c' + self.comboKeta + '_num' + i];
				parent.removeChild(parent.children[0]);
				parent['com_str' + i] = new lib['number_combo_0' + str]();
				parent.addChild(parent['com_str' + i]);
			});
			self['combo' + self.comboKeta].gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(123));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A4/PoIAA/PMAx/AAAIAAfPMgx/AAA").cp();
	mask.setTransform(160,100);

	// combos
	this.instance = new lib.com();
	this.instance.setTransform(-97,67.3,1,1,0,0,0,22.5,25);

	this.instance_1 = new lib.number_combo_08_1();
	this.instance_1.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_2 = new lib.number_combo_07_1();
	this.instance_2.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_3 = new lib.number_combo_06_1();
	this.instance_3.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_4 = new lib.number_combo_05_1();
	this.instance_4.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_5 = new lib.number_combo_04_1();
	this.instance_5.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_6 = new lib.number_combo_03_1();
	this.instance_6.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_7 = new lib.number_combo_02_1();
	this.instance_7.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_8 = new lib.number_combo_01_1();
	this.instance_8.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_9 = new lib.number_combo_00_1();
	this.instance_9.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.instance_10 = new lib.number_combo_moji_1();
	this.instance_10.setTransform(-69.5,58.3,1,1,0,0,0,50,16);

	this.instance_11 = new lib.number_combo_09_1();
	this.instance_11.setTransform(-99.5,62.3,1,1,0,0,0,20,20);

	this.combo1 = new lib.combo_01();
	this.combo1.setTransform(170,140,1,1,0,0,0,170,140);

	this.combo2 = new lib.combo_02();
	this.combo2.setTransform(150,140,1,1,0,0,0,150,140);

	this.combo3 = new lib.combo_03();
	this.combo3.setTransform(170,130,1,1,0,0,0,160,125);

	this.instance.mask = this.instance_1.mask = this.instance_2.mask = this.instance_3.mask = this.instance_4.mask = this.instance_5.mask = this.instance_6.mask = this.instance_7.mask = this.instance_8.mask = this.instance_9.mask = this.instance_10.mask = this.instance_11.mask = this.combo1.mask = this.combo2.mask = this.combo3.mask = mask;
	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.combo3},{t:this.combo2},{t:this.combo1},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},26).wait(99));

	// エフェクト_特防アップ
	this.instance_12 = new lib.エフェクト_特防アップ();
	this.instance_12.setTransform(160,100,1,1,0,0,0,160,100);
	this.instance_12._off = true;

	this.instance_12.mask = mask;
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(70).to({_off:false},0).wait(55));

	// 応援
	this.main = new lib.応援();
	this.main.setTransform(160,50,1,1,0,0,0,160,50);

	this.main.mask = mask;
	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.main}]}).wait(125));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-119.6,-111.9,441.7,372);


// symbols:
(lib.attack_bg_01 = function() {
	this.initialize(img.attack_bg_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,324,324);


(lib.common_eff_01 = function() {
	this.initialize(img.common_eff_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,16,16);


(lib.common_eff_03 = function() {
	this.initialize(img.common_eff_03);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,200);


(lib.common_eff_06 = function() {
	this.initialize(img.common_eff_06);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,32);


(lib.common_eff_07 = function() {
	this.initialize(img.common_eff_07);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,48,16);


(lib.common_eff_09 = function() {
	this.initialize(img.common_eff_09);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,86,86);


(lib.me_01 = function() {
	this.initialize(img.me_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.me_02 = function() {
	this.initialize(img.me_02);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.me_04 = function() {
	this.initialize(img.me_04);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.me_08 = function() {
	this.initialize(img.me_08);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.number_combo_00 = function() {
	this.initialize(img.number_combo_00);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_01 = function() {
	this.initialize(img.number_combo_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_02 = function() {
	this.initialize(img.number_combo_02);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_03 = function() {
	this.initialize(img.number_combo_03);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_04 = function() {
	this.initialize(img.number_combo_04);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_05 = function() {
	this.initialize(img.number_combo_05);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_06 = function() {
	this.initialize(img.number_combo_06);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_07 = function() {
	this.initialize(img.number_combo_07);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_08 = function() {
	this.initialize(img.number_combo_08);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_09 = function() {
	this.initialize(img.number_combo_09);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_moji = function() {
	this.initialize(img.number_combo_moji);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,32);


(lib.target_01 = function() {
	this.initialize(img.target_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_02 = function() {
	this.initialize(img.target_02);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_04 = function() {
	this.initialize(img.target_04);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.yell_eff_yellow_01 = function() {
	this.initialize(img.yell_eff_yellow_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_02 = function() {
	this.initialize(img.yell_eff_yellow_02);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_03 = function() {
	this.initialize(img.yell_eff_yellow_03);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_04 = function() {
	this.initialize(img.yell_eff_yellow_04);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_05 = function() {
	this.initialize(img.yell_eff_yellow_05);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,70);


(lib.yell_magicguardup_01 = function() {
	this.initialize(img.yell_magicguardup_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_02 = function() {
	this.initialize(img.yell_magicguardup_02);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_03 = function() {
	this.initialize(img.yell_magicguardup_03);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_04 = function() {
	this.initialize(img.yell_magicguardup_04);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_05 = function() {
	this.initialize(img.yell_magicguardup_05);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_massage_01 = function() {
	this.initialize(img.yell_massage_01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,284,86);


(lib.target_08 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.me_08();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib.me_04();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_2 = new lib.me_02();

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_3 = new lib.me_01();

	this.addChild(this.instance_3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_04_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_4 = new lib.target_04();

	this.addChild(this.instance_4);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_02_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_5 = new lib.target_02();

	this.addChild(this.instance_5);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.target_01_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_6 = new lib.target_01();

	this.addChild(this.instance_6);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.yell_massage_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_7 = new lib.yell_massage_01();

	this.addChild(this.instance_7);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,284,86);


(lib.common_eff_09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_8 = new lib.common_eff_09();

	this.addChild(this.instance_8);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,86,86);


(lib.common_eff_07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_9 = new lib.common_eff_07();

	this.addChild(this.instance_9);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,48,16);


(lib.common_eff_06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_10 = new lib.common_eff_06();

	this.addChild(this.instance_10);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,64,32);


(lib.common_eff_03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_11 = new lib.common_eff_03();

	this.addChild(this.instance_11);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,100,200);


(lib.common_eff_02 = function() {
	this.initialize();

	// レイヤー 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABQhPIAACfIifAAIAAifICfAA").cp();
	this.shape.setTransform(8,8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,16,16);


(lib.common_eff_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_12 = new lib.common_eff_01();

	this.addChild(this.instance_12);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,16,16);


(lib.attack_bg_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_13 = new lib.attack_bg_01();

	this.addChild(this.instance_13);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,324,324);


(lib.yell_magicguardup_05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_14 = new lib.yell_magicguardup_05();

	this.addChild(this.instance_14);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_15 = new lib.yell_magicguardup_04();

	this.addChild(this.instance_15);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_16 = new lib.yell_magicguardup_03();

	this.addChild(this.instance_16);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_17 = new lib.yell_magicguardup_02();

	this.addChild(this.instance_17);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_magicguardup_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_18 = new lib.yell_magicguardup_01();

	this.addChild(this.instance_18);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,60);


(lib.yell_eff_yellow_05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_19 = new lib.yell_eff_yellow_05();

	this.addChild(this.instance_19);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,90,70);


(lib.yell_eff_yellow_04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_20 = new lib.yell_eff_yellow_04();

	this.addChild(this.instance_20);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_21 = new lib.yell_eff_yellow_03();

	this.addChild(this.instance_21);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_22 = new lib.yell_eff_yellow_02();

	this.addChild(this.instance_22);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.yell_eff_yellow_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_23 = new lib.yell_eff_yellow_01();

	this.addChild(this.instance_23);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,90,26);


(lib.common_eff_13 = function() {
	this.initialize();

	// レイヤー 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC000").s().p("ABQBPIifAAIAAieICfAAIAACe").cp();
	this.shape_1.setTransform(8,8);

	this.addChild(this.shape_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,16,16);


(lib.number_combo_moji_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_24 = new lib.number_combo_moji();

	this.addChild(this.instance_24);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,100,32);


(lib.number_combo_09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_25 = new lib.number_combo_09();

	this.addChild(this.instance_25);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_08_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_26 = new lib.number_combo_08();

	this.addChild(this.instance_26);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_27 = new lib.number_combo_07();

	this.addChild(this.instance_27);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_28 = new lib.number_combo_06();

	this.addChild(this.instance_28);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_29 = new lib.number_combo_05();

	this.addChild(this.instance_29);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_30 = new lib.number_combo_04();

	this.addChild(this.instance_30);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_31 = new lib.number_combo_03();

	this.addChild(this.instance_31);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_32 = new lib.number_combo_02();

	this.addChild(this.instance_32);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_33 = new lib.number_combo_01();

	this.addChild(this.instance_33);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.number_combo_00_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_34 = new lib.number_combo_00();

	this.addChild(this.instance_34);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40,40);


(lib.com = function() {
	this.initialize();

	// レイヤー 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0)").s().p("ADhD6InBAAIAAnzIHBAAIAAHz").cp();
	this.shape_2.setTransform(22.5,25);

	this.addChild(this.shape_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,45,50);


(lib.応援 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// 暗転02
	this.instance_35 = new lib.common_eff_02();
	this.instance_35.setTransform(561.1,100,21,13,0,0,0,8,8.1);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(45).to({_off:false},0).wait(1).to({regY:8,x:461.1,y:98.7},0).wait(1).to({x:361.1},0).wait(1).to({x:261.1},0).wait(1).to({x:161.1},0).wait(2).wait(1).to({x:61.1},0).wait(1).to({x:-38.7},0).wait(1).to({x:-138.7},0).wait(1).to({x:-238.7},0).to({_off:true},1).wait(69));

	// 暗転01
	this.instance_36 = new lib.common_eff_03_1();
	this.instance_36.setTransform(350,100,1,1,0,0,0,50,100);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(45).to({_off:false},0).wait(1).to({x:250},0).wait(1).to({x:150},0).wait(1).to({x:50},0).wait(1).to({x:-49.8},0).to({_off:true},1).wait(1).to({regX:48.4,regY:100.3,skewY:180,x:360,_off:false},0).wait(1).to({regX:50,regY:100,x:258.4,y:99.7},0).wait(1).to({x:158.4},0).wait(1).to({x:58.4},0).wait(1).to({x:-41.4},0).to({_off:true},1).wait(69));

	// びっくりエフェクト
	this.instance_37 = new lib.common_eff_06_1();
	this.instance_37.setTransform(190,90,0.5,0.5,-44.9,0,0,32.3,16);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(58).to({_off:false},0).wait(1).to({regX:32,scaleX:1,scaleY:1,x:189.8,y:90.1},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(61));

	// セリフ
	this.instance_38 = new lib.yell_massage_01_1();
	this.instance_38.setTransform(20,50,1,1,0,0,0,142,43);
	this.instance_38.alpha = 0.301;

	this.instance_39 = new lib.common_eff_09_1();
	this.instance_39.setTransform(160,50,3,3,0,0,0,43,43);
	this.instance_39.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_38,p:{x:20,alpha:0.301}}]},22).to({state:[{t:this.instance_38,p:{x:66.7,alpha:0.533}}]},1).to({state:[{t:this.instance_38,p:{x:113.3,alpha:0.767}}]},1).to({state:[{t:this.instance_38,p:{x:160,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:155,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:160,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:158,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:160,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:160.4,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:160.7,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:161.1,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:161.4,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:161.8,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:162.1,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:162.5,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:162.9,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:163.2,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:163.6,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:163.9,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:164.3,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:164.6,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:165,alpha:1}}]},1).to({state:[{t:this.instance_38,p:{x:210,alpha:0.667}}]},1).to({state:[{t:this.instance_38,p:{x:255,alpha:0.333}}]},1).to({state:[{t:this.instance_38,p:{x:300,alpha:0}}]},1).to({state:[]},1).to({state:[{t:this.instance_39,p:{scaleX:3,scaleY:3,alpha:0,y:50}}]},9).to({state:[{t:this.instance_39,p:{scaleX:2,scaleY:2,alpha:0.5,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:45}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:48}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:49}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[{t:this.instance_39,p:{scaleX:1,scaleY:1,alpha:1,y:50}}]},1).to({state:[]},1).wait(55));

	// 味方
	this.instance_40 = new lib.target_01_2();
	this.instance_40.setTransform(200,130,1,1,0,0,180,64,64);

	this.instance_41 = new lib.target_02_2();
	this.instance_41.setTransform(200,130,1,1,0,0,180,64,64);

	this.instance_42 = new lib.target_04_2();
	this.instance_42.setTransform(200,120,1,1,0,0,180,64,64);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_40,p:{y:130}}]},51).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:125}}]},1).to({state:[{t:this.instance_40,p:{y:120}}]},1).to({state:[{t:this.instance_40,p:{y:126}}]},1).to({state:[{t:this.instance_40,p:{y:132}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_40,p:{y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:200,y:130}}]},1).to({state:[{t:this.instance_41,p:{x:201,y:140}}]},1).to({state:[{t:this.instance_42,p:{y:120}}]},1).to({state:[{t:this.instance_42,p:{y:110}}]},1).to({state:[{t:this.instance_42,p:{y:100}}]},1).to({state:[{t:this.instance_42,p:{y:99.2}}]},1).to({state:[{t:this.instance_42,p:{y:98.3}}]},1).to({state:[{t:this.instance_42,p:{y:97.5}}]},1).to({state:[{t:this.instance_42,p:{y:96.7}}]},1).to({state:[{t:this.instance_42,p:{y:95.8}}]},1).to({state:[{t:this.instance_42,p:{y:95}}]},1).to({state:[{t:this.instance_42,p:{y:108.3}}]},1).to({state:[{t:this.instance_42,p:{y:121.7}}]},1).to({state:[{t:this.instance_42,p:{y:135}}]},1).to({state:[{t:this.instance_42,p:{y:132.5}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).to({state:[{t:this.instance_42,p:{y:130}}]},1).wait(1));

	// 味方_影
	this.instance_43 = new lib.common_eff_07_1();
	this.instance_43.setTransform(225,182,1,1,0,0,0,24,8);
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(51).to({_off:false},0).wait(6).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:1,scaleY:1},0).wait(9).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({x:226},0).wait(1).to({x:225},0).wait(1).to({y:192},0).wait(1).to({x:215,y:182},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({scaleX:0.79,scaleY:0.79},0).wait(1).to({scaleX:0.78,scaleY:0.78},0).wait(1).to({scaleX:0.78,scaleY:0.78},0).wait(1).to({scaleX:0.77,scaleY:0.77},0).wait(1).to({scaleX:0.76,scaleY:0.76},0).wait(1).to({scaleX:0.75,scaleY:0.75},0).wait(1).to({scaleX:0.83,scaleY:0.83,y:183.6},0).wait(1).to({scaleX:0.92,scaleY:0.92,y:185.3},0).wait(1).to({scaleX:1,scaleY:1,y:187},0).wait(1).to({y:184.5},0).wait(1).to({y:182},0).wait(16));

	// 白フラッシュ
	this.instance_44 = new lib.common_eff_01_1();
	this.instance_44.setTransform(160,100.7,22,14,0,0,0,8,8.1);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(94).to({_off:false},0).wait(1).to({regY:8,y:99.3,alpha:0.5},0).wait(1).to({alpha:1},0).wait(2).wait(1).to({alpha:0.833},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0.167},0).wait(1).to({alpha:0},0).wait(2).to({_off:true},1).wait(18));

	// 自分
	this.instance_45 = new lib.target_01_1();
	this.instance_45.setTransform(120,130,1,1,0,0,0,64,64);

	this.instance_46 = new lib.target_02_1();
	this.instance_46.setTransform(120,130,1,1,0,0,0,64,64);

	this.instance_47 = new lib.target_04_1();
	this.instance_47.setTransform(115,125,1,1,0,0,0,64,64);

	this.instance_48 = new lib.target_08();
	this.instance_48.setTransform(120,130,1,1,0,0,0,64,64);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_45}]}).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46,p:{y:130}}]},1).to({state:[{t:this.instance_46,p:{y:132}}]},1).to({state:[{t:this.instance_47,p:{y:125,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:117.5,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:110,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:121,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:132,rotation:0,x:115}}]},1).to({state:[{t:this.instance_46,p:{y:135}}]},1).to({state:[{t:this.instance_46,p:{y:135}}]},1).to({state:[{t:this.instance_47,p:{y:125,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:117.5,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:110,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:121,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:132,rotation:0,x:115}}]},1).to({state:[{t:this.instance_46,p:{y:135}}]},1).to({state:[{t:this.instance_46,p:{y:135}}]},1).to({state:[{t:this.instance_47,p:{y:130,rotation:0,x:115}}]},1).to({state:[{t:this.instance_47,p:{y:129.5,rotation:-2.4,x:113}}]},1).to({state:[{t:this.instance_47,p:{y:129,rotation:-4.9,x:111}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:121}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[{t:this.instance_48,p:{x:120}}]},1).to({state:[]},1).wait(75));

	// 自分_影
	this.instance_49 = new lib.common_eff_07_1();
	this.instance_49.setTransform(95,182,1,1,0,0,0,24,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(6).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:1,scaleY:1},0).wait(3).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:1,scaleY:1},0).wait(5).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(1).to({x:98},0).wait(1).to({x:97},0).wait(2).to({_off:true},1).wait(75));

	// 背景
	this.instance_50 = new lib.attack_bg_01_1();
	this.instance_50.setTransform(160,50,1,1,0,0,0,162,162);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(125));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-111.9,324,324);


(lib.エフェクト_特防アップ = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_54 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(54).call(this.frame_54));

	// 攻撃UP_05
	this.instance_51 = new lib.yell_magicguardup_05_1();
	this.instance_51.setTransform(250,120,0.5,0.5,0,0,0,30,30);
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(34).to({_off:false},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:95},0).wait(1).to({scaleX:1,scaleY:1,y:70},0).wait(1).to({y:65},0).wait(1).to({y:60},0).wait(1).to({y:70},0).wait(1).to({y:80},0).wait(1).to({y:90},0).wait(1).to({y:100},0).wait(1).to({y:97.5},0).wait(1).to({y:95},0).wait(1).to({y:97.5},0).wait(1).to({y:100},0).wait(9));

	// 攻撃UP_04
	this.instance_52 = new lib.yell_magicguardup_04_1();
	this.instance_52.setTransform(215,120,0.5,0.5,0,0,0,30,30);
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(33).to({_off:false},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:95},0).wait(1).to({scaleX:1,scaleY:1,y:70},0).wait(1).to({y:65},0).wait(1).to({y:60},0).wait(1).to({y:70},0).wait(1).to({y:80},0).wait(1).to({y:90},0).wait(1).to({y:100},0).wait(1).to({y:97.5},0).wait(1).to({y:95},0).wait(1).to({y:97.5},0).wait(1).to({y:100},0).wait(10));

	// 攻撃UP_03
	this.instance_53 = new lib.yell_magicguardup_03_1();
	this.instance_53.setTransform(173,120,0.5,0.5,0,0,0,30,30);
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(32).to({_off:false},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:95},0).wait(1).to({scaleX:1,scaleY:1,y:70},0).wait(1).to({y:65},0).wait(1).to({y:60},0).wait(1).to({y:70},0).wait(1).to({y:80},0).wait(1).to({y:90},0).wait(1).to({y:100},0).wait(1).to({y:97.5},0).wait(1).to({y:95},0).wait(1).to({y:97.5},0).wait(1).to({y:100},0).wait(11));

	// 攻撃UP_02
	this.instance_54 = new lib.yell_magicguardup_02_1();
	this.instance_54.setTransform(125,120,0.5,0.5,0,0,0,30,30);
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(31).to({_off:false},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:95},0).wait(1).to({scaleX:1,scaleY:1,y:70},0).wait(1).to({y:65},0).wait(1).to({y:60},0).wait(1).to({y:70},0).wait(1).to({y:80},0).wait(1).to({y:90},0).wait(1).to({y:100},0).wait(1).to({y:97.5},0).wait(1).to({y:95},0).wait(1).to({y:97.5},0).wait(1).to({y:100},0).wait(12));

	// 攻撃UP_01
	this.instance_55 = new lib.yell_magicguardup_01_1();
	this.instance_55.setTransform(75,120,0.5,0.5,0,0,0,30,30);
	this.instance_55._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(30).to({_off:false},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:95},0).wait(1).to({scaleX:1,scaleY:1,y:70},0).wait(1).to({y:65},0).wait(1).to({y:60},0).wait(1).to({y:70},0).wait(1).to({y:80},0).wait(1).to({y:90},0).wait(1).to({y:100},0).wait(1).to({y:97.5},0).wait(1).to({y:95},0).wait(1).to({y:97.5},0).wait(1).to({y:100},0).wait(13));

	// オーラ_地面_05
	this.instance_56 = new lib.yell_eff_yellow_01_1();
	this.instance_56.setTransform(225,180,1,1,0,0,180,45,13);
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(4).to({_off:false},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.5},0).to({_off:true},1).wait(29));

	// オーラ_地面_04
	this.instance_57 = new lib.yell_eff_yellow_02_1();
	this.instance_57.setTransform(225,180,1,1,0,0,180,45,13);
	this.instance_57._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(3).to({_off:false},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.5},0).to({_off:true},1).wait(30));

	// オーラ_地面_03
	this.instance_58 = new lib.yell_eff_yellow_03_1();
	this.instance_58.setTransform(225,180,1,1,0,0,0,45,13);
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(2).to({_off:false},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.5},0).to({_off:true},1).wait(31));

	// オーラ_地面_02
	this.instance_59 = new lib.yell_eff_yellow_02_1();
	this.instance_59.setTransform(225,180,1,1,0,0,0,45,13);
	this.instance_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(1).to({_off:false},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.5},0).to({_off:true},1).wait(32));

	// オーラ_地面_01
	this.instance_60 = new lib.yell_eff_yellow_01_1();
	this.instance_60.setTransform(225,180,1,1,0,0,0,45,13);

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(2).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.5},0).to({_off:true},1).wait(33));

	// オーラ_03
	this.instance_61 = new lib.yell_eff_yellow_04_1();
	this.instance_61.setTransform(225,120,1,1,0,0,0,45,13);
	this.instance_61.alpha = 0;
	this.instance_61._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(4).to({_off:false},0).wait(1).to({scaleX:0.88,scaleY:0.88,y:112.5,alpha:0.25},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:105,alpha:0.5},0).wait(1).to({scaleX:0.63,scaleY:0.63,y:97.5,alpha:0.75},0).wait(1).to({scaleX:0.5,scaleY:0.5,y:90,alpha:1},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:170,alpha:0.5},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:160,alpha:0.6},0).wait(1).to({scaleX:0.85,scaleY:0.85,y:150,alpha:0.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:140,alpha:0.8},0).wait(1).to({scaleX:0.95,scaleY:0.95,y:130,alpha:0.9},0).wait(1).to({scaleX:1,scaleY:1,y:120,alpha:1},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:114},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:108},0).wait(1).to({scaleX:0.7,scaleY:0.7,y:102},0).wait(1).to({scaleX:0.6,scaleY:0.6,y:96},0).wait(1).to({scaleX:0.5,scaleY:0.5,y:90},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:170,alpha:0.5},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:160,alpha:0.6},0).wait(1).to({scaleX:0.85,scaleY:0.85,y:150,alpha:0.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:140,alpha:0.8},0).wait(1).to({scaleX:0.95,scaleY:0.95,y:130,alpha:0.9},0).wait(1).to({scaleX:1,scaleY:1,y:120,alpha:1},0).to({_off:true},1).wait(29));

	// オーラ_02
	this.instance_62 = new lib.yell_eff_yellow_04_1();
	this.instance_62.setTransform(225,170,0.75,0.75,0,0,0,45,13);
	this.instance_62.alpha = 0;
	this.instance_62._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(4).to({_off:false},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:160,alpha:0.2},0).wait(1).to({scaleX:0.85,scaleY:0.85,y:150,alpha:0.4},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:140,alpha:0.6},0).wait(1).to({scaleX:0.95,scaleY:0.95,y:130,alpha:0.8},0).wait(1).to({scaleX:1,scaleY:1,y:120,alpha:1},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:114},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:108},0).wait(1).to({scaleX:0.7,scaleY:0.7,y:102},0).wait(1).to({scaleX:0.6,scaleY:0.6,y:96},0).wait(1).to({scaleX:0.5,scaleY:0.5,y:90},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:170,alpha:0.5},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:160,alpha:0.6},0).wait(1).to({scaleX:0.85,scaleY:0.85,y:150,alpha:0.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:140,alpha:0.8},0).wait(1).to({scaleX:0.95,scaleY:0.95,y:130,alpha:0.9},0).wait(1).to({scaleX:1,scaleY:1,y:120,alpha:1},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:114},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:108},0).wait(1).to({scaleX:0.7,scaleY:0.7,y:102},0).wait(1).to({scaleX:0.6,scaleY:0.6,y:96},0).wait(1).to({scaleX:0.5,scaleY:0.5,y:90},0).to({_off:true},1).wait(29));

	// オーラ_01
	this.instance_63 = new lib.yell_eff_yellow_05_1();
	this.instance_63.setTransform(225,170,1,0.75,0,0,0,45,35);
	this.instance_63.alpha = 0.5;
	this.instance_63._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(4).to({_off:false},0).wait(1).to({scaleY:0.79,y:168.6,alpha:0.524},0).wait(1).to({scaleY:0.82,y:167.1,alpha:0.548},0).wait(1).to({scaleY:0.86,y:165.7,alpha:0.571},0).wait(1).to({scaleY:0.89,y:164.3,alpha:0.595},0).wait(1).to({scaleY:0.93,y:162.9,alpha:0.619},0).wait(1).to({scaleY:0.96,y:161.4,alpha:0.643},0).wait(1).to({scaleY:1,y:160,alpha:0.667},0).wait(1).to({scaleY:1.04,y:158.6,alpha:0.69},0).wait(1).to({scaleY:1.07,y:157.1,alpha:0.714},0).wait(1).to({scaleY:1.11,y:155.7,alpha:0.738},0).wait(1).to({scaleY:1.14,y:154.3,alpha:0.762},0).wait(1).to({scaleY:1.18,y:152.9,alpha:0.786},0).wait(1).to({scaleY:1.21,y:151.4,alpha:0.81},0).wait(1).to({scaleY:1.25,y:150,alpha:0.833},0).wait(1).to({scaleY:1.29,y:148.6,alpha:0.857},0).wait(1).to({scaleY:1.32,y:147.1,alpha:0.881},0).wait(1).to({scaleY:1.36,y:145.7,alpha:0.905},0).wait(1).to({scaleY:1.39,y:144.3,alpha:0.929},0).wait(1).to({scaleY:1.43,y:142.9,alpha:0.952},0).wait(1).to({scaleY:1.46,y:141.4,alpha:0.976},0).wait(1).to({scaleY:1.5,y:140,alpha:1},0).to({_off:true},1).wait(29));

	// 赤フラッシュ
	this.instance_64 = new lib.common_eff_13();
	this.instance_64.setTransform(160,100,22,14,0,0,0,8,8);
	this.instance_64.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(1).to({alpha:0.008},0).wait(1).to({alpha:0.016},0).wait(1).to({alpha:0.024},0).wait(1).to({alpha:0.032},0).wait(1).to({alpha:0.04},0).wait(1).to({alpha:0.048},0).wait(1).to({alpha:0.056},0).wait(1).to({alpha:0.064},0).wait(1).to({alpha:0.072},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0.088},0).wait(1).to({alpha:0.096},0).wait(1).to({alpha:0.104},0).wait(1).to({alpha:0.112},0).wait(1).to({alpha:0.12},0).wait(1).to({alpha:0.128},0).wait(1).to({alpha:0.136},0).wait(1).to({alpha:0.144},0).wait(1).to({alpha:0.152},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.168},0).wait(1).to({alpha:0.176},0).wait(1).to({alpha:0.184},0).wait(1).to({alpha:0.192},0).wait(1).to({alpha:0.2},0).to({_off:true},1).wait(29));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.9,-11.9,352,224);


(lib.combo_03 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24).call(this.frame_24));

	// コンボ_1の位
	this.c3_num2 = new lib.com();
	this.c3_num2.setTransform(230,125,4,4,0,0,0,20,20);
	this.c3_num2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.c3_num2).wait(4).to({_off:false},0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:237.5,y:141.7},0).wait(1).to({scaleX:2,scaleY:2,x:235,y:138.3},0).wait(1).to({scaleX:1,scaleY:1,x:232.5,y:135},0).wait(1).to({y:130},0).wait(1).to({y:132},0).wait(1).to({y:130},0).wait(15));

	// コンボ_10の位
	this.c3_num1 = new lib.com();
	this.c3_num1.setTransform(195,125,4,4,0,0,0,20,20);
	this.c3_num1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.c3_num1).wait(2).to({_off:false},0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:202.5,y:141.7},0).wait(1).to({scaleX:2,scaleY:2,x:200,y:138.3},0).wait(1).to({scaleX:1,scaleY:1,x:197.5,y:135},0).wait(1).to({y:130},0).wait(1).to({y:132},0).wait(1).to({y:130},0).wait(17));

	// コンボ_100の位
	this.c3_num0 = new lib.com();
	this.c3_num0.setTransform(160,125,4,4,0,0,0,20,20);

	this.timeline.addTween(cjs.Tween.get(this.c3_num0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:167.5,y:141.7},0).wait(1).to({scaleX:2,scaleY:2,x:165,y:138.3},0).wait(1).to({scaleX:1,scaleY:1,x:162.5,y:135},0).wait(1).to({y:130},0).wait(1).to({y:132},0).wait(1).to({y:130},0).wait(19));

	// コンボ
	this.instance_65 = new lib.number_combo_moji_1();
	this.instance_65.setTransform(250,160,1,1,0,0,0,50,16);
	this.instance_65._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(3).to({_off:false},0).wait(22));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(80,45,180,200);


(lib.combo_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24).call(this.frame_24));

	// コンボ_1の位
	this.c2_num1 = new lib.com();
	this.c2_num1.setTransform(185,140,4,4,0,0,0,20,20);
	this.c2_num1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.c2_num1).wait(2).to({_off:false},0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:192.5,y:156.7},0).wait(1).to({scaleX:2,scaleY:2,x:190,y:153.3},0).wait(1).to({scaleX:1,scaleY:1,x:187.5,y:150},0).wait(1).to({y:145},0).wait(1).to({y:147},0).wait(1).to({y:145},0).wait(17));

	// コンボ_10の位
	this.c2_num0 = new lib.com();
	this.c2_num0.setTransform(150,140,4,4,0,0,0,20,20);

	this.timeline.addTween(cjs.Tween.get(this.c2_num0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:157.5,y:156.7},0).wait(1).to({scaleX:2,scaleY:2,x:155,y:153.3},0).wait(1).to({scaleX:1,scaleY:1,x:152.5,y:150},0).wait(1).to({y:145},0).wait(1).to({y:147},0).wait(1).to({y:145},0).wait(19));

	// コンボ
	this.instance_66 = new lib.number_combo_moji_1();
	this.instance_66.setTransform(250,145,1,1,0,0,0,50,16);
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(2).to({_off:false},0).wait(23));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(70,60,180,200);


(lib.combo_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24).call(this.frame_24));

	// コンボ_1の位
	this.c1_num0 = new lib.com();
	this.c1_num0.setTransform(170,140,4,4,0,0,0,20,20);

	this.timeline.addTween(cjs.Tween.get(this.c1_num0).wait(1).to({regX:22.5,regY:25,scaleX:3,scaleY:3,x:177.5,y:156.7},0).wait(1).to({scaleX:2,scaleY:2,x:175,y:153.3},0).wait(1).to({scaleX:1,scaleY:1,x:172.5,y:150},0).wait(1).to({y:145},0).wait(1).to({y:147},0).wait(1).to({y:145},0).wait(19));

	// コンボ
	this.instance_67 = new lib.number_combo_moji_1();
	this.instance_67.setTransform(240,145,1,1,0,0,0,50,16);
	this.instance_67._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(1).to({_off:false},0).wait(24));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(90,60,180,200);

})(lib = lib||{}, img = img||{}, createjs = createjs||{});
var lib, img, createjs;this.lib = lib;

		}
	};
return Data;
});