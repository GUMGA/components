describe('Gumga.core:directives:MaxLength', function() {

  var compile, mockBackend, scope, form;
  beforeEach(module('gumga.directives.form.max.length'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="text" name="nome" ng-model="pessoa.nome" gumga-max-length="10">' +
      '</form>'
      );
    scope.pessoa = { nome: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('max', function() {
    it('should valid input value',function() {
      form.nome.$setViewValue('Guilherme');
      expect(scope.pessoa.nome).toEqual('Guilherme');
      expect(form.nome.$valid).toBe(true);
    });
    it('should invalid input value',function() {
      form.nome.$setViewValue('Guilherme Siquinelli');
      expect(scope.pessoa.nome).toEqual('Guilherme Siquinelli');
      expect(form.nome.$valid).toBe(false);
    });
  });
});
