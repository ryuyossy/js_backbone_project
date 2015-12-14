define(function(){
	//アビリティ画面タブ
	var page;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('initialize', self.initializeTabs);
			self.trigger('initialize');
		},
		initializeTabs : function(){
			//デフォルト表示するタブをquery.frontから判定
			var front = page.model.get('query').front || true;
			var is_front = (front === true || front === 'true');
			var json = page.model.get('page_data');
			var parameter = [
				{
					template : '#jsTemplateAbility',
					data_path : page.model.getDataPath('/ability/top'),
					ajax_type : 'GET',
					ajax_data : {
						'front' : true
					},
					is_default : is_front, //デフォルト表示
					is_reloadable : true,
					is_cacheable : true,
					success : function(){
						$('.jsAbilityAdd').attr('data-href', 'ability/add/1/');
						if (json.max_ability_num <= $('.frontSet section').length) {
							$('.jsAbilityAdd').hide();
						} else {
							$('.jsAbilityAdd').show();
						}
					}
				}, {
					template : '#jsTemplateAbility',
					data_path : page.model.getDataPath('/ability/top'),
					ajax_type : 'GET',
					ajax_data : {
						'front' : false
					},
					is_default : !is_front, //デフォルト表示
					is_reloadable : true,
					is_cacheable : true,
					success : function(){
						$('.jsAbilityAdd').attr('data-href', 'ability/add/2/');
						if (json.max_ability_num <= $('.backSet section').length) {
							$('.jsAbilityAdd').hide();
						} else {
							$('.jsAbilityAdd').show();
						}
					}
				}
			];
			page.trigger('setTabs', parameter);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



