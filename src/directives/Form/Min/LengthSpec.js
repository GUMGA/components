describe('Gumga.core:directives:MaxLength', () => {

  let scope, controller;

  beforeEach(module('gumga.directives.form'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope;

    let template = `
    <form name="Teste" gumga-form novalidate>
      <input type="text" name="nome" ng-model="pessoa.nome" gumga-min-length="10">
    </form>`

    let elm = angular.element(template);
    $compile(elm)(scope);
    controller = elm.controller('gumgaForm')
    scope.$digest();
  }));

  describe('max', () => {
    it('should valid input value',() => {
      spyOn(controller,'changeStateOfInput');
      scope.Teste.nome.$setViewValue('Guilherme');
      expect(scope.pessoa.nome).toEqual('Guilherme');
      expect(controller.changeStateOfInput).toHaveBeenCalledWith('nome', 'minlength', false, 10,undefined);
      expect(scope.Teste.nome.$valid).toBe(false);
      expect(scope.Teste.nome.$invalid).toBe(true);
    });

    it('should invalid input value', () => {
    	spyOn(controller,'changeStateOfInput');
      scope.Teste.nome.$setViewValue('Guilherme Siquinelli');
      expect(scope.pessoa.nome).toEqual('Guilherme Siquinelli');
      expect(controller.changeStateOfInput).toHaveBeenCalledWith('nome', 'minlength', true, 10,undefined);
      expect(scope.Teste.nome.$valid).toBe(true);
      expect(scope.Teste.nome.$invalid).toBe(false);
    });
  });
});
