define(function(){
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.trigger('initialize');
		},
		setFormData : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			var material = null;
			var material_no = null;
			var material_name = null;
			var total_compose_num = 0;
			var total_compose_gil = page_data.total_compose_gil;
			if (page_data.material_type==2) {
				material_no = page_data.upgrade_material.id;
				material_name = 'upgrade_material';
				material = page_data.upgrade_material;
				total_compose_num = page_data.total_compose_num;
			} else if (page_data.material_type==3) {
				material_no = page_data.attribute_material.id;
				material_name = 'attribute_material';
				material = page_data.attribute_material;
				total_compose_num = page_data.total_compose_num;
			} else {
				material_no = _.pluck(page_data.equips, 'user_equip_no');
				material_name = 'equipments';
				material = page_data.equips;
				total_compose_num = page_data.equips.length;
			}
			RS.put({
				'form_data' : _.extend(
					{},
					form_data,
					{
						'material_no' : material_no,
						'total_compose_num' : total_compose_num,
						'total_compose_gil' : total_compose_gil
					}
				)
			}, false);
			self.set({material_name : material});
		},
		removeEquipmentFromLocal : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			var user_equip_no = self.get('user_equip_no');
			form_data.material_no = form_data.material_no.map(function(no){
				return no - 0;
			});
			form_data.material_no = _.without(form_data.material_no, user_equip_no - 0);
			RS.put({
				'form_data' : _.extend(
					{},
					form_data,
					{
						'material_type' : 1,
						'total_compose_num' : form_data.material_no.length
					}
				)
			}, false);
		},
		removeEquipmentFromServer : function(){
			var self = this;
			var form_data = RS.get('form_data', false);
			var material_no = form_data.material_no;
			$.ajax({
				type : 'GET',
				data : {
					'timestamp' : new Date/1000|0,
					'user_equip_no' : form_data.user_equip_no,
					'material_no' : material_no.join(','),
					'total_compose_num' : material_no.length,
					'material_type' : 1
				},
				url : page.model.getDataPath('/compose/confirm'),
				dataType : 'json',
				success : function(json){
					if( json.status === 200 ){
						self.trigger('success:remove', json);
					} else {
						self.trigger('fail:remove');
					}
				},
				error : function(){
					self.trigger('fail:remove');
				}
			});
		},
		resetPageData : function(json){
			page.model.set(
				{ 'page_data' : json },
				{ silent : true }
			);
			page_data = json;
			this.trigger('resetPageData');
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsButtonRemove' : 'getElement',
			'touch .jsButtonSubmit' : 'jumpToResult'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on({
				'getElement' : function(){
					self.disableRemove();
					self.removeElement();
				},
				'removeElement' : function(){
					page.trigger('startInnerLoading');
					self.getScrollY();
					self.model.removeEquipmentFromLocal();
					self.model.removeEquipmentFromServer();
				},
				'render' : function(){
					self.setScrollY();
					self.model.setFormData();
					page.trigger('endInnerLoading');
				},
				'initialize' : self.model.setFormData
			});
			self.model.on({
				'success:remove' : function(json){
					self.model.resetPageData(json);
					self.render();
				},
				'resetPageData' : self.model.setFormData
			});
			self.trigger('initialize');
		},
		getElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				'$el' : $el,
				'user_equip_no' : $el.attr('data-user-equip-no')
			});
			self.trigger('getElement');
		},
		removeElement : function(){
			var self = this;
			var $el = self.model.get('$el');
			$el.addClass('noChoice').removeClass('jsButtonRemove');
			self.trigger('removeElement');
		},
		disableRemove : function(){
			var self = this;
			var $remove = $('.jsButtonRemove');
			if( $remove.length > 1 ) return;
			$remove.removeClass('jsButtonRemove').removeClass('component');
		},
		render : function(){
			var self = this;
			var tmpl = page.model.get('page_template');
			var data = page.model.get('page_data');
			var html = $.templates(tmpl).render(data);
			$('#jsContents').html(html);
			self.trigger('render');
		},
		getScrollY : function(){
			this.model.set('scroll_y', window.scrollY);
		},
		setScrollY : function(){
			var scroll_y = this.model.get('scroll_y');
			_.defer(function(){
				window.scrollTo(0, scroll_y);
			});
			_.delay(function(){
				window.scrollTo(0, scroll_y);
			}, 300);
		},
		jumpToResult : function(){
			var self = this;
			page.trigger('changeURL', 'compose/result/', true);
		}
	});
	return {
		Model : Model,
		View : View
	};
});



