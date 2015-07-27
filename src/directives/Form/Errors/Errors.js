(function(){
	'use strict';
	Errors.$inject = [];
  function Errors() {
    return {
      restrict: 'A',
      scope: {},
      template:'',
      require: '^form',
      link: function (scope, elm, attrs, ctrl) {
         g('diretiva form errors');
      }
    }
  }
	angular.module('gumga.directives.form.errors',[])
	.directive('gumgaErrors',Errors);
})();
