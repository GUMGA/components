(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinDate
   * @restrict A
   * @element input[type='date']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaMinDate serve para validar datas mínimas para entradas em formulários com campos do tipo date.
	 */
	 MinDate.$inject = ['$filter'];
	 function MinDate($filter) {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'date') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo date';
	 			}
	 			if (!attr.gumgaMinDate) {
	 				throw "O valor da diretiva gumga-min-date não foi informado.";
	 			}
        // if (!GumgaDateService.validateFormat('YMD', attr.gumgaMinDate)) {
        //   throw 'O valor da diretiva não corresponde ao formato yyyy-mm-dd';
        // }
        var validateMinDate = function (inputValue) {
					var format = 'yyyy-MM-dd';
					var input = $filter('date')(inputValue, format);
					var min = $filter('date')(attr.gumgaMinDate, format);
					var isValid = input >= min;
					ctrl.$setValidity('mindate', isValid);
					return inputValue;
				};
				ctrl.$parsers.unshift(validateMinDate);
				ctrl.$formatters.push(validateMinDate);
				attr.$observe('gumgaMinDate', function () {
					validateMinDate(ctrl.$viewValue);
				});
			}
		}
	}
	angular.module('gumga.directives.form.min.date',[])
	.directive('gumgaMinDate',MinDate);
})();
