define(function(){
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');
			user_id = page_data.user_id;
			master_user_id = page_data.master_user_id;
		}
	});
	var View = Backbone.View.extend({
		el : 'body',
		events : {
			'touch .jsGreetButton' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.on('getElement', self.openPopup);
			self.on('succeedSubmit', self.addGreet);
			self.on('initialize', self.initializeGreets);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.trigger('getElement', $el);
		},
		openPopup : function($el){
			var self = this;
			var parameter = {
				title : 'あいさつ',
				template : '#jsTemplatePopupGreet',
				data_path : page.model.getDataPath('/greet/add'),
				ajax_type : 'POST',
				ajax_data : {
					'to_user_id' : $el.attr('data-user-id')
				},
				callback : function(json){
					self.trigger('succeedSubmit', json);
				}
			};
			page.trigger('openPopup', parameter);
		},
		addGreet : function(json){
			var self = this;
			var $greets = self.model.get('$el').parents('.jsGreet').$('.jsGreets');
			if( !$greets[0] );
			var template = $('#jsTemplateGreet').html();
			var html = $.templates(template).render(json);
			$greets.prepend(html);
		},
		initializeGreets : function(){
			var parameter = {
				//el : '#jsGreets',
				el : '#greetList',
				template : '#jsTemplateGreetList',
				more_flg_name : 'greets_more_flg',
				data_path : page.model.getDataPath('/greet/more_list')
			};
			var Greets = new page.list(parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



