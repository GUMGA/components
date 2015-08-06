(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaMinNumber
   * @element input
   * @restrict A
   * @description O componente GumgaMinNumber serve para validar números mínimos para entradas em formulários.
   *
   * ## Nota
   * Esta diretiva suporta apenas **inputs** do tipo **number**. O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
   * @example
   *  Um exemplo da directive GumgaMinNumber funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *  <pre>
   *    <form name="myForm">
   *      <input type="number" name="minNumber" ng-model="minNumber" gumga-min-number="20">
   *      <p ng-show="myForm.minNumber.$error.minnumber" class="text-danger">Número inferior ao esperado</p>
   *    </form>
   *  </pre>
  */
	 MinNumber.$inject = [];
	 function MinNumber() {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attrs, ctrl) {
	 			if (attrs.type != 'number') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			}
	 			if (!attrs.gumgaMinNumber) {
	 				throw "O valor da diretiva gumga-min-number não foi informado.";
	 			}
	 			var validateMinNumber = function (inputValue) {
					var error = 'minnumber';
	 				var input = parseInt(inputValue);
	 				var min = parseInt(attrs.gumgaMinNumber);
	 				var isValid = input >= min;
	 				ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: attrs.gumgaMinNumber
					});
	 				return inputValue;
	 			};
	 			ctrl.$parsers.unshift(validateMinNumber);
	 			ctrl.$formatters.push(validateMinNumber);
	 			attrs.$observe('gumgaMinNumber', function () {
	 				validateMinNumber(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.min.number',[])
	 .directive('gumgaMinNumber',MinNumber);
	})();
