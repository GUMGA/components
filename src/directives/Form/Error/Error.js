(function(){
	'use strict';
   /**
    * @ngdoc directive
    * @name gumga.core:gumgaError
    * @element input
    * @restrict A
    * @description O componente gumgaError serve para mostrar mensagens de validações abaixo do input responsável pelo erro.
    *
    * @example
    *  Um exemplo da directive gumgaError funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
    *  <pre>
    *    <form name="myForm">
    *      <input type="number" name="minNumber" ng-model="minNumber" gumga-error gumga-min-number="20">
    *    </form>
    *  </pre>
   */
  Error.$inject = ['$compile'];
  function Error($compile) {
    return {
      restrict: 'A',
			scope: {},
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
					var errorCopy = angular.copy(error);
					errorCopy.valid = !errorCopy.valid;
					var exist = scope.errorsContains(scope.errors, errorCopy);
					if (exist) {
						scope.errors.splice(exist, 1);
					}
				}
				scope.$on('$errorMessage', function(event, data) {
          if (elm[0].name == data.name) {
            if (data.valid == false) {
  						scope.addError(data);
  					} else {
  						scope.removeError(data);
  					}
          }
				});

        var template = '<ul><li ng-repeat="error in errors" >{{ error.fieldMessage }}</li></ul>';
        elm.after($compile(template)(scope));
      }
    }
  }
	angular.module('gumga.directives.form.error',[])
	.directive('gumgaError',Error);
})();
