(function(){
	'use strict';

   ValidateType.$inject = [];
	 
   function ValidateType() {
     return {
      restrict: 'A',
      require: ['ngModel', '?^gumgaForm'],
      link: function (scope, elm, attrs, controllers) {
	      let type,
						error			=	'validatetype',
						ngModel		=	controllers[0],
						gumgaForm	=	controllers[1],
						name			=	attrs.name;


	      switch (attrs.type) {
          case 'date': type = 'data'; break;
          case 'datetime-local': type = 'data e hora'; break;
          case 'time': type = 'hora'; break;
          case 'week': type = 'semana'; break;
          case 'month': type = 'mês'; break;
          case 'number': type = 'número'; break;
          case 'url': type = 'URL'; break;
          case 'email': type = 'e-mail'; break;
					default: type = 'unknown';
	      }
				if (type == 'unknown') throw 'Esta diretiva suporta apenas inputs dos tipos date, datetime-local, time, week, month, number, url e email.';

        function validateType(inputValue) {
					if(inputValue){
	        	let isValid = elm[0].validity.valid;
	        	ngModel.$setValidity(error, isValid);
						gumgaForm.changeStateOfInput(name, error, isValid, type);
					}
        	return inputValue;
        };

        ngModel.$parsers.unshift(validateType);
        ngModel.$formatters.push(validateType);
        attrs.$observe('gumgaValidateType', x => validateType(ngModel.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.validate.type',[])
  .directive('gumgaValidateType',ValidateType);
})();
