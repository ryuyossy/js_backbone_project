define(function(){
	// ギルド設定
	var page, page_data;
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		},
		setAutoApprovalStatus : function(json){
			var self = this;
			self.set({
				'auto_approval_status' : json.result
			});
		}
	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'change .jsButtonGuildAutoApproval' : 'getAutoApprovalElement'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			page_data = page.model.get('page_data');
			self.on('getAutoApprovalElement', self.openAutoApprovalPopup);
			self.on('openAutoApprovalPopup', self.model.setAutoApprovalStatus);
			self.on('openAutoApprovalPopup', self.changeAutoApprovalButton);
		},
		getAutoApprovalElement : function(e){
			var self = this;
			var $el = $(e.currentTarget);
			self.model.set({
				'$auto_approval' : $el,
				'auto_approval_status' : $el[0].checked
			});
			self.trigger('getAutoApprovalElement');
		},
		openAutoApprovalPopup : function(){
			var self = this;
			var status = self.model.get('auto_approval_status');
			var parameter = {
				title : '自動承認設定',
				template : '#jsTemplatePopupGuildAutoApproval',
				data_path : page.model.getDataPath('/guild/recruit/auto/change'),
				ajax_type : 'POST',
				success : function(json){
					self.trigger('openAutoApprovalPopup', json);
				}
			};
			page.trigger('openPopup', parameter);
		},
		changeAutoApprovalButton : function(){
			var self = this;
			var $el = self.model.get('$auto_approval');
			var status = self.model.get('auto_approval_status');
			if( status ){
				$el[0].checked = true;
			} else {
				$el[0].checked = false;
			}
		}
	});
	return {
		Model : Model,
		View : View
	};
});