define([
	'components/common/canvas'
], function(
	Canvas
	){
	var Model = Canvas.Model.extend({
		filterManifest : function(pre){
			var json = this.get('createjsJson');
			var post = pre.map(function(manifest){
				var m = _.extend({},manifest);
				if(m.id == 'card') {
					//１：アイテム、２：素材、３：武具、４：ガチャポイント、５：ギル、６：ガチャチケット、８：レアメダル
					switch(json.type){
						case 1:
							m.src = 'img/item/' + json.id + '.png';
							break;
						case 2:
							m.src = 'img/material/' + json.id + '.png';
							break;
						case 3:
							m.src = 'img/equip/' + json.id + '_128.png';
							break;
						case 4:
							m.src = 'img/gacha/point.png';
							break;
						case 5:
							m.src = 'img/item/gil.png';
							break;
						case 6:
							m.src = 'img/ticket/' + json.id + '.png';
							break;
						case 8:
							m.src = 'img/item/medal.png';
					}					
				}
				return m;
			});
			return post;
		}
	});
	var View = Canvas.View.extend({
		el : '#fullScreen',
		load : function(){
			var self = this;
			var page_data = this.page.model.get('page_data');
			var kama_type = ['normal', 'silver', 'gold'];
			var name = 'alchemy_' + kama_type[this.page.model.get('form_data').kama_type - 1];

			var manifest_path = 'createjs/' + name + '_manifest';
			require(
				{urlArgs : self.page.model.getRevisionNumber('/js/' + manifest_path + '.js')},
				[manifest_path],
				function(AlchemyManifest){
					self.model.set({
						createjsJson : page_data.items[0],
						manifest : AlchemyManifest.Manifest,
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