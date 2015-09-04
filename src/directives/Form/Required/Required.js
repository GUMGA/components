(function() {
  'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaRequired
   * @restrict A
   * @element ANY
   * @description
   * O componente GumgaRequired serve para validar campos obrigatórios.
   *
   * ## Exemplo
   * Um exemplo da directive GumgaRequired funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *
   * @param {String} label Usado na integração com {@link gumga.core:gumgaErrors} para indicar em qual campo se encontra o erro.
   * Se o atributo for omitido, a diretiva usará o atributo name do input.
   *
   * @example
   *  <pre>
   *    <form name="myForm">
   *      <input type="text" name="required" ng-model="required" gumga-required>
   *      <p ng-show="myForm.required.$error.required" class="text-danger">Campo obrigatório</p>
   *    </form>
   *  </pre>
   */
  Required.$inject = [];

  function Required() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        attrs.required = true;
        var validateRequired = function(inputValue) {
          var error = 'required';
          var isValid = !attrs.required || !ctrl.$isEmpty(inputValue);
          ctrl.$setValidity(error, isValid);
          
          scope.$broadcast('$error', {
            name: attrs.name,
            label: attrs.label || attrs.name,
            valid: isValid,
            error: error,
            value: attrs.gumgaRequired
          });
          return inputValue;
        };
        ctrl.$parsers.unshift(validateRequired);
        ctrl.$formatters.push(validateRequired);
        attrs.$observe('gumgaRequired', function() {
          validateRequired(ctrl.$viewValue);
        });
      }
    }
  }
  angular.module('gumga.directives.form.required', [])
    .directive('gumgaRequired', Required);
})();
