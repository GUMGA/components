(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaMaxLength
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaMaxLength serve para validar quantidades máximas de caracteres em entradas de formulários.
   *
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
	 * @param {String} label Usado na integração com {@link gumga.core:gumgaErrors} para indicar em qual campo se encontra o erro.
	 * Se o atributo for omitido, a diretiva usará o atributo name do input.
	 *
   * @example
   *  Um exemplo da directive GumgaMaxLength funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
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
      link: function (scope, elm, attrs, ctrl) {
        if (!attrs.gumgaMaxLength) {
          throw "O valor da diretiva gumga-max-length não foi informado.";
        }
        var validateMaxLength = function (inputValue) {
					var error = 'maxlength';
          var input = (inputValue == undefined) ? -1 : inputValue.length;
          var max = attrs.gumgaMaxLength;
          var isValid = input <= max && input != -1;
          ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: attrs.gumgaMaxLength
					});
          return inputValue;
        };
        ctrl.$parsers.unshift(validateMaxLength);
        ctrl.$formatters.push(validateMaxLength);
        attrs.$observe('gumgaMaxLength', function () {
          validateMaxLength(ctrl.$viewValue);
        });
      }
    }
  }
  angular.module('gumga.directives.form.max.length',[])
  .directive('gumgaMaxLength',MaxLength);
})();
