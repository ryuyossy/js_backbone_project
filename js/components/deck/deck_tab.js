define(function(){
	//装備タブ
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			var page_data = page.model.get('page_data');

		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsAccordionButton' : 'accordion',
			'touchstart .jsAccordionButton' : 'addOnClass',
			'touchend .jsAccordionButton' : 'removeOnClass'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			//デフォルト表示するタブをquery.equip_typeから判定
			var equip_type = page.model.get('query').equip_type || 1;
			var weaponDefault = (equip_type == 1);
			var parameter = [
				{
					template : '#jsTemplateDeck',
					data_path : page.model.getDataPath('/deck/list'),
					ajax_type : 'GET',
					ajax_data : {
						'equip_type' : 1
					},
					is_default : weaponDefault, //デフォルト表示
					is_reloadable : true,
					is_cacheable : true
				}, {
					template : '#jsTemplateDeck',
					data_path : page.model.getDataPath('/deck/list'),
					ajax_type : 'GET',
					ajax_data : {
						'equip_type' : 2
					},
					is_default : !weaponDefault, //デフォルト表示
					is_reloadable : true,
					is_cacheable : true
				}
			];
			page.trigger('setTabs', parameter);
		},
		accordion : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			var $inner = $el.find('.jsAccordionInner');
			var isOpen = $el.hasClass('open');
			$el.removeClass(isOpen ? 'open' : 'close').addClass('on');
			isOpen ? $inner.hide() : $inner.show();
			$el.removeClass('on').addClass(isOpen ? 'close' : 'open');
		},
		addOnClass : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			$el.addClass('on');
		},
		removeOnClass : function(e){
			var $el = $(e.currentTarget).parents('.jsAccordion');
			$el.removeClass('on');
		}
	});
	return {
		Model : Model,
		View : View
	};
});



