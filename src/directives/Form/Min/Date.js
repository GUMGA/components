(function(){
	'use strict';

	MinDate.$inject = ['$filter'];

	function MinDate($filter) {
		return {
			restrict: 'A',
			require: ['ngModel','?^gumgaForm'],
			link: (scope, elm, attrs, controllers) => {
				if (attrs.type != 'date') throw 'Esta diretiva suporta apenas inputs do tipo date';
				if (!attrs.gumgaMinDate) throw "O valor da diretiva gumga-min-date não foi informado.";

				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'mindate',
						format							= 'yyyy-MM-dd',
						name								=	attrs.name,
						field      					= attrs.field,
						limitValue					= attrs.gumgaMinDate;

				function validateMinDate(inputValue) {
					if(inputValue){
						let input 	= $filter('date')(inputValue, format),
						min 				= $filter('date')(limitValue, format),
						isValid 		= (input >= min);
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue,field);
					}
					return inputValue;
				};

				ngModelController.$parsers.unshift(validateMinDate);
				ngModelController.$formatters.push(validateMinDate);

				attrs.$observe('gumgaMinDate', function () {
					validateMinDate(ngModelController.$viewValue);
				});
			}
		}
	}
	angular.module('gumga.directives.form.min.date',[])
	.directive('gumgaMinDate',MinDate);
})();
