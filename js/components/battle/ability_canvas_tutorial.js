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
			var post = pre;

			//自分のアバター画像
			var regex_own = new RegExp('^own_([0-9]{2})$');
			post = post.map(function(m){
				var m = _.extend({},m);
				var result_own = m.id.match(regex_own);
				if(result_own != null) {
					var filename = 'id' + json.user.avatar_id + '_' + result_own[1] + '.png';
					m.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}else if(m.id == 'cutin') {
					var filename = 'cutin_id' + json.user.avatar_id + '.png';
					m.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}
				return m;
			});

			//ターゲットのアバター画像
			json.targets.forEach(function(target, i){
				var regex = new RegExp('^' + json.type + '_' + i +'_([0-9]{2})$');
				post = post.map(function(m){
					var m = _.extend({},m);
					var result = m.id.match(regex);
					if(result != null) {
						var filename = 'id' + target.avatar_id + '_' + result[1] + '.png';
						m.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}
					return m;
				});
			});

			//コンボメンバーのアバター画像
			json.members.forEach(function(member, i){
				var regex = new RegExp('^combo_member_' + (i + 1) + '$');
				post = post.map(function(m){
					var m = _.extend({},m);
					var result = m.id.match(regex);
					if(result != null) {
						var filename = 'attackgauge_id' + member.avatar_id + '.png';
						m.src = m.src.replace(/\/[^\/]+$/, '/' + filename).replace('/canvas/','/assets/');
					}
					return m;
				});
			});

			//必要なぃ画像のmanifestを削除
			if(json.targets.length < 5){
				var regex = new RegExp('^' + json.type + '_[' + json.targets.length + '-4]_[0-9]{2}$');
				post = post.filter(function(m){
					var result = m.id.match(regex);
					if(result != null) return false;
					return true;
				});
			}

			//テンションMAXかゲージMAXの時ゎダメージの数字とセリフ吹き出しの画像を変ぇる
			if(json.maxflash && json.type == 'attack'){
				post = post.map(function(m){
					var obj = _.extend({},m);
					var result = obj.id.match(/^number_damage_([0-9])$/);
					if(result != null) {
						var filename = 'max_' + result[0] + '.png';
						obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}

					var result = obj.id.match(/^abijity_massage_([0-9]{3})$/);
					if(result != null) {
						var filename = 'max_' + result[0] + '.png';
						obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}
					return obj;
				});
			}
			return post;
		}
	});
	var View = Canvas.View.extend({
		model : new Model(),
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var name = 'ability_' + ("00" + (this.page.model.user.get('ability_id') || page_data.ability_id)).slice(-3);
			page_data.members = [];

			if(page_data.combo_users.length){
				page_data.combo = page_data.combo_users.length;
				page_data.members = page_data.combo_users;
				page_data.members.splice(0,1);
				page_data.members = page_data.members.splice(-3);
			}

			var methods = page_data.methods;

			var attack_methods = methods.filter(function(method){
				return method.method_type == 'attack'
			});
			if(attack_methods.length){
				page_data.damage = attack_methods.map(function(method){
					var attr_damage = 0;
					if(method.attribute_effect){
						attr_damage = method.attribute_effect.map(function(effect){
							return effect.total_damage;
						}).reduce(function(x, y){
							return x + y;
						});
					}
					return method.total_damage + attr_damage;
				}).reduce(function(x, y){
					return x + y;
				});

				var targets = [];
				attack_methods.forEach(function(method){
					method.targets.forEach(function(target){
						if(targets.length == 0 || !_.where(targets, {user_id:target.user_id}).length){
							targets.push(target);
						}
					});
				});
				page_data.targets = targets;
				page_data.type = 'attack';
			}

			var recover_methods = methods.filter(function(method){
				return method.method_type == 'recover'
			});
			if(recover_methods.length){
				var targets = [];
				recover_methods.forEach(function(method){
					method.targets.forEach(function(target){
						if(targets.length == 0 || !_.where(targets, {user_id:target.user_id}).length){
							targets.push(target);
						}
					});
				});
				if(!page_data.targets){
					page_data.targets = targets;
					page_data.type = 'recover';
				}
			}

			var status_methods = methods.filter(function(method){
				return method.method_type == 'status'
			});
			if(status_methods.length){
				var targets = [];
				status_methods.forEach(function(method){
					method.targets.forEach(function(target){
						if(targets.length == 0 || !_.where(targets, {user_id:target.user_id}).length){
							targets.push(target);
						}
					});
				});
				if(!page_data.targets){
					page_data.targets = targets;
					page_data.type = 'status';
				}
			}

			//ユーザーのアバターID
			if( this.page.model.user.has('avatar_id') ){
				page_data.user = {
					avatar_id : this.page.model.user.get('avatar_id')
				};
			}

			page_data.maxflash = (page_data.tension_max_flg || self.page.model.user.get('power') == 100) ? true : false;

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(AbilityManifest){
					self.model.set({
						createjsJson : page_data,
						manifest : AbilityManifest.Manifest,
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