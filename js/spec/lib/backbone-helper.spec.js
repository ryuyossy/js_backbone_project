define([
	
], function(

){
	var Page = new Backbone.View({
		model : new Backbone.Model()
	});
	var Specs = function(){
		describe('helpers', function(){
			describe('getCallbacks', function(){
				var testFunc1 = function(){console.log('testFunc1');};
				var testFunc2 = function(){console.log('testFunc2');};
				var testFunc3 = function(){console.log('testFunc3');};
				beforeEach(function(){
					Page.on('testEvent', testFunc1);
					Page.on('testEvent', testFunc2);
					Page.on('testEvent', testFunc3);
				});
				afterEach(function(){
					Page.off('testEvent');
				});
				it('該当イベントにバインドされている1つ目のイベントを返す', function(){
					var callbacks = Page.getCallbacks('testEvent');
					expect(callbacks[0]).toEqual(testFunc1);
				});
				it('該当イベントにバインドされている2つ目のイベントを返す', function(){
					var callbacks = Page.getCallbacks('testEvent');
					expect(callbacks[1]).toEqual(testFunc2);
				});
				it('該当イベントにバインドされている3つ目のイベントを返す', function(){
					var callbacks = Page.getCallbacks('testEvent');
					expect(callbacks[2]).toEqual(testFunc3);
				});
			});
			describe('findCallback', function(){
				var testFunc1 = function(){console.log('testFunc1');};
				var testFunc2 = function(){console.log('testFunc2');};
				var testFunc3 = function(){console.log('testFunc3');};
				var callbacks = [testFunc1, testFunc2, testFunc3];
				it('指定したコールバック関数（1つ目）を探す', function(){
					var is_existed = Page.existCallback(callbacks, testFunc1);
					expect(is_existed).toBeTruthy();
				});
				it('指定したコールバック関数（2つ目）を探す', function(){
					var is_existed = Page.existCallback(callbacks, testFunc2);
					expect(is_existed).toBeTruthy();
				});
				it('指定したコールバック関数（3つ目）を探す', function(){
					var is_existed = Page.existCallback(callbacks, testFunc3);
					expect(is_existed).toBeTruthy();
				});
			});
		});
	};
	return Specs;
});
