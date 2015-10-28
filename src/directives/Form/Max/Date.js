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
	* @param {String} label Usado na integração com {@link gumga.core:gumgaErrors} para indicar em qual campo se encontra o erro.
	* Se o atributo for omitido, a diretiva usará o atributo name do input.
	*
	* @example
	*  Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
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
			require: ['ngModel','?^gumgaForm'],
			link: (scope, elm, attrs, controllers) => {
				if (attrs.type != 'date') throw 'Esta diretiva suporta apenas inputs do tipo date';
				if (!attrs.gumgaMaxDate) throw "O valor da diretiva gumga-max-date não foi informado.";

				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'maxdate',
						format							= 'yyyy-MM-dd',
						name								=	attrs.name,
						limitValue					= attrs.gumgaMaxDate;

				function validateMaxDate(inputValue) {
					if(inputValue){
						let input 	= $filter('date')(inputValue, format),
						max 				= $filter('date')(limitValue, format),
						isValid 		= input <= max;
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue);
					}
					return inputValue;
				};

				ngModelController.$parsers.unshift(validateMaxDate);
				ngModelController.$formatters.push(validateMaxDate);

				attrs.$observe('gumgaMaxDate', function () {
					validateMaxDate(ngModelController.$viewValue);
				});
			}
		}
	}
	angular.module('gumga.directives.form.max.date',[])
	.directive('gumgaMaxDate',MaxDate);
})();
