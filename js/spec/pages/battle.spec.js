define([
	'pages/battle'
], function(
	BattleClass
){
	var Battle = new BattleClass();
	var Specs = function(){
		describe('Model', function(){
			it('titleが定義されている', function(){
				expect(Battle.model.get('title')).toBeDefined();
			});
			it('data_pathが定義されている', function(){
				expect(Battle.model.get('data_path')).toBeDefined();
			});
			it('template_pathが定義されている', function(){
				expect(Battle.model.get('template_path')).toBeDefined();
			});
		});
		describe('View', function(){
			it('modelが定義されている', function(){
				expect(Battle.model).toBeDefined();
			});
			it('componentsが定義されている', function(){
				expect(Battle.components).toBeDefined();
			});
		});
	};
	return Specs;
});
