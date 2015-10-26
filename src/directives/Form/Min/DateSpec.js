describe('Gumga.core:directives:MinDate', function() {

	var compile, mockBackend, scope, filter, form;
	beforeEach(module('gumga.directives.form.min.date'));
	beforeEach(inject(function($compile, $rootScope, $filter) {
		scope = $rootScope;
		filter = $filter;
		var element = angular.element(
			'<form name="myForm">' +
			'<input type="date" name="nascimento" ng-model="pessoa.nascimento" gumga-min-date="1980-10-10">' +
			'</form>'
			);
		scope.pessoa = { nascimento: null };
		$compile(element)(scope);
		scope.$digest();
		form = scope.myForm;
	}));

	it('should valid input value',function() {
		var date = '1980-10-11';
		form.nascimento.$setViewValue(date);
		expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual(date);
		expect(form.nascimento.$valid).toBe(true);
	});
	it('should invalid input value',function() {
		var date = '1980-10-09';
		form.nascimento.$setViewValue(date);
		expect(filter('date')(scope.pessoa.nascimento, 'yyyy-MM-dd')).toEqual(date);
		expect(form.nascimento.$valid).toBe(false);
	});
});
