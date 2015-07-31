(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMaxDate
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaMaxDate serve para validar datas máximas em entradas de formulários com campos do tipo date.
   * 
   * ## Nota
   * Esta diretiva suporta apenas inputs do tipo date. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.
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
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'date') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo date';
	 			}
	 			if (!attr.gumgaMaxDate) {
	 				throw "O valor da diretiva gumga-max-date não foi informado.";
	 			}
        // if (!GumgaDateService.validateFormat('YMD', attr.gumgaMaxDate)) {
        //   throw 'O valor da diretiva não corresponde ao formato yyyy-mm-dd';
        // }
        var validateMaxDate = function (inputValue) {
        	var format = 'yyyy-MM-dd';
        	var input = $filter('date')(inputValue, format);
        	var max = $filter('date')(attr.gumgaMaxDate, format);
        	var isValid = input <= max;
        	ctrl.$setValidity('maxdate', isValid);
        	return inputValue;
        };
        ctrl.$parsers.unshift(validateMaxDate);
        ctrl.$formatters.push(validateMaxDate);
        attr.$observe('gumgaMaxDate', function () {
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
