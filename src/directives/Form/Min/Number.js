(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinNumber
   * @element input
   * @restrict A
   * @description O componente GumgaMinNumber serve para validar números mínimos para entradas em formulários com campos do tipo number.
   * 
   * ## Nota
   * Esta diretiva suporta apenas inputs do tipo number. O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
   * @example
   *  Um exemplo da directive GumgaMinNumber funcionando pode ser encontrado [aqui](http://embed.plnkr.co/GsMxY6QFES1rRktFCWsX).
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
