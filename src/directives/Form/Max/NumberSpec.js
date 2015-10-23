describe('Gumga.core:directives:MaxNumber', function() {

  var compile, mockBackend, scope, form;
  beforeEach(module('gumga.directives.form.max.number'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="number" name="idade" ng-model="pessoa.idade" gumga-max-number="10">' +
      '</form>'
    );
    scope.pessoa = { idade: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('max', function() {
    it('should valid input value',function() {
      form.idade.$setViewValue('8');
      expect(scope.pessoa.idade).toEqual(8);
      expect(form.idade.$valid).toBe(true);
    });
    it('should invalid input value',function() {
      form.idade.$setViewValue('11');
      expect(scope.pessoa.idade).toEqual(11);
      expect(form.idade.$valid).toBe(false);
    });
  });
});
