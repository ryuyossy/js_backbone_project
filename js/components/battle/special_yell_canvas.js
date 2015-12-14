define([
	'components/common/canvas'
], function(
	Canvas
	){
	var Model = Canvas.Model.extend({
		//Flashから書き出されたManifestファイルを、
		//jsonで受け取った演出状態に応じて書き換ぇるメソッド
		filterManifest : function(manifest){
			this._super(manifest);
			var self = this;
			var json = this.get('createjsJson');

			//ターゲットのアバター画像
			json.target.forEach(function(target, i){
				var regex = new RegExp('^attack_' + i +'_([0-9]{2})$');
				manifest = manifest.map(function(m){
					var m = _.extend({},m);
					var result = m.id.match(regex);
					if(result != null) {
						var filename = 'id' + target.avatar_id + '_' + result[1] + '.png';
						m.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
					}
					return m;
				});
			});
			
			manifest = this.replaceWithAvatarId(manifest, 'me', json.user.avatar_id);

			//コンボメンバーのアバター画像
			json.members.forEach(function(member, i){
				var regex = new RegExp('^combo_member_' + (i + 1) + '$');
				manifest = manifest.map(function(m){
					var m = _.extend({},m);
					var result = m.id.match(regex);
					if(result != null) {
						var filename = 'attackgauge_id' + member.avatar_id + '.png';
						m.src = m.src.replace(/\/[^\/]+$/, '/' + filename).replace('/canvas/','/assets/');
					}
					return m;
				});
			});

			if(json.user.avatar_id == json.user.boy_avatar_id) return manifest;

			var special_avatars = ['31003', '21003', '13003'];

			var manifest = manifest.map(function(m){
				var obj = _.extend({},m);
				var result = obj.id.match(/yell_massage_05$/);
				if(result != null) {
					var filename = 'yell_massage_05';
					if(_.indexOf(special_avatars, json.user.avatar_id) >= 0){
						filename = filename + '_id' + json.user.avatar_id
					}else{
						var filename = 'yell_massage_06';
					}
					filename = filename + '.png';
					if(json.maxflash) filename = 'max_' + filename;
					obj.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}
				return obj;
			});

			return manifest;
		},
		replaceWithAvatarId : function(pre, tmp_word, avatar_id){
			var post = pre.map(function(m){
				var m = _.extend({},m);
				var regex = new RegExp('^' + tmp_word + '_([0-1][0-9])$');
				var result = m.id.match(regex);
				if(result != null) {
					var filename = 'id' + avatar_id + '_' + result[1] + '.png';
					m.src = m.src.replace(/\/[^\/]+$/, '/' + filename);
				}
				return m;
			});
			return post;
		}
	});
	var View = Canvas.View.extend({
		load : function(){
			var self = this;
			var page_data = this.page.model.get('page_data');
			var name = 'special_yell_' + page_data.param_type;

			page_data.combo = page_data.combo_users.length;
			page_data.members = page_data.combo_users;
			page_data.members.splice(0,1);
			page_data.members = page_data.members.splice(-3);

			var avatar_id = this.page.model.user.get('avatar_id');
			page_data.user = {
				avatar_id : avatar_id,
				boy_avatar_id : avatar_id.replace(/[0-9]{2}$/,'01')
			};

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