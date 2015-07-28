describe('Gumga.core:directives:RangeDate', function() {

  var compile, mockBackend, scope, filter;
  beforeEach(module('gumga.directives.form.range.date'));
  beforeEach(inject(function($compile, $rootScope, $filter) {
    scope = $rootScope;
    filter = $filter;
    var element = angular.element(
      '<form name="myForm">' +
      '<input type="date" name="nascimento" ng-model="pessoa.nascimento" gumga-range-date="{min: \'1986-12-29\', max: \'2015-07-20\'}">' +
      '</form>'
      );
    scope.pessoa = { nascimento: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));
  it('should valid input value',function() {
		var date = '1986-12-30';
		form.nascimento.$setViewValue(date);
		expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual(date);
		expect(form.nascimento.$valid).toBe(true);
	});
	it('should invalid input value',function() {
		var date = '1986-12-25';
		form.nascimento.$setViewValue(date);
		expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual(date);
		expect(form.nascimento.$valid).toBe(false);
	});
});
