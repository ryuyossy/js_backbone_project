define(function(){
	var Model = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this);
			var self = this;
		}
	});
	var View = Backbone.View.extend({
		model : new Model(),
		el : '.jsForm',
		events : {
			
		},
		initialize : function(){
			_.bindAll(this);
			var self = this;
			self.model.on('change:count', self.render);
			self.on('initialize', self.getElement);
			self.on('initialize', self.setCounter);
			self.on('initialize', self.bindEvents);
			self.trigger('initialize');
		},
		getElement : function(){
			var self = this;
			var $counter = self.$('.jsFormLengthCounter');
			var $length_target = self.$('.jsFormLengthTarget');
			var count_max = $length_target.attr('data-max') - 0;
			self.model.set({
				$counter : $counter,
				$length_target : $length_target,
				count_max : count_max
			});
		},
		setCounter : function(){
			var self = this;
			var $counter = self.model.get('$counter');
			if( !$counter[0] ) return;
			var $length_target = self.model.get('$length_target');
			var count_max = self.model.get('count_max');
			var count = $length_target.val().length;
			$counter.text(count_max - count);
		},
		bindEvents : function(){
			var self = this;
			self.$('.jsFormLengthTarget')
			.on('focus', self.addListener)
			.on('blur', self.removeListener);
		},
		// 自動カウントのリスナー追加
		addListener : function(){
			var self = this;
			var listener = window.setInterval(self.countText, 100);
			self.model.set({listener : listener});
		},
		// 自動カウントのリスナー削除
		removeListener : function(){
			var self = this;
			var listener = self.model.get('listener');
			window.clearInterval(listener);
		},
		// 文字数カウント
		countText : function(){
			var self = this;
			var $target = self.model.get('$length_target');
			var text_now = $target.val();
			var max = self.model.get('count_max');
			var odd_num = max - text_now.length;
			self.model.set({count : odd_num});
		},
		// 文字数カウンター描画
		render : function(){
			var self = this;
			var $counter = self.model.get('$counter');
			var count = self.model.get('count');
			var color = count < 0 ? 'red' : '';
			$counter.text(count).css('color', color);
		}
	});
	return View;
});
