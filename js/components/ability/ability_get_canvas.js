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

			return this.replaceWithAvatarId(manifest, 'own', json.win_ability.avatar_id);
		},
		replaceWithAvatarId : function(pre, tmp_word, avatar_id){
			var post = pre.map(function(m){
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
			var page_data = this.model.get('page_data') || this.page.model.get('page_data');
			var name = 'ability_get';
			var manifest_path = 'createjs/' + name + '_manifest';

			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(Manifest){
					self.model.set({
						createjsJson : page_data,
						manifest : Manifest.Manifest,
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