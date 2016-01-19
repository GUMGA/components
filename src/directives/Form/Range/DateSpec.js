describe('Gumga.core:directives:RangeDate', function() {

  let compile, scope, filter, controller;

  beforeEach(module('gumga.directives.form'));

  beforeEach(inject(($compile, $rootScope, $filter) => {
    scope = $rootScope;
    filter = $filter;

    var template =`
      <form name="Teste" gumga-form>
      <input type="date" name="nascimento" ng-model="pessoa.nascimento" gumga-range-date="{min: \'1986-12-29\', max: \'2015-07-20\'}">
      </form>`;

      let elm = angular.element(template);
      $compile(elm)(scope);
      controller = elm.controller('gumgaForm')
      scope.$digest();
  }));
  it('should valid input value',function() {
    spyOn(controller,'changeStateOfInput');
		scope.Teste.nascimento.$setViewValue('1980-10-09');
		expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual('1980-10-09');
		expect(controller.changeStateOfInput).toHaveBeenCalledWith('nascimento', 'rangedate', false, '{min: \'1986-12-29\', max: \'2015-07-20\'}', undefined);
		expect(scope.Teste.nascimento.$valid).toBe(false);
		expect(scope.Teste.nascimento.$invalid).toBe(true);
	});
	it('should invalid input value',function() {
    spyOn(controller,'changeStateOfInput');
    scope.Teste.nascimento.$setViewValue('1986-12-30');
    expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual('1986-12-30');
    expect(controller.changeStateOfInput).toHaveBeenCalledWith('nascimento', 'rangedate', true, '{min: \'1986-12-29\', max: \'2015-07-20\'}', undefined);
    expect(scope.Teste.nascimento.$valid).toBe(true);
    expect(scope.Teste.nascimento.$invalid).toBe(false);
	});
});
