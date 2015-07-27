(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinNumber
   * @restrict A
   * @element input[type='number']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMinNumber serve para validar números mínimos para entradas em formulários com campos do tipo number.
	 */
	 MinNumber.$inject = [];
	 function MinNumber() {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'number') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			}
	 			if (!attr.gumgaMinNumber) {
	 				throw "O valor da diretiva gumga-min-number não foi informado.";
	 			}
	 			var validateMinNumber = function (inputValue) {
	 				var input = parseInt(inputValue);
	 				var min = parseInt(attr.gumgaMinNumber);
	 				var isValid = input >= min;
	 				ctrl.$setValidity('minnumber', isValid);
	 				return inputValue;
	 			};
	 			ctrl.$parsers.unshift(validateMinNumber);
	 			ctrl.$formatters.push(validateMinNumber);
	 			attr.$observe('gumgaMinNumber', function () {
	 				validateMinNumber(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.min.number',[])
	 .directive('gumgaMinNumber',MinNumber);
	})();
