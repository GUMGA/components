(function(){
	'use strict';

   MinLength.$inject = [];
   function MinLength() {
    return {
      restrict: 'A',
      require: ['ngModel','?^gumgaForm'],
      link: function (scope, elm, attrs, controllers) {
				if (!attrs.gumgaMinLength) throw "O valor da diretiva gumga-min-length não foi informado.";
				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'minlength',
						name								=	attrs.name,
            field               = attrs.field,
						limitValue					= parseInt(attrs.gumgaMinLength);

        function validateMinLength(inputValue) {
					if(inputValue){
          	let isValid = inputValue.length >= limitValue;
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue,field);
					}
          return inputValue;
        };

        ngModelController.$parsers.unshift(validateMinLength);
        ngModelController.$formatters.push(validateMinLength);
        attrs.$observe('gumgaMinLength', x => validateMinLength(ngModelController.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.min.length',[])
  .directive('gumgaMinLength',MinLength);
})();
