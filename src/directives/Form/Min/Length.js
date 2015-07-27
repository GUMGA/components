(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinLength
   * @restrict A
   * @element input
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMinLength serve para validar quantidades mínimas de caracteres em entradas de formulários.
	 */
	MinLength.$inject = [];
	function MinLength() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!attr.gumgaMinLength) {
          throw "O valor da diretiva gumga-min-length não foi informado.";
        }
        var validateMinLength = function (inputValue) {
          var input = (inputValue == undefined) ? -1 : inputValue.length;
          var min = attr.gumgaMinLength;
          var isValid = input >= min;
          ctrl.$setValidity('minlength', isValid);
          return inputValue;
        };
	 			ctrl.$parsers.unshift(validateMinLength);
	 			ctrl.$formatters.push(validateMinLength);
	 			attr.$observe('gumgaMinLength', function () {
	 				validateMinLength(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.min.length',[])
	 .directive('gumgaMinLength',MinLength);
	})();
