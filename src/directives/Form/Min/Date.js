(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaMinDate
   * @element input
   * @restrict A
   * @description O componente GumgaMinDate serve para validar datas mínimas em entradas de formulários com campos do tipo date.
   * 
   * ## Nota
   * Esta diretiva suporta apenas inputs do tipo date. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.
   *
   * @example
   *  Um exemplo da directive GumgaMinDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/GZr9ml0fTkK1Zrlh985F).
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="minDate" ng-model="minDate" gumga-min-date="2015-07-20">
   *      <p ng-show="myForm.minDate.$error.mindate" class="text-danger">Data inferior a esperada</p>
   *    </form>
   *  </pre>
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
