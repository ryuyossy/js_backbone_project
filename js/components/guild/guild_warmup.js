define(function(){
	// 手合わせ（１回４ポイント）
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		warmup : function(){
			var self = this;
			$.ajax({
				type : 'POST',
				data : {
					'timestamp' : new Date/1000|0,
					'user_id' : self.get('user_id')
				},
				dataType : 'json',
				url : page.model.getDataPath('/battle/warmup/do'),
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedChange');
					} else {
						self.trigger('failChange');
					}
				},
				error : function(){
					self.trigger('failChange');
				}
			});
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonWarmup' : 'getElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('getElement', self.changeButton);
			self.on('changeButton', self.setTension);
			self.on('changeButton', self.model.warmup);
			self.on('initialize', self.getTension);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				$el : $el,
				user_id : $el.parents('.jsMember').attr('data-user-id')
			});
			self.trigger('getElement');
		},
		changeButton : function(){
			var self = this;
			var $el = self.model.get('$el');
			$el.removeClass('jsButtonWarmup').removeClass('battle').removeClass('yet')
			.addClass('disable').addClass('over')
			.find('span').text('手合わせ済み');
			self.trigger('changeButton');
		},
		setTension : function(){
			var self = this;
			var tension = {
				plus : page_data.add_tension,
				max : 100,
				now : self.model.get('tension') || 0 + page_data.tension
			}
			if( tension.now > tension.max - tension.plus ){
				tension.now = tension.max;
			} else {
				tension.now += tension.plus;
			}
			self.model.set({'tension' : tension.now});
			$('.jsTensionBar').css({
				'width' : tension.now + '%'
			});
		}
	});
	return {
		Model : Model,
		View : View
	};
});