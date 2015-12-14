define(function(){
	var page, page_data, user_equip_no;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.trigger('initialize');
		},
		protect : function(){
			var self = this;
			var user_equip_no = self.get('user_equip_no') || page_data.equips[0].user_equip_no;
			var url = self.get('is_protected') ? 'unprotect' : 'protect';
			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : page.model.getDataPath('/equip/'+url),
				data : {
					'timestamp' : new Date/1000|0,
					'user_equip_no' : user_equip_no
				},
				success : function(json){
					if( json.status === 200 ){
						self.trigger('succeedProtect');
					} else {
						page.trigger('catchError', json);
						self.trigger('failProtect');
					}
				},
				error : function(e){
					page.trigger('catchError', e);
					self.trigger('failProtect');
				}
			});
		},
		turnBackProtect : function(){
			var self = this;
			self.set({
				is_protected : !self.get('is_protected')
			});
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonCompose' : 'jumpToCompose',
			'touch .jsButtonComposeEvolution' : 'jumpToComposeEvolution',
			'touch .jsButtonProtect' : 'checkProtected',
			'touch .jsButtonSell'    : 'jumpToSellConfirm'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			user_equip_no = page_data.user_equip_no || page_data.equips[0].user_equip_no;
			self.on('changeProtect', self.changeButtonProtect);
			self.on('changeProtect', self.model.protect);
			self.model.on('failProtect', self.model.turnBackProtect);
			self.model.on('failProtect', self.changeButtonProtect);
			self.trigger('initialize');
		},
		jumpToCompose : function(){
			RS.put({
				'form_data' : {
					'selected_tab' : 1,
					'base_selected_tab' : 1,
					'user_equip_no' : user_equip_no
				},
				'form_target' : 'ComposeBaseSelect'
			}, false);
			page.trigger('changeURL', 'compose/base/', true);
		},
		jumpToComposeEvolution : function(){
			RS.put({
				'form_data' : {
					'user_equip_no' : user_equip_no
				},
				'form_target' : 'ComposeBaseEvolutionSelect'
			}, false);
			page.trigger('changeURL', 'compose/base-evolution/', true);
		},
		checkProtected : function(){
			var self = this;
			var $el = $('.jsButtonProtect');
			self.model.set({
				$ButtonProtect : $el,
				is_protected : ($el.text()==='保護中'),
				is_equiped : $el.attr('data-equip-status') !== 0
			});
			self.trigger('changeProtect');
		},
		changeButtonProtect : function(){
			var self = this;
			var $el = self.model.get('$ButtonProtect');
			var is_protected = self.model.get('is_protected');
			var is_equiped = self.model.get('is_equiped');
			if( is_protected ){
				// 保護中→保護する
				$el.addClass('large').removeClass('close').attr('id', '')
				.text('保護する');
				if( !is_equiped ) $('.jsButtonSell').show();
			} else {
				// 保護する→保護中
				$el.addClass('close').removeClass('large').attr('id', 'wide')
				.text('保護中');
				$('.jsButtonSell').hide();
			}
			self.model.set({
				'user_equip_no' : $el.attr('data-equip-id')
			});
		},
		jumpToSellConfirm : function(){
			RS.put({
				'form_data' : {
					'user_equip_nos' : user_equip_no
				},
				'form_target' : ["EquipSellConfirm","EquipSellComplete"]
			}, false);
			page.trigger('changeURL', 'equip/sell/confirm/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



