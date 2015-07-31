(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMaxLength
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaMaxLength serve para validar quantidades máximas de caracteres em entradas de formulários.
   * 
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
   * @example
   *  Um exemplo da directive GumgaMaxLength funcionando pode ser encontrado [aqui](http://embed.plnkr.co/6KjgXFTEAnQq9GgWbbDB).
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="maxLength" ng-model="maxLength" gumga-max-length="20" id="maxLength">
   *      <p ng-show="myForm.maxLength.$error.maxlength" class="text-danger">Tamanho superior ao esperado</p>
   *    </form>
   *  </pre>
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
