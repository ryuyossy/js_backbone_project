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
			var page_query = this.page.model.get('query');
			var zerofilled_stage_id = ("0" + page_query.stage_id).slice(-2);
			return pre.map(function(m){
				var m = _.extend({},m);
				switch(m.id){
					case 'questbg01_STAGE':
						m.src = 'img/assets/questbg01_' + zerofilled_stage_id + '.jpg';
						break;
					case 'questbg02_STAGE':
						m.src = 'img/assets/questbg02_' + zerofilled_stage_id + '.png';
						break;
				}
				return m;
			});
		}
	});
	var View = Canvas.View.extend({
		el : '#fullScreen',
		load : function(){
			var self = this;
			var page_data = self.model.get('page_data') || self.page.model.get('page_data');
			var name = 'full_stageclear';

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(StageClearManifest){
					self.model.set({
						createjsJson : {},
						manifest : StageClearManifest.Manifest,
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