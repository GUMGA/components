(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMaxDate
   * @restrict A
   * @element input[type='date']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMaxDate serve para validar datas máximas para entradas em formulários com campos do tipo date.
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
