describe('Gumga.core:directives:RangeNumber', function() {

  let compile, scope, filter, controller;

  beforeEach(module('gumga.directives.form'));

  beforeEach(inject(($compile, $rootScope, $filter) => {
    scope = $rootScope;
    filter = $filter;

    var template =`
      <form name="Teste" gumga-form>
      <input type="number" name="idade" ng-model="pessoa.idade" gumga-range-number="{min: 18, max: 60}">
      </form>`;

      let elm = angular.element(template);
      $compile(elm)(scope);
      controller = elm.controller('gumgaForm')
      scope.$digest();
  }));
  it('should valid input value',function() {
    spyOn(controller,'changeStateOfInput');
		scope.Teste.idade.$setViewValue(20);
		expect(scope.pessoa.idade).toEqual(20);
		expect(controller.changeStateOfInput).toHaveBeenCalledWith('idade', 'rangenumber', true, '{min: 18, max: 60}', undefined);
		expect(scope.Teste.idade.$valid).toBe(true);
		expect(scope.Teste.idade.$invalid).toBe(false);
	});
	it('should invalid input value',function() {
    spyOn(controller,'changeStateOfInput');
    scope.Teste.idade.$setViewValue(10);
    expect(scope.pessoa.idade).toEqual(10);
    expect(controller.changeStateOfInput).toHaveBeenCalledWith('idade', 'rangenumber', false,  '{min: 18, max: 60}', undefined);
    expect(scope.Teste.idade.$valid).toBe(false);
    expect(scope.Teste.idade.$invalid).toBe(true);
	});
});
