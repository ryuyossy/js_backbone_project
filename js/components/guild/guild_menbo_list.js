define(function(){
	var page;
	var Model = Backbone.Model.extend({
		
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonFilter' : 'filter'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeList);
			self.trigger('initialize');
		},
		initializeList : function(){
			var self = this;
			var parameter = {
				el : '.jsMenboList',
				template : '#jsTemplateGuildMenboList',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/guild/candidate/guild/list')
			};
			var menbo_list = new page.list(parameter);
			self.model.set({menbo_list : menbo_list});
		},
		filter : function(){
			var self = this;
			var list = self.model.get('menbo_list');
			list.filter({
				scout_level_type : $('.jsFilterScoutLevelType').val(),
				scout_motivation_type : $('.jsFilterScoutMotivationType').val(),
				scout_experience_type : $('.jsFilterScoutExperienceType').val()
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



