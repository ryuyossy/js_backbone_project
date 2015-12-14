define(function(){
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
		},
		load : function(){
			var self = this;
			var target = self.get('target');
			$.ajax({
				dataType : 'json',
				url : page.model.getDataPath('/battle/situation/list'),
				data : {
					timestamp : new Date/1000|0,
					date : page_data.date_param,
					round : page_data.round,
					me_flg : target===2
				},
				success : function(json){
					if( json.status === 200 ){
						self.set('list_data', json);
					} else {
						self.trigger('fail:load');
					}
				},
				error : function(){
					self.trigger('fail:load');
				}
			});
		},
		makeHTML : function(){
			var self = this;
			var template = self.get('template');
			var data = self.get('list_data');
			var html = $.templates(template).render(data);
			self.set('html', html);
		},
		changeParameter : function(){
			var self = this;
			var target = self.get('target');
			var template;
			if( target===1 ){
				template = '#jsTemplateBattleAllSituation';
			} else if( target===2 ){
				template = '#jsTemplateBattleOwnSituation';
			}
			self.set('template', template);
			self.get('list').model.set({
				template : $(template).html(),
				filter : {
					me_flg : target===2
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : '.jsBattleSituation',
		events : {
			'touch .jsButtonOnlyOwnSituation' : 'changeTarget'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.model.on({
				'change:target' : function(){
					self.model.changeParameter();
					self.changeCheckbox();
					self.model.load();
				},
				'change:list_data' : self.model.makeHTML,
				'change:html' : self.render
			});
			self.on({
				'initialize' : self.initializeList,
				'render' : self.showMoreButton
			});
			self.trigger('initialize');
		},
		initializeList : function(){
			var parameter = {
				el : '.jsBattleSituation',
				template : '#jsTemplateBattleAllSituation',
				more_flg_name : 'more_flg',
				data_path : page.model.getDataPath('/battle/situation/list'),
				ajax_data : {
					me_flg : false
				}
			};
			this.model.set({
				'list' : new page.list(parameter)
			});
		},
		changeTarget : function(){
			var self = this;
			var target = self.model.get('target') || 1;
			target = target===1 ? 2 : 1;
			self.model.set({'target' : target});
		},
		changeCheckbox : function(){
			var self = this;
			var target = self.model.get('target');
			var $el = $('.jsButtonOnlyOwnSituation').find('button');
			_.defer(function(){
				if( target===1 ){
					$el.addClass('off').removeClass('on');
				} else {
					$el.removeClass('off').addClass('on');
				}
			});
		},
		clearCheckbox : function(){
			this.model.set({'target' : 1});
		},
		render : function(){
			var self = this;
			var html = self.model.get('html');
			self.$('.jsListAll').html(html);
			self.trigger('render');
		},
		showMoreButton : function(){
			var self = this;
			var list = self.model.get('list');
			var more_flg = list.model.get('more_flg_name');
			if( !more_flg ) return;
			var list_data = self.model.get('list_data');
			var $more = self.$('.jsListMore');
			if( !$more[0] ) return;
			if( list_data[more_flg] ){
				$more.show();
			} else {
				$more.hide();
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});
