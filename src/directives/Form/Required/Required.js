(function(){
  'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaRequired
   * @restrict A
   * @element ANY
   * @description
   * O componente GumgaRequired serve para validar campos obrigatórios.
   *
   * ## Exemplo
   * Um exemplo da directive GumgaRequired funcionando pode ser encontrado [aqui](http://embed.plnkr.co/iznjjYkg3tjGSVH5LAOs).
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
      link: function (scope, elm, attr, ctrl) {
        attr.required = true;

        ctrl.$validators.required = function(modelValue, viewValue) {
          return !attr.required || !ctrl.$isEmpty(viewValue);
        };
      }
    }
  }
  angular.module('gumga.directives.form.required',[])
  .directive('gumgaRequired',Required);
})();
