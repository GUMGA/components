(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaMaxDate
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaMaxDate serve para validar datas máximas em entradas de formulários.
   *
   * ## Nota
   * Esta diretiva suporta apenas **inputs** do tipo **date**. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.
   *
   * @example
   *  Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/6KjgXFTEAnQq9GgWbbDB).
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="maxDate" ng-model="maxDate" gumga-max-date="2015-07-20">
   *      <p ng-show="myForm.maxDate.$error.maxdate" class="text-danger">Data superior a esperada</p>
   *    </form>
   *  </pre>
   */
   MaxDate.$inject = ['$filter'];
   function MaxDate($filter) {
     return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
	      if (attrs.type != 'date') {
	        throw 'Esta diretiva suporta apenas inputs do tipo date';
	      }
	      if (!attrs.gumgaMaxDate) {
	        throw "O valor da diretiva gumga-max-date não foi informado.";
	      }
        var validateMaxDate = function (inputValue) {
					var error = 'maxdate';
        	var format = 'yyyy-MM-dd';
        	var input = $filter('date')(inputValue, format);
        	var max = $filter('date')(attrs.gumgaMaxDate, format);
        	var isValid = input <= max;
        	ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						valid: isValid,
						error: error,
						value: attrs.gumgaMaxDate
					});
        	return inputValue;
        };
        ctrl.$parsers.unshift(validateMaxDate);
        ctrl.$formatters.push(validateMaxDate);
        attrs.$observe('gumgaMaxDate', function () {
        	validateMaxDate(ctrl.$viewValue);
        });

        scope.$on('clearFields',function(event, data) {
         ctrl.$modelValue = null;
         console.log('directive date clear');
					// console.log(elm);
					// console.log(ctrl);
				});
      }
    }
  }
  angular.module('gumga.directives.form.max.date',[])
  .directive('gumgaMaxDate',MaxDate);
})();
