(function(){
	'use strict';
	Errors.$inject = ['$compile'];
  function Errors($compile) {
    return {
      restrict: 'E',
			scope: {},
			template: '<ul><li ng-repeat="error in errors" >{{ error.name }}</li></ul>',
      require: '^form',
      link: function (scope, elm, attrs, ctrl) {
				scope.errors = [];
				// scope.$parent.errors = [];

				scope.errorsContains = function(errors, error) {
					for (var k in errors) {
						if (angular.equals(errors[k], error)) {
							return k;
						}
					}
					return false;
				}

				scope.addError = function(error) {
					if (!scope.errorsContains(scope.errors, error)) {
						scope.errors.push(error);
					}
				}

				scope.removeError = function(error) {
					error.valid = !error.valid;
					var exist = scope.errorsContains(scope.errors, error);
					if (exist) {
						scope.errors.splice(exist, 1);
					}
				}

				scope.$on('$error', function(event, data) {
					if (data.valid == false) {
						scope.addError(data);
					} else {
						scope.removeError(data);
					}
				});
				// scope.$watch('errors', function() {
				// 	scope.$parent.errors = scope.errors;
				// });
      }
    }
  }
	angular.module('gumga.directives.form.errors',[])
	.directive('gumgaErrors',Errors);
})();
