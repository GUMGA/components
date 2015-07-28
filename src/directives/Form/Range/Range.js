(function(){
	'use strict';
Range.$inject = ['GumgaDateService'];
  function Range(GumgaDateService) {
    return {
      restrict: 'A',
			require: '?ngModel',
      link: function (scope, elm, attr, ctrl) {
         g('diretiva form range');
				if (!attr.gumgaRange) {
					throw "O valor da diretiva gumga-range não foi informado.";
				}
        if (attr.type != 'number' && attr.type != 'date') {
					throw 'Esta diretiva suporta apenas tipos number e date';
				}
				var range = scope.$eval(attr.gumgaRange);
        if (attr.type == 'date') {
          var format = 'YMD';
          GumgaDateService.validateFormat(format,range.min);
          GumgaDateService.validateFormat(format,range.max);
          range.min = Date.parse(range.min);
          range.max = Date.parse(range.max);
        }
        ctrl.$validators.range = function(modelValue, viewValue) {
          if (attr.type == 'date') {
            var viewValue = Date.parse(viewValue);
          }
					var valid = viewValue >= range.min && viewValue <= range.max;
					ctrl.$setValidity('range', valid);
					return valid;
      	};
        // var min, max;
				// switch (attr.type) {
				// 	case 'number':
				// 		min = parseInt(range[0]);
        //     max = parseInt(range[1]);
        //     if (min > max) {
        //       throw 'O valor da diretiva deve seguir a ordem mínimo e máximo. Ex. 10,20'
        //     }
				// 		break;
				// 	case 'date':
				// 		min = range[0];
        //     max = range[1];
        //     if (min > max) {
        //       throw 'O valor da diretiva deve seguir a ordem mínimo e máximo. Ex. 10,20'
        //     }
				// 		var format = 'YMD';
				// 		GumgaDateService.validateFormat(format,min);
        //     GumgaDateService.validateFormat(format,max);
				// }
      }
    }
  }
	angular.module('gumga.directives.form.range',['gumga.services.date'])
	.directive('gumgaRange',Range);
})();
