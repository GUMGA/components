(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaMaxNumber
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaMaxNumber serve para validar números máximos em entradas de formulários.
   *
   * ## Nota
   * Esta diretiva suporta apenas **inputs** do tipo **number**. O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.
   *
   * @example
   *  Um exemplo da directive GumgaMaxNumber funcionando pode ser encontrado [aqui](http://embed.plnkr.co/IKifBxWz5i5obkVAmuxI).
   *  <pre>
   *    <form name="myForm">
   *      <input type="number" name="maxNumber" ng-model="maxNumber" gumga-max-number="20">
   *      <p ng-show="myForm.maxNumber.$error.maxnumber" class="text-danger">Número superior ao esperado</p>
   *    </form>
   *  </pre>
   */
   MaxNumber.$inject = [];
   function MaxNumber() {
     return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
       if (attr.type != 'number') {
        throw 'Esta diretiva suporta apenas inputs do tipo number';
      }
      if (!attr.gumgaMaxNumber) {
        throw "O valor da diretiva gumga-max-number não foi informado.";
      }
      var validateMaxNumber = function (inputValue) {
        var input = parseInt(inputValue);
        var max = parseInt(attr.gumgaMaxNumber);
        var isValid = input <= max;
        ctrl.$setValidity('maxnumber', isValid);
        return inputValue;
      };
      ctrl.$parsers.unshift(validateMaxNumber);
      ctrl.$formatters.push(validateMaxNumber);
      attr.$observe('gumgaMaxNumber', function () {
        validateMaxNumber(ctrl.$viewValue);
      });

      scope.$on('clearFields',function(event, data) {
       ctrl.$modelValue = null;
       console.log('directive date clear');
					// console.log(elm);
					// console.log();
				});
    }
  }
}
angular.module('gumga.directives.form.max.number',[])
.directive('gumgaMaxNumber',MaxNumber);
})();
