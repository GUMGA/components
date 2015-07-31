(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinLength
   * @element input
   * @restrict A
   * @description O componente GumgaMinLength serve para validar quantidades mínimas de caracteres em entradas de formulários.
   * 
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
   * @example
   *  Um exemplo da directive GumgaMinLength funcionando pode ser encontrado [aqui](http://embed.plnkr.co/ENXymH2Drgw3MDPJ9dli).
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="minLength" ng-model="minLength" gumga-min-length="20" id="minLength">
   *      <p ng-show="myForm.minLength.$error.minlength" class="text-danger">Tamanho inferior ao esperado</p>
   *    </form>
   *  </pre>
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
