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
				el : '.jsGuildCandidateList',
				template : '#jsTemplateGuildCandidateList',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/guild/candidate/user/list')
			};
			var candidate_list = new page.list(parameter);
			self.model.set({candidate_list : candidate_list});
		},
		filter : function(){
			var self = this;
			var list = self.model.get('candidate_list');
			list.filter({
				scout_level_type : $('.jsFilterScoutLevelType').val()
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});



