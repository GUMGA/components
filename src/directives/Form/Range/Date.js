(function(){
	'use strict';

	 RangeDate.$inject = ['$filter'];
	 function RangeDate($filter) {
	 	return {
	 		restrict: 'A',
	 		require: ['ngModel','^?gumgaForm'],
	 		link: function (scope, elm, attrs, controllers) {
	 			if (attrs.type != 'date')throw 'Esta diretiva suporta apenas inputs do tipo date';
	 			if (!attrs.gumgaRangeDate) throw "O valor da diretiva gumga-range-date não foi informado.";

				let error								= 'rangedate',
						name								= attrs.name,
						format							= 'yyyy-MM-dd',
						ngModelController		=	controllers[0],
						gumgaFormController	=	controllers[1],
						range 							= scope.$eval(attrs.gumgaRangeDate),
						min 								= $filter('date')(range.min, format),
						max 								= $filter('date')(range.max, format);

        function validateRangeDate(inputValue) {
					if(inputValue){
						let input 	= $filter('date')(inputValue, format),
								isValid = input >= min && input <= max;
        		ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, attrs.gumgaRangeDate);
					}

        	return inputValue;
        };

        ngModelController.$parsers.unshift(validateRangeDate);
        ngModelController.$formatters.push(validateRangeDate);
        attrs.$observe('gumgaRangeDate', x => validateRangeDate(ngModelController.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.range.date',[])
  .directive('gumgaRangeDate',RangeDate);
})();
