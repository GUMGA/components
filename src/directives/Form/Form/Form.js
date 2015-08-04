(function(){
	'use strict';
	Form.$inject = ['$timeout'];
	function Form($timeout) {
		return {
			restrict: 'A',
			require: '^form',
			scope: false,
			link: function(scope, elm, attrs, ctrl) {
				if(!attrs.name) throw 'É necessário passar um valor para o atributo "name" do element <form>';
				var _form = scope[attrs.name];
				scope.clearForm = function () {
						scope.$digest();
						for(var key in _form.$error) if(_form.$error.hasOwnProperty(key)){
								_form.$error[key].forEach(function (value) {
									value.$setValidity(key,true);
								})
						}
				}
			}
		}
	}
	angular.module('gumga.directives.form.form',[])
	.directive('gumgaForm',Form);
})();
