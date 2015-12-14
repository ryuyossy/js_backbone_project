define([
	'components/common/sencha'
],function(
	Sencha
){
	var Model = Sencha.Model.extend({
		filterManifest : function(pre){
			var stage_id = ("0" + this.get('stage_id')).slice(-2);
			var avatar_id = this.get('avatar_id');
			var partners = this.get('partners');

			var replaceList = [
				{
					pre: 'questbg01_N',
					post : 'questbg01_' + stage_id
				},
				{
					pre: 'questbg02_N',
					post : 'questbg02_' + stage_id
				},
				{
					pre: 'quest_1_01',
					post : 'quest_id' + avatar_id + '_01'
				},
				{
					pre: 'quest_1_02',
					post : 'quest_id' + avatar_id + '_02'
				}
			];

			if(_.isArray(partners)){
				partners.forEach(function(partner, i){
					var asset_number = i + 2;
					var addList = [
						{
							pre: 'quest_' + asset_number + '_01',
							post : 'quest_id' + partner.avatar_id + '_01'
						},
						{
							pre: 'quest_' + asset_number + '_02',
							post : 'quest_id' + partner.avatar_id + '_02'
						}
					];
					replaceList = replaceList.concat(addList);
				});
			}

			var post = pre;
			replaceList.forEach(function(v){
				post = post.map(function(m){
					m.src = m.src.replace(v.pre, v.post);
					m.id = m.src.replace(v.pre, v.post);
					return m;
				});
				var $img = $('img[data-src*="' + v.pre + '"]');
				$img.attr('data-src', $img.attr('data-src').replace(v.pre, v.post));
			});
			post = post.filter(function(m){
				return !(/quest_[1-3]_0[1-2]\.png$/.test(m.src));
			});
			return post;
		}
	});

	var $advance, $acquisition, $levelup, $fieldclear, $fieldclearlogo, $acquisition_gachap;
	var View = Sencha.View.extend({
		initialize : function(){
			var page_data = this.page.model.get('page_data');
			var partners = page_data.partners;
			this.model.set({
				'stage_id' : page_data.stage.stage_id,
				'avatar_id' : page_data.user.avatar_id,
				'partners' : partners
			});

			$advance = $("#advance");
			$acquisition = $("#acquisition");
			$levelup = $("#levelup");
			$fieldclear = $("#fieldclear");
			$fieldclearlogo = $("#fieldclearlogo");
			$acquisition_gachap = $("#acquisitiongachap");

			this._super();
			_.bindAll(this);
			this.tapEnable(true);

			$partner1 = $('#imgKenshi03, #imgKenshi04, #imgKenshi09, #imgKenshi10, #imgShadow02, #imgShadow05');
			$partner2 = $('#imgKenshi05, #imgKenshi06, #imgKenshi11, #imgKenshi12, #imgShadow03, #imgShadow06');				
			if(_.isArray(partners)){
				var partner_count = partners.length;
				if(partner_count >= 1){
					$partner1.css('display','block');
				}else{
					$partner1.remove();
				}
				if(partner_count == 2){
					$partner2.css('display','block');
				}else{
					$partner2.remove();
				}
			}else{
				$partner1.remove();
				$partner2.remove();
			}
			$advance.show();
		},
		tapEnable : function(bool){
			this.trigger('tapEnable', bool);
		},
		stopAnimation : function($element){
			$element.removeAttr('class');
		},
		endAllAnimation : function(){
			var self = this;
			[
				$advance, $acquisition, $acquisition_gachap,
				$levelup, $fieldclear, $fieldclearlogo
			].forEach(function($el){
				self.stopAnimation($el);
				_.defer(function(){
					$el.addClass('end');
				});
			});
		},
		playAnimation : function ($element, animationName) {
			this.stopAnimation($element);
			_.defer(function(){
				$element.addClass(animationName);
			});
		},
		gotoAndPlay : function (type, callback){
			var self = this;
			var onAnimationEnd = callback;
			self.tapEnable(false);

			switch (type) {
				case "advance":
					$acquisition.hide();
					$levelup.hide();
					$fieldclear.hide();
					$acquisition_gachap.hide();
					self.playAnimation($advance, "scene1");
					$("#imgKenshi02").one('webkitAnimationEnd', onAnimationEnd);
					break;
				case "acquisition":
					self.playAnimation($acquisition, "scene2");
					$acquisition.show();
					$("#imgSplash04").one('webkitAnimationEnd', onAnimationEnd);
					break;
				case "acquisition_gachaPoint":
					self.playAnimation($acquisition, "scene2");
					self.playAnimation($acquisition_gachap, "scene2");
					$acquisition.show();
					$acquisition_gachap.show();
					$("#imgGachaP01, #imgGachaPget").show();
					$("#imgTp01, #imgTpRecovery").hide();
					$("#imgRecovery03").one('webkitAnimationEnd', onAnimationEnd);
					break;
				case "acquisition_tp":
					self.playAnimation($acquisition, "scene2");
					self.playAnimation($acquisition_gachap, "scene2");
					$acquisition.show();
					$acquisition_gachap.show();
					$("#imgTp01, #imgTpRecovery").show();
					$("#imgGachaP01, #imgGachaPget").hide();
					$("#imgRecovery03").one('webkitAnimationEnd', onAnimationEnd);
					break;
				case "levelup":
					self.playAnimation($levelup, "scene3");
					$levelup.show();
					$("#imgLvupLogo").one('webkitAnimationEnd', onAnimationEnd);
					break;
				case "fieldclear":
					self.playAnimation($fieldclear, "scene4");
					self.playAnimation($fieldclearlogo, "scene4");
					$fieldclear.show();
					$fieldclearlogo.show();
					$("#imgDesignCover01").show();
					$("#imgQuestBg02").one('webkitAnimationEnd', onAnimationEnd);
					break;
			}
		},
		removeCallback : function(){
			$('#imgKenshi02, #imgSplash04, #imgRecovery03, #imgLvupLogo, #imgQuestBg02').off('webkitAnimationEnd');
		}
	});
	return {
		Model : Model,
		View : View
	};
});