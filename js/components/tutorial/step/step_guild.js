define(function(){
	var page, page_data, routing;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonTutorialBuildGuildConfirm' : 'openPopupBuildGuildConfirm',
			'touch .jsButtonTutorialJoinGuildConfirm' : 'openPopupJoinGuildConfirm',
			'touch .jsButtonTutorialBuildGuildComplete' : 'openPopupBuildGuildComplete',
			'touch .jsButtonTutorialJoinGuildComplete' : 'openPopupJoinGuildComplete',
			'touch .jsButtonTutorialGuildNext' : 'end',
			'touch .jsButtonTutorialReload' : function(){
				page.reload();
			}
		},
		frames : [
			'renderMessageNavicoHow',
			'renderMessageElderCombo',
			'renderMessageElderGuild',
			'openPopupJoinGuildConfirm'
		],
		initialize : function(){
			_.bindAll(this);
			var self = this;
			routing = self.routing;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'initialize' : self.model.setIsLoaded
			});
			self.trigger('initialize');
		},
		start : function(){
			$('.jsTutorialMain').show();
			routing.trigger('wait', 1000);
		},
		renderMessageNavicoHow : function(){
			routing.trigger('setGuide', {
				'character' : 'navico',
				'text' : 'お疲れさまー！<br>初めてのバトルはどうだった？'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderCombo : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'text' : 'さっきのバトルでわかったように、バトルは仲間との連携コンボが鍵になる。'
			});
			routing.trigger('waitAction');
		},
		renderMessageElderGuild : function(){
			routing.trigger('setGuide', {
				'character' : 'elder',
				'exist_button' : 'オススメのギルドに加入する',
				'text' : 'お前も早く自分のギルドを探した方が良いぞ！'
			});
			routing.trigger('waitAction');
		},
		openPopupBuildGuildConfirm : function(){
			var self = this;
			var user = page.model.get('user') || page.model.get('page_data');
			var parameter = {
				title : 'ギルド設立確認',
				is_closable : false,
				template : '#jsTemplatePopupTutorialBuildGuildConfirm',
				local_data : {
					'user_name' : user.user_name
				}
			};
			page.trigger('openPopup', parameter);
		},
		openPopupJoinGuildConfirm : function(){
			var self = this;
			var parameter = {
				titles : ['ギルド検索中...', 'ギルド加入確認'],
				is_closable : false,
				template : '#jsTemplatePopupTutorialJoinGuildConfirm',
				data_path : page.model.getDataPath('/tutorial/join/confirm'),
				ajax_type : 'GET',
				success : function(json){
					self.model.set({guild_id : json.guild_id});
				},
				error_parameter : {
					404 : {
						title : 'ギルド加入確認',
						template : '#jsTemplatePopupTutorialErrorJoinGuild',
						local_data : {
							'message' : '加入できるギルドが見つかりませんでした。'
						}
					}
				}
			};
			page.trigger('openPopup', parameter);
		},
		openPopupBuildGuildComplete : function(){
			var self = this;
			routing.model.set({'is_loading' : true});
			var parameter = {
				titles : ['ギルド設立中...', 'ギルド設立完了'],
				is_closable : false,
				template : '#jsTemplatePopupTutorialBuildGuildComplete',
				data_path : page.model.getDataPath('/tutorial/establish/execute'),
				ajax_type : 'POST',
				ajax_data : {
					'timestamp' : new Date/1000|0
				},
				success : function(){
					routing.model.set({'is_loading' : false});
				},
				error_parameter : {
					403 : {
						title : 'ギルド設立失敗',
						template : '#jsTemplatePopupTutorialErrorBuildGuild'
					}
				}
			};
			page.trigger('openPopup', parameter);
		},
		openPopupJoinGuildComplete : function(){
			var self = this;
			routing.model.set({'is_loading' : true});
			var parameter = {
				titles : ['ギルド加入中...', 'ギルド加入完了'],
				is_closable : false,
				template : '#jsTemplatePopupTutorialJoinGuildComplete',
				data_path : page.model.getDataPath('/tutorial/join/execute'),
				ajax_type : 'POST',
				ajax_data : {
					'timestamp' : new Date/1000|0,
					'guild_id' : self.model.get('guild_id')
				},
				success : function(){
					routing.model.set({'is_loading' : false});
				},
				error_parameter : {
					403 : {
						title : 'ギルド加入失敗',
						template : '#jsTemplatePopupTutorialErrorJoinGuild',
						local_data : {
							'message' : 'ギルドに加入できませんでした。'
						}
					}
				}
			};
			page.trigger('openPopup', parameter);
		},
		end : function(){
			routing.trigger('submit');
			routing.trigger('goToNextStep');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
