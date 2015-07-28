(function(){
  'use strict';
  /**
  * @ngdoc directive
  * @name gumga.core:GumgaRequired
  * @restrict A
  * @element input, textarea
  * @function
  * @scope false
  * @description
  * O componente GumgaRequired serve para validar campos obrigatórios
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
