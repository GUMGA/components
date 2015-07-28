(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMaxNumber
   * @restrict A
   * @element input[type='number']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMaxNumber serve para validar números máximos em entradas de formulários com campos do tipo number.
	 */
	 MaxNumber.$inject = [];
	 function MaxNumber() {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'number') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			}
	 			if (!attr.gumgaMaxNumber) {
	 				throw "O valor da diretiva gumga-max-number não foi informado.";
	 			}
	 			var validateMaxNumber = function (inputValue) {
	 				var input = parseInt(inputValue);
	 				var max = parseInt(attr.gumgaMaxNumber);
	 				var isValid = input <= max;
	 				ctrl.$setValidity('maxnumber', isValid);
	 				return inputValue;
	 			};
	 			ctrl.$parsers.unshift(validateMaxNumber);
	 			ctrl.$formatters.push(validateMaxNumber);
	 			attr.$observe('gumgaMaxNumber', function () {
	 				validateMaxNumber(ctrl.$viewValue);
	 			});

				scope.$on('clearFields',function(event, data) {
					ctrl.$modelValue = null;
					console.log('directive date clear');
					// console.log(elm);
					// console.log();
				});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.max.number',[])
	 .directive('gumgaMaxNumber',MaxNumber);
	})();
