$.views.helpers({
	root : function(arg){
		var func = function(self){
			var p = self.parent;
			return p.parent ? func(p) : p.data;
		};
		return arg ? func(this)[arg] : func(this);
	},
    // 10000000→10,000,000する
    commaFormat: function (val) {
        // undefined/nullのときは空文字。
        if (undefined === val || null === val) val = '';
        // 文字列に変換
        val += '';
        // 数値じゃなければ、return
        if (isNaN(val)) return val;
        // 余計なコンマを一度取り除く
        var num = val.replace(/,/g, '');
        // コンマを一つずつ挿入。置換しても値がかわらなくなったらwhileを抜ける。
        while(num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
        // return
        return num;
    },
	abs : function(num){
		return Math.abs(num);
	},
	getDateByISOString: function(ISOString){
		var date = new Date();
		date.setTime(Date.parse(ISOString + '+09:00') || Date.parse(ISOString));
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var day   = ("0" + date.getDate()).slice(-2);
		var hour  = ("0" + date.getHours()).slice(-2);
		var min   = ("0" + date.getMinutes()).slice(-2);
		return month + '/' + day + ' ' + hour + ':' + min;
	},
	getCommandTypeText: function(command){
		switch(command){
			case "attack":
				return '攻撃';
			case "yell":
				return 'エール';
		}
	},
	split: function(val, delimiter){
		return val.toString().split(delimiter);
	},
	itelator: function(from,to){
		var arr = [];
		if(!from) from = 0;
		if(!to) return arr;
		for(var i = from; i <= to; i++){
			arr.push(i);
		}
		return arr;
	},
	isPositive: function(number){
		return number > 0 ? true : false;
	},
	attribute_color: function(type){
		var list = {
			"光":"yellow",
			"闇":"purple",
			"炎":"red",
			"火":"red",
			"氷":"deepskyblue",
			"地":"saddlebrown",
			"雷":"yellow"
		};
		return list[type];
	},
	yellParamType : function(type){
		var list = {
			"attackPower":"攻撃力",
			"defencePower":"防御力",
			"specialAttackPower":"特別攻撃力",
			"specialDefencePower":"特別防御力"
		};
		return list[type];
	},
	getRarityText : function(num){
		var list = {"1":"N", "2":"HN", "3":"R", "4":"SR", "5":"SSR", "6":"LEGEND"};
		return list[num];
	},
	getRarityKanaText : function(num){
		var list = {"1":"ノーマル", "2":"ハイノーマル", "3":"レア", "4":"Sレア", "5":"SSレア", "6":"レジェンド"};
		return list[num];
	},
	getGrowClass : function(num){
		var list = {"1":"fast", "2":"ordinary", "3":"slow"};
		return list[num];
	},
	getGrowText : function(num){
		var list = {"1":"早熟", "2":"普通", "3":"晩成"};
		return list[num];
	},
	getMasterBonusText : function(num){
		var list = {"1":"力", "2":"技", "3":"知"};
		return list[num];
	},
	replaceSlash : function(str,to){
		return str.replace(/\//g,to);
	},
	existImageFile : function(pass, file, def){
		var img = new Image();
		img.src = pass + file + ".png";
		var flg = img.height > 0;
		if (!flg) {
			return pass + def + ".png";
		}
		return img.src;
	},
	equipStatus : function(status){
		if (status == 0){
			return "";
		}
		if (status == 1){
			return "メイン";
		}
		if (status == 2){
			return "サブ";
		}
	},
	someSentGift : function(equips){
		return equips.filter(function(equip){
			return equip.sent_gift_flg === true
		}).length
	},
	isProtect : function(flg){
		if (flg == true){
			return "保護中";
		}
		return "";
	},
	composeStep : function(step){
        var result = 0;
        for(var i=0;i<4;i++){
            if(i<step){
              result = result + 25;
            }
        }
        return result;
    },
	size : function(data){
		console.log(data);
		return data;
	},
	zeroPadding : function(value, num) {
		var s = '';
		for (var i = 0; i < num; i++) {
			s += '0';
		}
		s += value;
		var length = String(value).length;
		return (s).slice(-(length > num ? length : num));
	},
	unknownParterNum : function(currentPartnersNum){
		var array = [];
		for (var i = 0; i < 2 - currentPartnersNum; i++){
			array.push(i);
		}
		return array;
	},
	datetimeToJpSignage : function(datetime){
		var date = new Date(datetime);
		return (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
	},
	datetimeToJpSignageWithoutTime : function(datetime){
		var date = new Date(datetime);
		return (date.getMonth() + 1) + '月' + date.getDate() + '日';
	},
	chapterToNavicoCharacter : function(chapterId){
		var characters = {
			1: 'navico_chara',
			2: 'senshi_chara',
			3: 'taicho_chara',
			4: 'joshi_chara',
			5: 'king_chara'
		};
		return characters[chapterId];
	},
	chapterToNavicoArc : function(chapterId){
		var characters = {
			1: 'navico_arc',
			2: 'senshi_arc',
			3: 'taicho_arc',
			4: 'joshi_arc',
			5: 'king_arc'
		};
		return characters[chapterId];
	},
	numberToChaineseNumeral : function(num){
		var chaineseNum =
			{ 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' };
		return chaineseNum[num];
	},
	nextGoRoundJex : function(abilities){
		for (var i = 0; i < abilities.length; i++){
			if (abilities[i].remaining_jex > 0) return abilities[i].remaining_jex;
		}
		return 0;
	},
	getDayFromDate : function(date){
		var day = ['日', '月', '火', '水', '木', '金', '土'];
		var d = new Date(date);
		return day[d.getDay()];
	},
	getMonth : function(date){
		var d = new Date(date);
		return d.getMonth() + 1;
	}
});
$.views.converters({
	truncate : function(val){
		// 省略文字の初期値を設定
		var count = 0;
		var str = [];
		var isMultiByte;
		for (i=0; i < val.length; i++){
			// エンコードしたときの文字数でバイト数を判定
			isMultiByte = escape(val.charAt(i)).length >= 4;
			isMultiByte ? count+=2 : count++;
			// 制限文字数をチェックして、超えていたら省略文字をつけて終了
			if( count > 16 ){
				isMultiByte = escape(val.charAt(i-2)).length >= 4;
				if( !isMultiByte ) str[i-2] = '';
				str[i-1] = '…';
				break;
			}
			str[i] = val.charAt(i);
		}
		return str.join("");
	},
	round : function(num){
		// 四捨五入
		return Math.round(num);
	},
	percent : function(num){
		// ％を求める
		return Math.round(num * 100);
	}
});
$.views.tags({
	datetime : function(unix_time){
		var date = new Date();
		date.setTime(unix_time);
		var format = this.props.format || 'yyyy/MM/dd HH:mm:ss';
		format = new DateFormat(format);
		return format.format(date); 
	},
	getToday : function(){
		var date = new Date();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var today = {
			year : date.getFullYear(),
			month : month < 10 ? "0"+month : month,
			day : day < 10 ? "0"+day : day
		};
		return today.year+"-"+today.month+"-"+today.day;
	},
	escape : function() {
		return this.tmpl.markup.replace(/\\/g, "").replace(/\{\{/g, "{\{").replace(/\}\}/g, "}\}");
	},

	sort: function( array ){
		var ret = "";
		if ( this.props.reverse ) {
			// Render in reverse order
			for ( var i = array.length; i; i-- ) {
				ret += this.renderContent( array[ i - 1 ] );
			}
		} else {
			// Render in original order
			ret += this.renderContent( array );
		}
		return ret;
	},

	// {{filter users prop="back_flg" value=true}}
	filter: function( array ) {
		var ret = "";
		var self = this;
		var i = 0;
		array.forEach(function(arr){
			if(arr[self.props.prop] === self.props.value){
				arr['index'] = i;
				i++;
				ret += self.renderContent( arr );
			}
		});
		if(i === 0){
			ret += self.renderContent( undefined );
		}

		return ret
	},

	// {{getImgRoot/}}
	getImgRoot : function(){
		return RS.get('img_url_root', false);
	},

	// {{equipThumb equip_id=id step=step size="medium" /}}
	// size: small | midium | large
	equipThumb : function(){
		var size = this.props.size.replace(/^./,function(w){return w.toUpperCase()});
		this.tmpl = "#jsTemplateEquipThumb" + size;
		this.data = {
			id : this.props.equip_id,
			step : this.props.step,
			get_flg : this.props.get_flg!==false
		};
		return this.renderContent(this.data);
	},
	// {{giftThumb type=gift_item_type id=gift_item_id /}}
	// gift_item_type 1:アイテム 2:素材 3:武具 4:ガチャP 5:お金 6:ガチャチケット 7:秘宝　8:レアメダル 9:経験値
	giftThumb : function(){
		this.tmpl = "#jsTemplateGiftThumb";
		this.data = _.extend(this.data, this.props);
		return this.renderContent(this.data);
	},
	// {{growType grow_type=grow_type /}}
	// grow_type: 1(早熟) | 2(普通) | 3(晩成)
	growTypeTag : function(){
		this.tmpl = "#jsTemplateGrowType";
		var grow_type = this.props.grow_type;
		this.data = {
			grow_type : grow_type
		};
		return this.renderContent(this.data);
	},
	// エンブレム取得状況を表示するとき
	// {{emblemGotState current_emblems=current_emblems /}}
	// 加えてNEWマークを表示したいとき
	// {{emblemGotState current_emblems=current_emblems before_emblems=before_emblems /}}
	emblemGotState : function(){
		var currentEmblems = this.props.current_emblems;
		var beforeEmblems = this.props.before_emblems || this.props.current_emblems;
		var newEmblems = [];
		var gap;
		for (var i = 0; i < currentEmblems.length; i++){
			gap = currentEmblems[i].current_num - beforeEmblems[i].current_num;
			if (gap != 0){
				newEmblems.push({ new_num : gap });
			} else {
				newEmblems.push({ new_num : 0 });
			}
		}
		for (i = 0; i < newEmblems.length; i++){
			currentEmblems[i] = _.extend(currentEmblems[i], newEmblems[i]);
		}
		this.tmpl = '#jsTemplateEmblemGotState';
		this.data = {
			current_emblems : currentEmblems
		};
		return this.renderContent(this.data);
	},
	// {{jobChangeConditions conditions=conditions /}}
	jobChangeConditions : function(){
		this.tmpl = '#jsTemplateJobChangeConditions';
		this.data = {
			conditions : this.props.conditions
		};
		return this.renderContent(this.data);
	},
	// {{rareGachaNewsList rare_gacha_news=rare_gacha_news /}}
	rareGachaNewsList : function(){
		this.tmpl = '#jsTemplateRareNewsList';
		this.data = {
			rare_gacha_news : this.props.rare_gacha_news
		};
		return this.renderContent(this.data);
	},
	// {{randomBanner emblems=current_emblems /}}
	// シーズンアバター用のランダムヘッダーバナーを表示する
	// {{randomBanner /}}
	// 通常のSR武具のランダムヘッダーバナーを表示する
	randomHeaderBanner : function(){
		var emblems = this.props.emblems || false;
		var type = emblems ? 2 : 1;
		var avatarIds = [];
		var equipIds = [140005,140014,150002,240006,240015,250010];
		if (emblems){
			for(var i = 0; i < emblems.length; i++){
				avatarIds.push(emblems[i].avatar_id);
			}
		}
		var ids = type === 1 ? equipIds : avatarIds;
		var id = ids[Math.random() * ids.length | 0];
		this.tmpl = '#jsTemplateRandomHeaderBanner';
		this.data = {
			type : type,
			id : id
		};
		return this.renderContent(this.data);
	}
});
