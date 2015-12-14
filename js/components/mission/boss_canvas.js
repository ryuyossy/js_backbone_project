define([
	'components/common/canvas'
], function(
	Canvas
){
	var Model = Canvas.Model.extend({
		loadCanvasData : function(createjsMainFile){
			var self = this;
			var dfd = new _.Deferred();
			var cjs_files = [createjsMainFile];
			var json = this.get('createjsJson');

			json.partners.concat(json.user).forEach(function(member){
				cjs_files.push('createjs/questboss_id' + member.avatar_id)
			});

			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/createjs/questboss_avatars.js')},
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
			var json = this.get('createjsJson');
			var page_query = this.page.model.get('query');
			var zerofilled_stage_id = ("0" + page_query.stage_id).slice(-2);
			var post = pre.map(function(manifest){
				var m = _.extend({},manifest);
				switch(m.id){
					case 'quest_USER_01':
						m.src = 'img/canvas/quest_id' + json.user.avatar_id + '_01.png';
						break;
					case 'quest_PARTNER0_01':
						m.src = 'img/canvas/quest_id' + json.partners[0].avatar_id + '_01.png';
						break;
					case 'quest_PARTNER1_01':
						m.src = 'img/canvas/quest_id' + json.partners[1].avatar_id + '_01.png';
						break;
					case 'questbg01_STAGE':
						m.src = 'img/assets/questbg01_' + zerofilled_stage_id + '.jpg';
						break;
					case 'questbg02_STAGE':
						m.src = 'img/assets/questbg02_' + zerofilled_stage_id + '.png';
						break;
					case 'attack_massage':
						m.src = 'img/canvas/attack_id' + json.user.avatar_id + '_massage.png';
						break;
					default:
						var result = m.src.match(/questboss_STAGE_FIELD_([0-9]{2})/);
						if(result != null){
							var name_arr = [zerofilled_stage_id, result[1]];
							m.src = 'img/canvas/questboss_' + name_arr.join('_') + '.png';
						}
						break;
				}
				return m;
			}).filter(function(m){
				return !(/^id[0-9]{5}/.test(m.id))
			});

			[
				[json.user],
				json.partners
			].forEach(function(members){
				members.forEach(function(member, i){
					var addList = self.getImgsByAvatarId(pre, member);
					post = self.addImgsToManifest(post, addList);
				});
			});
			return post;
		},
		getImgsByAvatarId : function(manifest, member){
			var self = this;
			var file_name_pattern = new RegExp('^id' + member.avatar_id + '[^\\d]');

			return manifest.filter(function(manifest_img){
				return file_name_pattern.test(manifest_img['id'] + '_');
			});
		}
	});
	var View = Canvas.View.extend({
		model : new Model(),
		el : '#fullScreen',
		initialize : function(){
			$('#jsBossResult').hide();
			this._super();
		},
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			page_data.partners = page_data.partners || [];

			var name = 'questboss' + (page_data.partners.length + 1) + '_' + (page_data.win_flg ? 'win' : 'lose');

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/createjs/questboss_avatars_manifest.js')},
				[manifest_path, 'createjs/questboss_avatars_manifest'],
				function(BossManifest, AvatarsManifest){
					self.model.set({
						createjsJson : {user:page_data.user, partners:page_data.partners},
						manifest : _.unique(BossManifest.Manifest.concat(AvatarsManifest.Manifest),false,'src'),
						name : name
					});
				}
			);
		},
		setExportRoot : function(){
			var self = this;
			var loaded_img = self.model.get('loadedImg');
			var createjs_json = self.model.get('createjsJson');
			self.model.cjs_container.initialize(loaded_img, createjs_json, createjs);
			self.model.cjs_children.forEach(function(child){
				child.initialize(loaded_img, createjs_json, createjs, self.model.cjs_container.lib);
				self.model.cjs_container.lib = _.extend(self.model.cjs_container.lib, child.lib);
			});
			this.exportRoot = new this.model.cjs_container.lib[this.model.get('name')]();
		}
	});
	return {
		Model : Model,
		View : View
	};
});