(function(){
	'use strict';
	/**
   * @ngdoc directive
   * @name gumga.core:GumgaPattern
   * @restrict A
   * @element input
	 * @function
   * @scope false
   * @description
	 * O componente GumgaPattern serve para validar expressões regulares de formulários.
	 */
	Pattern.$inject = [];
  function Pattern() {
    return {
			restrict: 'A',
	 		require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
				if (!attr.gumgaPattern) {
					throw "O valor da diretiva gumga-pattern não foi informado.";
				}
				var validatePattern = function (inputValue) {
					var regex = new RegExp('^' + attr.gumgaPattern + '$');
					var isValid = regex.test(inputValue);
					ctrl.$setValidity('pattern', isValid);
					return inputValue;
				};
				ctrl.$parsers.unshift(validatePattern);
				ctrl.$formatters.push(validatePattern);
				attr.$observe('gumgaPattern', function () {
					validatePattern(ctrl.$viewValue);
				});
      }
    }
  }
  angular.module('gumga.directives.form.pattern',[])
  .directive('gumgaPattern',Pattern);
})();
