(function(){
	'use strict';

   MaxLength.$inject = [];
   function MaxLength() {
    return {
      restrict: 'A',
      require: ['ngModel','?^gumgaForm'],
      link: function (scope, elm, attrs, controllers) {
				if (!attrs.gumgaMaxLength) throw "O valor da diretiva gumga-max-length não foi informado.";
				let ngModelController 	= controllers[0],
						gumgaFormController	=	controllers[1],
						error								=	'maxlength',
						name								=	attrs.name,
            field      = attrs.field,
						limitValue					= parseInt(attrs.gumgaMaxLength);

        function validateMaxLength(inputValue) {
					if(inputValue){
          	let isValid = inputValue.length <= limitValue;
						ngModelController.$setValidity(error, isValid);
						gumgaFormController.changeStateOfInput(name, error, isValid, limitValue, field);
					}
          return inputValue;
        };

        ngModelController.$parsers.unshift(validateMaxLength);
        ngModelController.$formatters.push(validateMaxLength);
        attrs.$observe('gumgaMaxLength', x => validateMaxLength(ngModelController.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.max.length',[])
  .directive('gumgaMaxLength',MaxLength);
})();
