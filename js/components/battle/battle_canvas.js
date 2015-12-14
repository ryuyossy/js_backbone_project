define([
	'components/common/canvas',
	'createjs/battle_manifest'
], function(
	Canvas,
	BattleManifest
){
	var Model = Canvas.Model.extend({
		loadCanvasData : function(){
			var self = this;
			var dfd = new _.Deferred();
			var cjs_files = ['createjs/battle'];
			var json = this.get('createjsJson');
			[
				json.own_guild.fronts,
				json.enemy_guild.fronts
			].forEach(function(members){
				members.forEach(function(member, i){
					var prefix;
					if(member.fainted_flg){
						prefix = 'down';
					}else{
						prefix = (i === 0)?'leader':'sub';
					}
					cjs_files.push('createjs/battle_' + prefix + member.avatar_id)
				});
			});

			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/createjs/battle.js')},
				cjs_files,
				function(CreatejsContainer){
					self.cjs_container = CreatejsContainer;
					self.cjs_children = Array.prototype.splice.call(arguments,1);
					dfd.resolve();
				}
			);

			return dfd.promise();
		},
		//Flashから書き出されたManifestファイルを、
		//jsonで受け取った演出状態に応じて書き換ぇるメソッド
		filterManifest : function(pre){
			this._super(pre);

			var self = this;
			var post = [
				{src:"img/canvas/buttle_eff_01.png", id:"buttle_eff_01"},
				{src:"img/canvas/buttle_eff_02.png", id:"buttle_eff_02"},
				{src:"img/canvas/down_eff_01.png", id:"down_eff_01"},
				{src:"img/canvas/down_eff_02.png", id:"down_eff_02"}
			];

			var json = this.get('createjsJson');
			[
				json.own_guild.fronts,
				json.enemy_guild.fronts
			].forEach(function(members){
				members.forEach(function(member, i){
					var leader_flg = !!(i === 0);//0番目ならtrue
					post = self.addImgsToManifest(post, self.getImgsByAvatarId(pre, member, leader_flg));
				});
			});

			return post;
		},
		getImgsByAvatarId : function(manifest, member, leader_flg){
			var self = this;

			var prefix = '';
			if(member.fainted_flg){
				prefix = 'down_';
			}else if(!leader_flg){
				prefix = 'sub_';
			}

			var file_name_pattern = new RegExp('^' + prefix + 'cha' + member.avatar_id + '[^\\d]');

			return manifest.filter(function(manifest_img){
				return file_name_pattern.test(manifest_img['id'] + '_');
			});
		}
	});
	var View = Canvas.View.extend({
		el : "#canvas",
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			this.model.set({
				createjsJson : {
					own_guild : page_data.own_guild,
					enemy_guild : page_data.enemy_guild
				},
				manifest :_.extend(BattleManifest.Manifest, {}),
				name : 'battle'
			});
		},
		setExportRoot : function(){
			var self = this;
			var loaded_img = self.model.get('loadedImg');
			var createjs_json = self.model.get('createjsJson');
			self.model.cjs_children.forEach(function(child){
				child.initialize(loaded_img, createjs_json, createjs);
				self.model.cjs_container.lib = _.extend(self.model.cjs_container.lib, child.lib);
			});
			self.model.cjs_container.initialize(loaded_img, createjs_json, createjs);
			this.exportRoot = new this.model.cjs_container.lib[this.model.get('name')]();
			$('.jsLoaderBox').hide();
		}
	});
	return {
		Model : Model,
		View : View
	};
});