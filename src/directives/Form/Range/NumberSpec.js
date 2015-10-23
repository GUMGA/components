describe('Gumga.core:directives:RangeNumber', function() {

  var compile, mockBackend, scope, form;
  beforeEach(module('gumga.directives.form.range.number'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="number" name="idade" ng-model="pessoa.idade" gumga-range-number="{min: 18, max: 60}">' +
      '</form>'
      );
    scope.pessoa = { idade: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  it('should valid input value',function() {
    form.idade.$setViewValue(20);
    expect(scope.pessoa.idade).toEqual(20);
    expect(form.idade.$valid).toBe(true);
  });
  it('should invalid input value',function() {
    form.idade.$setViewValue(15);
    expect(scope.pessoa.idade).toEqual(15);
    expect(form.idade.$valid).toBe(false);
  });
});
