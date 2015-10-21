(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaValidateType
   * @element input
   * @restrict A
   * @scope false
   * @description O componente GumgaValidateType serve para validar entradas de dados compatíveis seu tipo.
   *
   * ## Nota
   * Esta diretiva suporta apenas **inputs** do tipo **date**. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.
   *
	 * @param {String} label Usado na integração com {@link gumga.core:gumgaErrors} para indicar em qual campo se encontra o erro.
	 * Se o atributo for omitido, a diretiva usará o atributo name do input.
	 *
   * @example
   *  Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *  <pre>
   *    <form name="myForm">
   *      <input type="date" name="maxDate" ng-model="maxDate" gumga-max-date="2015-07-20">
   *      <p ng-show="myForm.maxDate.$error.maxdate" class="text-danger">Data superior a esperada</p>
   *    </form>
   *  </pre>
   */
   ValidateType.$inject = [];
   function ValidateType() {
     return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
	      var type;
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
				if (type == 'unknown') {
					throw 'Esta diretiva suporta apenas inputs dos tipos date, datetime-local, time, week, month, number, url e email.';
				}
        var validateType = function (inputValue) {
          var error = 'validatetype';
        	var isValid = elm[0].validity.valid;
          console.log(isValid);
        	ctrl.$setValidity(error, isValid);
					scope.$broadcast('$error', {
						name: attrs.name,
						label: attrs.label || attrs.name,
						valid: isValid,
						error: error,
						value: type
					});
        	return inputValue;
        };
        ctrl.$parsers.unshift(validateType);
        ctrl.$formatters.push(validateType);
        attrs.$observe('gumgaValidateType', function () {
        	validateType(ctrl.$viewValue);
        });
      }
    }
  }
  angular.module('gumga.directives.form.validate.type',[])
  .directive('gumgaValidateType',ValidateType);
})();
