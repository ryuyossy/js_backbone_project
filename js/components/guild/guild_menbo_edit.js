define(function(){
	// メンボ掲載内容の編集
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsButtonGuildMenboEditConfirm' : 'getFormData',
			'touch .jsButtonGuildMenboEditFix' : 'openCompletePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getFormData', self.openConfirmPopup);
		},
		getFormData : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				mode : $el.attr('data-mode'),
				scout_level_type : $('.jsFilterScoutLevelType').val(),
				scout_motivation_type : $('.jsFilterScoutMotivationType').val(),
				scout_experience_type : $('.jsFilterScoutExperienceType').val()
			});
			self.trigger('getFormData');
		},
		openConfirmPopup : function(){
			var self = this;
			var mode_name = self.model.get('mode')==='new' ? '掲載' : '変更';
			var level = self.model.get('scout_level_type');
			if(level==='') return;
			level = (level==='0') ? 'Lv10未満' : 'Lv'+level+'以上';
			var motivation = self.model.get('scout_motivation_type')-0;
			if( motivation===1 ){
				motivation = '★☆☆☆☆';
			} else if( motivation===2 ){
				motivation = '★★☆☆☆';
			} else if( motivation===3 ){
				motivation = '★★★☆☆';
			} else if( motivation===4 ){
				motivation = '★★★★☆';
			} else if( motivation===5 ){
				motivation = '★★★★★';
			} else {
				return;
			}
			var experience = self.model.get('scout_experience_type')-0;
			if( experience===1 ){
				experience = '初心者OK';
			} else if( experience===2 ){
				experience = '中級向け';
			} else if( experience===3 ){
				experience = '達人向け';
			} else {
				return;
			}
			var parameter = {
				title : mode_name + '内容確認',
				template : '#jsTemplatePopupMenboEditConfirm',
				local_data : {
					scout_level_type : level,
					scout_motivation_type : motivation,
					scout_experience_type : experience
				}
			};
			page.trigger('openPopup', parameter);
		},
		openCompletePopup : function(){
			var self = this;
			var mode_name = self.model.get('mode')==='new' ? '掲載' : '変更';
			var parameter = {
				titles : [mode_name + '中...', mode_name + '完了'],
				is_closable : false,
				template : '#jsTemplatePopupMenboEditComplete',
				data_path : page.model.getDataPath('/guild/space/recruit/edit'),
				ajax_type : 'POST',
				ajax_data : {
					scout_level_type : self.model.get('scout_level_type'),
					scout_motivation_type : self.model.get('scout_motivation_type'),
					scout_experience_type : self.model.get('scout_experience_type')
				}
			};
			page.trigger('openPopup', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});