(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaRangeDate
   * @restrict A
   * @element input
   * @description
	 * O componente GumgaRangeDate serve para validar datas mínimas e máximas para entradas em formulários com campos do tipo date.
   *
   * ## Nota
   * O valor do atributo/diretiva é **obrigatório** e deve ser um **objeto** contendo duas propriedades, **min** e **max**
   * com os valores de suas respectivas datas para execução da validação range.
   *
   * ## Exemplo
   * Um exemplo da directive GumgaRangeDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *
   * @example
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="rangeDate" ng-model="rangeDate" gumga-range-date="{min: '1986-12-29', max: '2015-07-20'}" id="rangedate">
   *      <p ng-show="myForm.cep.$error.rangedate" class="text-danger">A data informada não está entre os valores esperados</p>
   *    </form>
   *  </pre>
	 */
	 RangeDate.$inject = ['$filter'];
	 function RangeDate($filter) {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attrs, ctrl) {
	 			if (attrs.type != 'date') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo date';
	 			}
	 			if (!attrs.gumgaRangeDate) {
	 				throw "O valor da diretiva gumga-range-date não foi informado.";
	 			}
        var validateRangeDate = function (inputValue) {
					var error = 'rangedate';
          var format = 'yyyy-MM-dd';
          var range = scope.$eval(attrs.gumgaRangeDate);
        	var input = $filter('date')(inputValue, format);
          var min = $filter('date')(range.min, format);
        	var max = $filter('date')(range.max, format);
        	var isValid = input >= min && input <= max;
        	ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: attrs.gumgaRangeDate
					});
        	return inputValue;
        };
        ctrl.$parsers.unshift(validateRangeDate);
        ctrl.$formatters.push(validateRangeDate);
        attrs.$observe('gumgaRangeDate', function () {
        	validateRangeDate(ctrl.$viewValue);
        });
      }
    }
  }
  angular.module('gumga.directives.form.range.date',[])
  .directive('gumgaRangeDate',RangeDate);
})();
