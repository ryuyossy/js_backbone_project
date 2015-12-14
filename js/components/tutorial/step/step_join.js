define(function(){
	var page, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsTutorialJoinConfirm' : 'getForm',
			'touch .jsTutorialJoinFix' : 'openCompletePopup',
			'touch .jsTutorialJoinNext' : 'end',
			'touch .jsButtonTutorialReload' : function(){
				page.reload();
			}
		},
		frames : [
			'renderMessageNavico',
			'renderMessageElder',
			'renderJoin'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			self.on({
				'getForm' : self.openConfirmPopup,
				'initialize' : self.model.setIsLoaded
			});
			self.trigger('initialize');
		},
		start : function(){
			$('.jsTutorialMain').show();
			$('.jsTutorialStory').show();
			routing.trigger('waitAction');
		},
		renderMessageNavico : function(){
			$('.jsTutorialStory').hide();
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : 'あら！<br>あなた、新しく来たガーディアン志望者さんね？？'
			});
			routing.trigger('waitAction');
		},
		renderMessageElder : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : true,
				'text' : 'おっ！新人か！<br>それじゃあ、まずはそこの書類を書いて提出してくれ。'
			});
			routing.trigger('waitAction');
		},
		renderJoin : function(){
			$('.jsTutorialMain').hide();
			$('.jsTutorialJoin').show();
			routing.trigger('waitInput');
		},
		getForm : function(){
			var self = this;
			var user_name = $('.jsTutorialJoinFormUserName').val();
			var $sextype = $('.jsTutorialJoinFormSexType:checked');
			var sex_type = $sextype.val();
			var avatar_id = $sextype.attr('data-avatar-id');
			self.model.set({
				user_name : user_name,
				sex_type : sex_type,
				avatar_id : avatar_id
			});
			self.trigger('getForm');
		},
		openConfirmPopup : function(){
			var self = this;
			var user_name = self.model.get('user_name');
			var parameter = (user_name.length > 0 && user_name.length <= 10) ? {
				title : '登録内容確認',
				template : '#jsTemplateTutorialJoinConfirm',
				local_data : {
					'user_name' : user_name,
					'sex_type' : self.model.get('sex_type'),
					'avatar_id' : self.model.get('avatar_id')
				}
			} : {
				title : '入力エラー',
				local_data : {
					'message' : '名前は１文字以上１０文字以下で入力してください。'
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			routing.model.set({'is_loading' : true});
			var parameter = {
				titles : ['登録中...', '登録完了'],
				is_closable : false,
				template : '#jsTemplateTutorialJoinComplete',
				data_path : page.model.getDataPath('/tutorial/regist/execute'),
				ajax_type : 'POST',
				ajax_data : {
					'user_name' : self.model.get('user_name'),
					'sex_type' : self.model.get('sex_type')
				},
				success : function(){
					page.model.set({
						'user' : {
							'user_name' : self.model.get('user_name'),
							'sex_type' : self.model.get('sex_type'),
							'avatar_id' : self.model.get('avatar_id')
						}
					})
					routing.model.set({'is_loading' : false});
					routing.trigger('join');
				},
				error : function(json){
					routing.model.set({'is_loading' : false});
					if(json.status===403){
						$('.jsPopup').find('h1').text('操作エラー');
						$('.jsClosePopup, #jsPopupBG').addClass('jsButtonTutorialReload');
					} else if(json.status===400){
						$('.jsPopup').find('h1').text('入力エラー');
					}
				}
			};
			page.trigger('openPopup', parameter);
		},
		end : function(){
			var self = this;
			$('.jsTutorialJoin').hide();
			routing.trigger('submit');
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
