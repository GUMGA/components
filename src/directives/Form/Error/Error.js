(function(){
	'use strict';

  Error.$inject = ['$compile'];
	
  function Error($compile) {
    return {
      restrict: 'A',
			scope: false,
      require: '^?gumgaForm',
      link: (scope, elm, attrs, gumgaCtrl) => {
				scope[`${attrs.name.concat('errors')}`] = {};
				let nameOfInput = attrs.name,
						translationField = attrs.translationField,
						template 		= `<ol class="list-errors text-danger"><li ng-repeat="(key, value) in ${nameOfInput.concat('errors')}" ><label>{{ value }}</li></ol>`,
						err = scope[`${nameOfInput.concat('errors')}`];
				scope.$on(`${nameOfInput}-valid`, (ev, data) => {
					(err[data.validationType] ? (delete err[data.validationType]) : angular.noop);
				});
				scope.$on(`${nameOfInput}-invalid`, (ev, data) =>{
					if(!err[data.validationType]) err[data.validationType] = data.message
				})
        elm.after($compile(template)(scope));
      }
    }
  }
	angular.module('gumga.directives.form.error',[])
	.directive('gumgaError',Error);
})();
