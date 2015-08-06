(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaPattern
   * @element input
   * @restrict A
   * @description O componente GumgaPattern serve para validar expressões regulares de formulários.
   *
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser uma **expressão regular**.
   *
	 * @param {String} label Usado na integração com {@link gumga.core:gumgaErrors} para indicar em qual campo se encontra o erro.
	 * Se o atributo for omitido, a diretiva usará o atributo name do input.
	 *
   * @example
   *  Um exemplo da directive GumgaPattern funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
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
      link: function (scope, elm, attrs, ctrl) {
				if (!attrs.gumgaPattern) {
					throw "O valor da diretiva gumga-pattern não foi informado.";
				}
				var validatePattern = function (inputValue) {
					var error = 'pattern';
					var regex = new RegExp('^' + attrs.gumgaPattern + '$');
					var isValid = regex.test(inputValue);
					ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: attrs.patternAlias || attrs.gumgaPattern
					});
					return inputValue;
				};
				ctrl.$parsers.unshift(validatePattern);
				ctrl.$formatters.push(validatePattern);
				attrs.$observe('gumgaPattern', function () {
					validatePattern(ctrl.$viewValue);
				});
      }
    }
  }
  angular.module('gumga.directives.form.pattern',[])
  .directive('gumgaPattern',Pattern);
})();
