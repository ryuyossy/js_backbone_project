define(function(){
	var Model = Backbone.Model.extend({

	});
	var View = Backbone.View.extend({
		el : '#jsPage',
		events : {
			'touch .jsCheerDo[data-user-id]' : 'cheerDo',
			'touch .jsClosePopup' : 'closePopup'
		},
		initialize : function(){
			_.bindAll(this);
			var page_data = this.page.model.get('page_data');
		},
		cheerDo : function(e){
			var $btn = $($(e.currentTarget)[0]);
			var self = this;
			this.page.trigger('openPopup', {
				titles : ['鼓舞中...', '鼓舞しました'],
				template : '#jsTemplateCheeredPopup',
				is_closable : true,
				data_path : this.page.model.getDataPath('/battle/cheer/do'),
				ajax_type : 'POST',
				ajax_data : {
					user_id : $btn.attr('data-user-id')
				},
				success : function(json){
					$(".jsRest").text(json.rest_cheer_num);
					$(".jsUser .jsTp").text(json.user_tp_after);
					$(".jsTpGauge").width(json.user_tp_after + '%');
					$btn.closest(".jsTarget").find(".jsTp").text(json.target_tp_after);

					$btn.html("鼓舞済み");
					$btn.addClass("disable");
					$btn.removeAttr("data-user-id");
				}
			});
		},
		closePopup : function(){
			this.page.trigger('closePopup');
		}
	});
	return {
		Model : Model,
		View : View
	};
});
