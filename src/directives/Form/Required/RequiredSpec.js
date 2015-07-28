describe('Gumga.core:directives:Required', function() {

  var compile, mockBackend, scope;
  beforeEach(module('gumga.directives.form.required'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="text" name="nome" ng-model="pessoa.nome" gumga-required>' +
      '</form>'
      );
    scope.pessoa = { nome: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  it('should valid',function() {
    form.nome.$setViewValue('texto');
    expect(scope.pessoa.nome).toEqual('texto');
    expect(form.nome.$valid).toBe(true);
  });
  it('should invalid',function() {
    form.nome.$setViewValue(null);
    expect(scope.pessoa.nome).toEqual(null);
    expect(form.nome.$valid).toBe(false);
  });
});
