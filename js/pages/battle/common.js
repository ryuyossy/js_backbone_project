define([
	'common/page'
], function(
	PageClass
	){
	var Model = PageClass.Model.extend({
		callbacks : {
			403 : 'battleError'
		},
		battleError : function(option){
			if(option.errors[0] == 'close'){
				RS.put({
					'first_popup' : {
						title : 'バトル終了',
						local_data : {
							'message' : 'バトルは終了しました！'
						}
					}
				}, false);
				this.trigger('changeURL', 'battle/top/', true);
			}else{
				var current = location.hash.replace('#', '');
				var url = 'battle/';
				if( current===url ) url = 'battle/top/';
				RS.put({
					'first_popup' : {
						title : 'バトルエラー',
						local_data : {
							'message' : option.errors[0]
						}
					}
				}, false);
				this.trigger('changeURL', url, true);
			}
		}
	});

	return {
		Model : Model
	};
});