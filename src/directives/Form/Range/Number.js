(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaRangeNumber
   * @restrict A
   * @element input[type='number']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMaxNumber serve para validar números máximos em entradas de formulários com campos do tipo number.
	 */
	 RangeNumber.$inject = [];
	 function RangeNumber() {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'number') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			}
	 			if (!attr.gumgaRangeNumber) {
	 				throw "O valor da diretiva gumga-range-number não foi informado.";
	 			}
	 			var validateRangeNumber = function (inputValue) {
          var range = scope.$eval(attr.gumgaRangeNumber);
          var input = parseInt(inputValue);
          var isValid = input >= range.min && input <= range.max;
          ctrl.$setValidity('rangenumber', isValid);
	 				return inputValue;
	 			};
	 			ctrl.$parsers.unshift(validateRangeNumber);
	 			ctrl.$formatters.push(validateRangeNumber);
	 			attr.$observe('gumgaRangeNumber', function () {
	 				validateRangeNumber(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.range.number',[])
	 .directive('gumgaRangeNumber',RangeNumber);
	})();
