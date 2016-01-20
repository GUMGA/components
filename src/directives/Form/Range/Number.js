(function(){
	'use strict';

	 RangeNumber.$inject = [];
	 function RangeNumber() {
	 	return {
	 		restrict: 'A',
	 		require: ['ngModel','^?gumgaForm'],
	 		link: function (scope, elm, attrs, controllers) {
	 			if (attrs.type != 'number') throw 'Esta diretiva suporta apenas inputs do tipo number';
	 			if (!attrs.gumgaRangeNumber) throw "O valor da diretiva gumga-range-number não foi informado.";
				let error 		= 'rangenumber',
						ngModel		=	controllers[0],
						gumgaForm	=	controllers[1],
						range 		= scope.$eval(attrs.gumgaRangeNumber),
						field      					= attrs.field,
						name			=	attrs.name;

	 			function validateRangeNumber(inputValue) {
					if(inputValue){
						let input 	= parseInt(inputValue),
								isValid = input >= range.min && input <= range.max;
						ngModel.$setValidity(error, isValid);
						gumgaForm.changeStateOfInput(name, error, isValid, attrs.gumgaRangeNumber,field);
					}
	 				return inputValue;
	 			};

	 			ngModel.$parsers.unshift(validateRangeNumber);
	 			ngModel.$formatters.push(validateRangeNumber);
	 			attrs.$observe('gumgaRangeNumber', x => validateRangeNumber(ngModel.$viewValue));
	 		}
	 	}
	 }
	 angular.module('gumga.directives.form.range.number',[])
	 .directive('gumgaRangeNumber',RangeNumber);
	})();
