(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:gumgaErrors
	 * @element input
	 * @restrict A
	 * @description O componente gumgaErrors serve para mostrar todas mensagens de validações do formulário de forma agrupada.
	 *
	 * @example
	 *  Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
	 *  <pre>
	 *    <form name="myForm">
	 *      <gumga-errors></gumga-errors>
	 *      <input type="number" name="minNumber" ng-model="minNumber" gumga-error gumga-min-number="20">
	 *    </form>
	 *  </pre>
	*/
	Errors.$inject = ['$compile'];
  function Errors($compile) {
    return {
      restrict: 'E',
			scope: {},
			template: '<ul><li ng-repeat="error in errors" >{{ error.message }}</li></ul>',
      require: '^form',
      link: function (scope, elm, attrs, ctrl) {
				scope.errors = [];

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
					// error.valid = !error.valid;
					var errorCopy = angular.copy(error);
					errorCopy.valid = !errorCopy.valid;
					var exist = scope.errorsContains(scope.errors, errorCopy);
					if (exist) {
						scope.errors.splice(exist, 1);
					}
				}
				scope.$on('$errorMessage', function(event, data) {
					if (data.valid == false) {
						scope.addError(data);
					} else {
						scope.removeError(data);
					}
				});
      }
    }
  }
	angular.module('gumga.directives.form.errors',[])
	.directive('gumgaErrors',Errors);
})();
