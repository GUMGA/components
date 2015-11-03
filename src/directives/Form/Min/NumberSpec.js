describe('Gumga.core:directives:MaxNumber', () => {

  let scope, controller;
  beforeEach(module('gumga.directives.form.min.number'));
  beforeEach(module('gumga.directives.form.form'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope;
        let template = `
        <form name="Teste" gumga-form novalidate>
          <input type="number" name="idade" ng-model="pessoa.idade" gumga-min-number="10">
        </form>`

        let elm = angular.element(template);
        $compile(elm)(scope);
        controller = elm.controller('gumgaForm')
        scope.$digest();
  }));

  describe('min', () => {
    it('should valid input value',() => {
      spyOn(controller,'changeStateOfInput');
      scope.Teste.idade.$setViewValue('8');
      expect(scope.pessoa.idade).toEqual(8);
      expect(controller.changeStateOfInput).toHaveBeenCalledWith('idade', 'minnumber', false, 10);
      expect(scope.Teste.idade.$valid).toBe(false);
      expect(scope.Teste.idade.$invalid).toBe(true);
    });
    it('should invalid input value',() => {
      spyOn(controller,'changeStateOfInput');
      scope.Teste.idade.$setViewValue('11');
      expect(scope.pessoa.idade).toEqual(11);
      expect(controller.changeStateOfInput).toHaveBeenCalledWith('idade', 'minnumber', true, 10);
      expect(scope.Teste.idade.$valid).toBe(true);
      expect(scope.Teste.idade.$invalid).toBe(false);
    });
  });
});
