describe('Gumga.core:directives:Pattern', function() {
  let scope, controller;

  beforeEach(module('gumga.directives.form'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope;

    let template = `
    <form name="Teste" gumga-form novalidate>
      <input type="text" name="nascimento" ng-model="pessoa.nascimento" gumga-pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}">
    </form>`

    let elm = angular.element(template);
    $compile(elm)(scope);
    controller = elm.controller('gumgaForm')
    scope.$digest();

  }));

  it('should valid input value',function() {
    spyOn(controller,'changeStateOfInput');
    scope.Teste.nascimento.$setViewValue('16/10/1986');
    expect(scope.pessoa.nascimento).toEqual('16/10/1986');
    expect(controller.changeStateOfInput).toHaveBeenCalledWith('nascimento', 'pattern', true, '[0-9]{2}/[0-9]{2}/[0-9]{4}');
    expect(scope.Teste.nascimento.$valid).toBe(true);
    expect(scope.Teste.nascimento.$invalid).toBe(false);

  });
  it('should invalid input value',function() {
    spyOn(controller,'changeStateOfInput');
    scope.Teste.nascimento.$setViewValue('1986-12-29');
    expect(scope.pessoa.nascimento).toEqual('1986-12-29');
    expect(controller.changeStateOfInput).toHaveBeenCalledWith('nascimento', 'pattern', false, '[0-9]{2}/[0-9]{2}/[0-9]{4}');
    expect(scope.Teste.nascimento.$valid).toBe(false);
    expect(scope.Teste.nascimento.$invalid).toBe(true);
  });
});
