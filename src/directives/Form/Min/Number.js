(function(){
	'use strict';

	MinNumber.$inject = [];

	function MinNumber() {
		return {
			restrict: 'A',
			require: ['ngModel','?^gumgaForm'],
			link: function (scope, elm, attrs, controllers) {
				if (attrs.type != 'number') throw 'Esta diretiva suporta apenas inputs do tipo number';
				if (!attrs.gumgaMinNumber) throw "O valor da diretiva gumga-min-number não foi informado.";
				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'minnumber',
						name								=	attrs.name,
						field      					= attrs.field,
						limitValue					= parseInt(attrs.gumgaMinNumber);

				function validateMinNumber(inputValue) {
					if(inputValue){
						let isValid = parseInt(inputValue) >= limitValue;
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue,field);
					}
					return inputValue;
				}
				ngModelController.$parsers.unshift(validateMinNumber);
				ngModelController.$formatters.push(validateMinNumber);
				attrs.$observe('gumgaMinNumber', x => validateMinNumber(ngModelController.$viewValue));
			}
		}
	}
	angular.module('gumga.directives.form.min.number',[])
	.directive('gumgaMinNumber',MinNumber);
})();
