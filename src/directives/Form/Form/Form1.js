(function(){
	'use strict';
	Form.$inject = [];

	function Form() {
		return {
			restrict: 'A',
			scope: false,
			controller: ['$scope','$element','$attrs',function($scope, $element, $attrs) {
        $element.find(/input||/)
      }]
		}
	}
	angular.module('gumga.directives.form.form1',[])
	.directive('gumgaFormOne',Form);
})();
