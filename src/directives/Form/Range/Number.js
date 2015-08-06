(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaRangeNumber
   * @restrict A
   * @element input
   * @description
	 * O componente GumgaRangeNumber serve para validar números mínimos e máximos em entradas de formulários com campos do tipo number.
   *
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser um **objeto** contendo duas propriedades, **min** e **max**
   * com os valores de suas respectivas datas para execução da validação range.
   *
   * ## Exemplo
   * Um exemplo da directive GumgaRangeNumber funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *
   * @example
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="rangeNumber" ng-model="rangeNumber" gumga-number-date="{min: 0, max: 20}">
   *      <p ng-show="myForm.rangeNumber.$error.rangenumber" class="text-danger">O número informado não está entre os valores esperados</p>
   *    </form>
   *  </pre>
	 */
	 RangeNumber.$inject = [];
	 function RangeNumber() {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attrs, ctrl) {
	 			if (attrs.type != 'number') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			}
	 			if (!attrs.gumgaRangeNumber) {
	 				throw "O valor da diretiva gumga-range-number não foi informado.";
	 			}
	 			var validateRangeNumber = function (inputValue) {
					var error = 'rangenumber';
          var range = scope.$eval(attrs.gumgaRangeNumber);
          var input = parseInt(inputValue);
          var isValid = input >= range.min && input <= range.max;
          ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: attrs.gumgaRangeNumber
					});
	 				return inputValue;
	 			};
	 			ctrl.$parsers.unshift(validateRangeNumber);
	 			ctrl.$formatters.push(validateRangeNumber);
	 			attrs.$observe('gumgaRangeNumber', function () {
	 				validateRangeNumber(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.range.number',[])
	 .directive('gumgaRangeNumber',RangeNumber);
	})();
