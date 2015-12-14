define([
	'pages/mypage'
], function(
	MypageClass
){
	var Mypage = new MypageClass();
	var Specs = function(){
		describe('Model', function(){
			it('titleが定義されている', function(){
				expect(Mypage.model.get('title')).toBeDefined();
			});
			it('data_pathが定義されている', function(){
				expect(Mypage.model.get('data_path')).toBeDefined();
			});
			it('template_pathが定義されている', function(){
				expect(Mypage.model.get('template_path')).toBeDefined();
			});
		});
		describe('View', function(){
			it('modelが定義されている', function(){
				expect(Mypage.model).toBeDefined();
			});
			it('componentsが定義されている', function(){
				expect(Mypage.components).toBeDefined();
			});
		});
	};
	return Specs;
});
