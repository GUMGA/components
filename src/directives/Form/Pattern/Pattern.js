(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaPattern
   * @element input
   * @restrict A
   * @description O componente GumgaPattern serve para validar expressões regulares de formulários.
   * 
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser uma **expressão regular**.
   *
   * @example
   *  Um exemplo da directive GumgaPattern funcionando pode ser encontrado [aqui](http://embed.plnkr.co/rYRDHYIWwi5nz8YKwGaw).
   *  <pre>
   *    <form name="myForm">
   *      <input type="text" name="cep" ng-model="cep" gumga-pattern="(\d{5})\-(\d{3})" id="cep" placeholder="99999-999">
   *      <p ng-show="myForm.cep.$error.pattern" class="text-danger">Expressão não corresponde com o formato esperado</p>
   *    </form>
   *  </pre>
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
