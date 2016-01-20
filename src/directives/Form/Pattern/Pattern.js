(function(){
	'use strict';
	Pattern.$inject = [];
  function Pattern() {
    return {
			restrict: 'A',
	 		require: ['ngModel', '?^gumgaForm'],
      link:(scope, elm, attrs, controllers) => {
				if (!attrs.gumgaPattern)throw  "O valor da diretiva gumga-pattern não foi informado.";
				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'pattern',
						name								=	attrs.name,
						field      					= attrs.field,
						regex								= new RegExp(`^${attrs.gumgaPattern}$`);

				function validatePattern (inputValue) {
					if(inputValue) {
						let isValid = regex.test(inputValue);
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, attrs.gumgaPattern, field);
					}
					return inputValue;
				};

				ngModelController.$parsers.unshift(validatePattern);
				ngModelController.$formatters.push(validatePattern);
				attrs.$observe('gumgaPattern', x => validatePattern(ngModelController.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.pattern',[])
  .directive('gumgaPattern',Pattern);
})();
