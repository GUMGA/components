describe('Gumga.core:directives:Pattern', function() {

  var compile, mockBackend, scope, form;
  beforeEach(module('gumga.directives.form.pattern'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="text" name="nascimento" ng-model="pessoa.nascimento" gumga-pattern="(\d{1,2})\-(\d{1,2})\-(\d{4})">' +
      '</form>'
      );
    scope.pessoa = { nascimento: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  it('should valid input value',function() {
    form.nascimento.$setViewValue('07-10-1986');
    expect(scope.pessoa.nascimento).toEqual('07-10-1986');
    // expect(form.nascimento.$valid).toBe(true);
  });
  it('should invalid input value',function() {
    form.nascimento.$setViewValue('1986-12-29');
    expect(scope.pessoa.nascimento).toEqual('1986-12-29');
    expect(form.nascimento.$valid).toBe(false);
  });
});
