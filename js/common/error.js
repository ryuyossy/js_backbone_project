define(function(){
	var page;
	var Model = Backbone.Model;
	var View = Backbone.View.extend({
		el : '#jsPopups',
		events : {
			'touch .jsBacktoMypage' : 'jumpToMypage'
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			page = self.page;
			self.on('failAuth', self.jumpLoginPage);
			self.on('initPopup', self.openPopup);
			self.on('initPopup', self.showPopup);
			self.on('initialize', self.initPopup);
			self.trigger('initialize');
		},
		initPopup : function(){
			var self = this;
			_.delay(function(){
				self.trigger('initPopup');
			}, 500);
		},
		openPopup : function(){
			var self = this;
			var status = self.model.get('status') || 'none';
			if( status===401 ){
				self.trigger('failAuth');
				return;
			}
			var errors = self.model.get('errors') || [];
			var is_page_load = self.model.get('is_page_load') || false;
			var message = {
				'200' : 'Bad JSON',
				'400' : '400 Bad Request Parameter',
				'401' : '401 No Auth',
				'403' : '403 Permission Denied',
				'404' : '404 Not Found',
				'500' : '500 Server Error',
				'none' : 'No Status'
			};
			errors = errors.join("<br />\n");
			if( errors==='Sorry,systemerroroccurred.' ) errors = undefined;
			message = message[status] || status;
			console.log(message);
			var error_parameter = self.model.get('error_parameter');
			if( _.has(error_parameter, status) ){
				error_parameter = error_parameter[status];
			} else {
				error_parameter = undefined;
			}
			var parameter = error_parameter || {
				title : 'エラー',
				is_closable : !is_page_load,
				local_data : {
					'message' : errors || '通信エラーが発生しました。'
				}
			};
			parameter = _.extend({
				callback : function(){
					var error_func = self.model.get('error_func');
					var option = {
						status : status,
						message : message
					};
					error_func && error_func(option);
				}
			}, parameter);
			page.trigger('openPopup', parameter);
		},
		showPopup : function(){
			var self = this;
			var is_page_load = self.model.get('is_page_load') || false;
			if( !is_page_load ) return;
			self.$el.css({
				'z-index' : '30000',
				'display' : 'block'
			});
		},
		removePopup : function(){
			var self = this;
			self.$el.css({
				'z-index' : '',
				'display' : ''
			});
			self.remove();
		},
		jumpToMypage : function(){
			window.location.href = '#mypage/';
			window.location.reload(true);
		},
		jumpLoginPage : function(){
			var self = this;
			var redirect_url = self.model.get('redirect_url');
			window.location.href = redirect_url;
		}
	});
	return {
		Model : Model,
		View : View
	};
});
