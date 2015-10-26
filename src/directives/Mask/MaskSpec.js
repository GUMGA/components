describe('Gumga.core:directives:Mask', function() {

  var compile, mockBackend, scope, form;
  beforeEach(module('gumga.directives.mask'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="text" name="cpf" ng-model="pessoa.cpf" gumga-mask="999.999.999-99">' +
      '</form>'
    );
    scope.pessoa = { idade: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('mask', function() {
    it('should valid input value',function() {
      form.cpf.$setViewValue('064.325.679-00');
      expect(scope.pessoa.cpf).toEqual('06432567900');
      expect(form.cpf.$valid).toBe(true);
    });
    it('should invalid input value',function() {
      form.cpf.$setViewValue('064.325.679');
      expect(scope.pessoa.cpf).toEqual(undefined);
      expect(form.cpf.$valid).toBe(false);
    });
  });
});
