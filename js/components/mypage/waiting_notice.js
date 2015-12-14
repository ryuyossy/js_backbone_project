define(function(){
	var page, page_data;
	var Model = Backbone.Model.extend({
		defaults : {
			popups : {
				"0801" : {
					title : 'まずはバトルの時間を確認！',
					body : 'バトルは<em>毎日4回開催</em>！<br>次のバトルは何時からかな？',
					href : 'battle/top/',
					btn_val : 'バトルページヘ'
				},
				"0601" : {
					title : '次は現在のジョブを確認！',
					body : '<em>これから育てるジョブ</em>を確認！<br>気になったらジョブチェンジしてみよう♪',
					href : 'job/',
					btn_val : 'ジョブページヘ'
				},
				"0202" : {
					title : 'クエストでLv.を上げよう！',
					body : 'バトルまでは<em>クエストで修行</em>だよ！<br>「ヤツら」を倒すといいものが…？！',
					href : 'mission/stage/',
					btn_val : 'クエストページヘ'
				},
				"0203" : {
					title : 'ギフトを受け取ろう！',
					body : 'さっきの報酬が<em>ギフトに届いている</em>よ！確認してみよう！',
					href : 'gift/list/',
					btn_val : 'ギフトを確認'
				},
				"1102" : {
					title : '匠の書を読んでみよう！',
					body : 'ギフトでもらった「匠の書」は、<em>読むだけでJEx.が手に入る</em>便利なアイテム！',
					href : 'item/list/',
					btn_val : 'アイテムページヘ'
				},
				"0401" : {
					title : '装備を確認してみよう！',
					body : '武具は持っているだけじゃダメ！<br>ちゃんと<em>装備</em>しなきゃ！!',
					href : 'deck/list/1/',
					btn_val : '装備ページヘ'
				},
				"0501" : {
					title : '武具を強化してみよう！',
					body : '武具の強化はブレイブバトルの<em>基本中の基本</em>よ！',
					href : 'compose/',
					btn_val : '合成ページヘ'
				},
				"0802" : {
					title : 'あとはバトルを待つのみ…',
					body : '今ならバトルに参加するだけで、王様から<em>報酬がもらえる</em>んだって！！',
					href : 'startdash/',
					btn_val : 'スタートダッシュヘ'
				},
				"9901" : {
					title : '準備はオッケーね！！',
					body : 'もう<em>一人前のガーディアン</em>ね！わからないことがあればヘルプからいつでも確認できるよ！',
					btn_val : '閉じる'
				}
			}
		},
		finish : function(){
			var self = this;
			$.ajax({
				type : 'POST',
				url : page.model.getDataPath('/mypage/to_battle/complete'),
				dataType : 'json',
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedFinish');
					} else {
						self.trigger('failFinish');
					}
				},
				error : function(){
					self.trigger('failFinish');
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonWaitingNotice' : 'renderBG',
			'touch .jsButtonFinishWaitingNotice' : function(){
				this.model.finish();
				this.changeButton();
			}
		},
		initialize : function(){
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('renderBG', self.render);
		},
		renderBG : function(){
			var self = this;
			var $jsPopupBG = $('#jsPopups').show().find('#jsPopupBG');
			$jsPopupBG.css({'opacity' : '0.5'});
			if( $jsPopupBG.css('display') == 'block' ) return;
			$jsPopupBG.css({
				'top' : window.pageYOffset+'px',
				'height' : window.screen.height+'px'
			}).show();
			self.trigger('renderBG');
		},
		render : function(){
			var self = this;
			var template = $('#jsTemplatePopupWaitingNotice').html();
			var next_tutorial_id = page_data.next_tutorial_id;
			var data = self.model.get('popups')[next_tutorial_id];
			var html = $.templates(template).render(data);
			$('#jsPopups').append(html);
			$('.jsPopupWaitingNotice').show().css({
				'top' : window.pageYOffset + Math.floor($(window).height()/2 - $('.jsPopupWaitingNotice').height()/2) + 'px',
				'left' : Math.floor(window.innerWidth/2 - 320/2 + 8) + 'px',
				'-webkit-transform': 'scale(1)'
			});
		},
		changeButton : function(){
			$('.jsButtonWaitingNotice').attr('data-href', 'waiting_notice/')
			.removeClass('.jsButtonWaitingNotice');
		}
	});
	return {
		Model : Model,
		View : View
	};
});



