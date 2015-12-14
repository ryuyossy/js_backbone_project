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

			var dir_list = {'1':'equip', '2':'material', '3':'material', '4':'equip', '5':'equip'};
			var material_dir = dir_list[json.material_type];

			var post = pre.map(function(m){
				var ret = {
					id : m.id,
					src : m.src
				};
				if(m.id == 'gacha_card'){
					ret.src = 'img/equip/' + json.equip_id + '_128.png';
				}else if(m.id == 'compo_bg_01'){
					ret.src = 'img/canvas/compo_bg_' + (json.flgs.indexOf('limit') > -1 ? '02' : '01') + '.png';
				}else{
					var materials_length = json.materials_id.length;
					for(var i = 1; i <= materials_length; i++){
						if(m.id == 'gacha_card' + i){
							ret.src = 'img/' + material_dir + '/' + json.materials_id[(i - 1)]
							+ ((material_dir == 'equip') ? '_128':'') + '.png';
						}
					}
				}
				return ret;
			}).filter(function(m){
				return !(/gacha_card[0-9]/.test(m.src));
			});
			return post;
		}
	});
	var View = Canvas.View.extend({
		model : new Model(),
		el : '#fullScreen',
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var result = page_data.compose_result;
			var total_compose_num = self.page.model.get('form_data').total_compose_num;
			var material_type = page_data.material_type;

			var name = 'compose' + ((material_type >= 2 && material_type <=4) ? '_single' : '');

			var flgs = [];
			if(result.is_level_up) flgs.push('lvup');
			if(material_type == 4) flgs.push('limit');
			if(result.before.attribute.level < result.after.attribute.level) flgs.push('attr');

			if(!page_data.equips_id.length) page_data.equips_id = null;
			
			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(BossManifest){
					self.model.set({
						createjsJson : {
							total_compose_num : total_compose_num,
							flgs : flgs,
							equip_id : result.id,
							materials_id : page_data.equips_id || page_data.materials_id,
							material_type : material_type,
							big_success : result.big_success_flg
						},
						manifest : BossManifest.Manifest,
						name : name
					});
				}
			);
		}
	});
	return {
		Model : Model,
		View : View
	};
});