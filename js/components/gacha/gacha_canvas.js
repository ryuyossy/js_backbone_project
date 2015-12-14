define([
	'components/common/canvas'
], function(
	Canvas
){
	var Model = Canvas.Model.extend({
		//Flashから書き出されたManifestファイルを、
		//jsonで受け取った演出状態に応じて書き換ぇるメソッド
		filterManifest : function(pre){
			this._super(pre);
			var self = this;
			var json = this.get('createjsJson');

			var serif_patterns = [];

			var type = this.page.model.get('extended_page_data').type;
			var draw_count = this.page.model.get('query').draw_count;

			switch(type){
				case 'normal':
					switch(json.pattern_id){
						case 1:
							if(json.equips.some(function(equip){ return equip.rarity >= 2	})){
								serif_patterns = [4,5,6];
							}else{
								serif_patterns = [1,2,3];
							}
							break;
						case 2:
							serif_patterns = [7,8,9];
							break;
						case 3:
							serif_patterns = [10,11,12];
							break;
					}
				break;
				case 'rare':
					if(draw_count > 1){
						switch(json.pattern_id){
							case 1:
								serif_patterns = [1,2,3,4,5,6];
								break;
							case 2:
								serif_patterns = [7,8,9,10,11,12];
								break;
							case 3:
								serif_patterns = [13,14,15,16,17,18];
								break;
						}
					}else{
						switch(json.pattern_id){
							case 1:
							case 2:
								serif_patterns = [1,2,3,4,5,6];
								break;
							case 3:
							case 4:
								serif_patterns = [7,8,9,10,11,12];
								break;
							case 5:
							case 6:
								serif_patterns = [13,14,15,16,17,18];
								break;
							case 7:
							case 8:
								serif_patterns = [1,2,3,4,5,6];
								break;
						}
					}
				break;
			}

			var serif_pattern_id = ("0" + serif_patterns[~~(Math.random() * serif_patterns.length)]).slice(-2);

			var post = pre.map(function(manifest){
				var m = _.extend({},manifest);
				if(m.id == 'gacha_massage_01'){
					m.src = 'img/canvas/gacha_' + type + '_massage_' + serif_pattern_id + '.png';
				}else if(m.id == 'gacha_card') {
					m.src = 'img/equip/' + json.equips[0].equip_id + '_128.png';
				}else if(m.id == 'gacha_cha'){
					m.src = 'img/canvas/gacha_cha_0' + (json.pattern_id + 1) + '.png';
				}else{
					if(draw_count > 1){
						for(var i = 1; i <= draw_count; i++){
							if(m.id == 'gacha_card' + i){
								m.src = 'img/equip/' + json.equips[(i - 1)].equip_id + '_128.png';
							}
						}
					}
					var regex = /(gacha10_box)_(0[1-5])/;
					var result = m.id.match(regex);
					if(result != null){
						m.src = 'img/canvas/' + result[1] + '0' + (json.pattern_id + 1) + '_' + result[2] + '.png';
					}

					if(json.special_bg){
						var regex = /gacha_bg_([0-9]{2})/;
						var result = m.id.match(regex);
						if(result != null){
							m.src = 'img/canvas/gacha_bg_' + ("0" + (Math.ceil(Number(result[1]) / 4) * 4 - 2)).slice(-2) + '.png';
						}

						if(m.id == 'special_bg'){
							m.src = 'img/canvas/' + json.special_bg + '.png';
						}
					}
				}
				return m;
			});

			if(!json.special_bg){
				post = post.filter(function(manifest){
					return manifest.id != 'special_bg';
				});
			}

			if(draw_count && draw_count > 1){
				post = post.filter(function(m){
					var result = m.id.match(/gacha_card({0-9})/);
					if(!result) return true;
					return result[1] <= draw_count;
				});
			}
			return post;
		}
	});
	var View = Canvas.View.extend({
		el : '#fullScreen',
		load : function(){
			var self = this;
			var name;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var draw_count = this.page.model.get('query').draw_count - 0;
			var type = this.page.model.get('extended_page_data').type;
			var pattern_id = this.getPatternId(type, draw_count, page_data.equips);

			if(type == 'rare' && draw_count > 1){
				name = 'gacha_rare_multi';				
			}else{
				var pattern_name = type + ((draw_count > 1) ? '_multi' : '');
				var pattern_count = {
					normal : 3,
					rare : 8
				};
				name = 'gacha_' + pattern_name + pattern_id;				
			}
			page_data.pattern_id = pattern_id;

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(GachaManifest){
					self.model.set({
						createjsJson : page_data,
						manifest : GachaManifest.Manifest,
						name : name
					});
				}
			);
		},
		getPatternId : function(type, draw_count, equips){
			switch(type){
				case 'normal':
						if(equips.some(function(equip){ return equip.rarity >= 4 })) return 3;
						if(equips.some(function(equip){ return equip.rarity == 3 })) return 2;
						return 1;
					break;
				case 'rare':
					if(draw_count && draw_count > 1){
						if(equips.some(function(equip){ return equip.rarity >= 5 })) return 3;
						if(equips.some(function(equip){ return equip.rarity == 4})) return 2;
						return 1;
					}else{
						var rarity = equips[0].rarity;
						var list;
						if(rarity >= 5) list = [5,6,8];
						if(rarity == 4) list = [3,4,7];
						if(rarity <= 3) list = [1,2];
						return list[(Math.random() * list.length | 0)];
					}					
					break;
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});