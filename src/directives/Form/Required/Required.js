(function(){
  'use strict';

  Required.$inject = ['$timeout'];
  function Required($timeout) {
    return {
      restrict: 'A',
      require: ['ngModel','^?gumgaForm'],
      link: function (scope, elm, attrs, controllers) {
        let error     = 'required',
            name      = attrs.name,
            ngModel   = controllers[0],
            gumgaForm = controllers[1];
        (function() {

            let isValid = !!(ngModel.$viewValue && ngModel.$viewValue.length > 0);
            gumgaForm.changeStateOfInput(name, error, isValid, null);
            ngModel.$setValidity(error,isValid);

        }());

        function validateRequired(inputValue) {
          let isValid = !!(inputValue && inputValue.length > 0);
          gumgaForm.changeStateOfInput(name, error, isValid, null);
          ngModel.$setValidity(error,isValid);
          return inputValue;
        };

        ngModel.$parsers.unshift(validateRequired);
        ngModel.$formatters.push(validateRequired);
        attrs.$observe('gumgaRequired', x => validateRequired(ngModel.$viewValue));
      }
    }
  }
  angular.module('gumga.directives.form.required',[])
  .directive('gumgaRequired',Required);
})();
