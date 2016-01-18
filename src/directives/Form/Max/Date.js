(function(){
	'use strict';

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
						field      					= attrs.field,
						limitValue					= attrs.gumgaMaxDate;

				function validateMaxDate(inputValue) {
					if(inputValue){
						let input 	= $filter('date')(inputValue, format),
						max 				= $filter('date')(limitValue, format),
						isValid 		= input <= max;
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue, field);
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
