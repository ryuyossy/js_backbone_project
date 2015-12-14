define(function(){
	var page;
	var Model = Backbone.Model.extend({
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonMaterialSubmit' : 'getElement',
			'touch .jsButtonAutoCompose' : 'jumpToConfirmAutoCompose'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('getElement', self.jumpToConfirm);
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget).parents('.jsList');
			var material_type;
			if( $el.parents('.jsUpgradeMaterials')[0] ){
				material_type = 2; // 強化素材
			} else if( $el.parents('.jsAttributeMaterials')[0] ){
				material_type = 3; // 属性素材
			}
			self.model.set({
				'$el' : $el,
				'material_no' : $el.attr('data-list-id'),
				'material_type' : material_type,
				'num' : $el.find('.jsCounterNum').val()
			});
			self.trigger('getElement');
		},
		jumpToConfirm : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			RS.put({
				'form_data' : {
					'user_equip_no' : form_data.user_equip_no,
					'material_no' : self.model.get('material_no'),
					'total_compose_num' : self.model.get('num'),
					'material_type' : self.model.get('material_type')
				},
				'form_target' : ["ComposeBaseSelect","ComposeSelectConfirm","ComposeResult"]
			}, false);
			page.trigger('changeURL', 'compose/confirm/', true);
		},
		jumpToConfirmAutoCompose : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			RS.put({
				'form_data' : {
					'user_equip_no' : form_data.user_equip_no,
					'material_type' : 5
				},
				'form_target' : ["ComposeBaseSelect","ComposeSelectConfirm","ComposeResult"]
			}, false);
			page.trigger('changeURL', 'compose/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});