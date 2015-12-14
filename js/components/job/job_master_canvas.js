define([
	'components/common/canvas'
], function(
	Canvas
){
	var Model = Canvas.Model.extend({
		//Flashから書き出されたManifestファイルを、
		//jsonで受け取った演出状態に応じて書き換ぇるメソッド
		filterManifest : function(pre){
			Canvas.Model.prototype.filterManifest.apply(this, arguments);

			var self = this;
			var json = this.get('createjsJson');

			if(json.boy_avatar_id != json.avatar_id){
				var avatar_id_regex = new RegExp('^id' + json.boy_avatar_id + '_([0-1][0-9])$');
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
				return obj;
			});
			return post;
		}
	});
	var View = Canvas.View.extend({
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var avatar_id = page_data.master_job.avatar_id;
			var boy_avatar_id = avatar_id.replace(/2$/,'1');
			var name = 'id' + boy_avatar_id + '_master';
			page_data.avatar_id = avatar_id;
			page_data.boy_avatar_id = boy_avatar_id;

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