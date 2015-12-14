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

			if(json.boy_avatar_id != json.avatar_id){
				var avatar_id_regex = new RegExp('^id' + json.boy_avatar_id + '_(.+)$');
			}

			var avatars_special_weapon = {
				'31003':['abijity_eff_16'],
				'21003':['abijity_eff_11']
			}
			if(_.has(avatars_special_weapon, json.avatar_id)){
				var special_weapons = avatars_special_weapon[json.avatar_id];
			}

			var post = pre.map(function(m){
				var obj = _.extend({},m);
				if(avatar_id_regex){
					var result = obj.id.match(avatar_id_regex);
					if(result != null) {
						var filename = 'id' + json.avatar_id + '_' + result[1] + '.png';
						obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}
				}

				if(obj.id == 'attack_id' + json.boy_avatar_id + '_massage'){
					var filename = 'attack_id' + json.avatar_id + '_massage' + '.png';
					if(json.maxflash) filename = 'max_' + filename;
					obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}

				var result = obj.id.match(/^enemy_([01][19])$/);
				if(result != null) {
					var filename = 'id' + json.target.avatar_id + '_' + result[1] + '.png';
					obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}

				if(json.maxflash){
					var result = obj.id.match(/^number_damage_([0-9])$/);
					if(result != null) {
						var filename = 'max_' + result[0] + '.png';
						obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}
				}

				if(json.members){
					var regex = new RegExp('^combo_member_([1-3])$');
					var result = m.id.match(regex);
					if(result != null) {
						var i = Number(result[1]);
						if(json.members.length >= i){
							var filename = 'attackgauge_id' + json.members[i-1].avatar_id + '.png';
							obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename).replace('/canvas/','/assets/');
						}
					}
				}

				if(special_weapons){
					special_weapons.forEach(function(weapon_id){
						if(obj.id == weapon_id){
							var filename = weapon_id + '_id' + json.avatar_id + '.png';
							obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
						}
					});
				}
				return obj;
			});
			return post;
		}
	});
	var View = Canvas.View.extend({
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var avatar_id = self.page.model.user.get('avatar_id') || page_data.avatar_id;
			var boy_avatar_id = avatar_id.replace(/[0-9]{2}$/,'01');
			var name = 'id' + boy_avatar_id + '_attack';

			page_data.avatar_id = avatar_id;
			page_data.boy_avatar_id = boy_avatar_id;
			page_data.combo = page_data.combo_users.length;

			page_data.members = page_data.combo_users;
			page_data.members.splice(0,1);
			page_data.members = page_data.members.splice(-3);
			page_data.maxflash = (page_data.tension_max_flg || self.page.model.user.get('power') == 100) ? true : false;

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(AttackManifest){
					self.model.set({
						createjsJson : page_data,
						manifest : AttackManifest.Manifest,
						name : name,
						next_url : 'battle/'
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