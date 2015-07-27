(function(){
	'use strict';
	Form.$inject = [];
	function Form() {
		return {
			restrict: 'A',
			scope: {
				clearForm: '=clearfn',
				validateForm: '=validatefn'
			},
			template:'',
			require: '^form',
			link: function(scope, elm, attr, ctrl) {
        scope.master = {};
				scope.clearForm = function() {
          console.log(ctrl);
					// scope.$emit('clearFields', {});
				}
        var form = attr.name;
				scope.validateForm = function() {
					angular.forEach(ctrl.$error, function(e, k) {
            // console.log(e);
            // e[0].$setValidity(k, false);
            console.log(scope);
          });
				}
			}
		}
	}
	angular.module('gumga.directives.form',
		[
      'gumga.directives.form.max.date',
      'gumga.directives.form.max.length',
      'gumga.directives.form.max.number',
      'gumga.directives.form.min.date',
      'gumga.directives.form.min.length',
		  'gumga.directives.form.min.number',
      'gumga.directives.form.pattern',
      'gumga.directives.form.range.date',
		  'gumga.directives.form.range.number',
		  'gumga.directives.form.required',
		]
	)
	.directive('gumgaForm',Form);
})();
