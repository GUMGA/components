(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMaxLength
   * @restrict A
   * @element input
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMaxLength serve para validar quantidades máximas de caracteres em entradas de formulários.
	 */
	MaxLength.$inject = [];
	function MaxLength() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!attr.gumgaMaxLength) {
          throw "O valor da diretiva gumga-max-length não foi informado.";
        }
        var validateMaxLength = function (inputValue) {
          var input = (inputValue == undefined) ? -1 : inputValue.length;
          var max = attr.gumgaMaxLength;
          var isValid = input <= max && input != -1;
					// if (isValid) console.log(isValid);
          ctrl.$setValidity('maxlength', isValid);
          return inputValue;
        };
	 			ctrl.$parsers.unshift(validateMaxLength);
	 			ctrl.$formatters.push(validateMaxLength);
	 			attr.$observe('gumgaMaxLength', function () {
	 				validateMaxLength(ctrl.$viewValue);
	 			});
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.max.length',[])
	 .directive('gumgaMaxLength',MaxLength);
	})();
