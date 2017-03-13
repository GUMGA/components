(function(){
	'use strict';

  ModelError.$inject = ['$compile'];

  function ModelError($compile) {
    return {
      restrict: 'A',
			scope: false,
      require: '^?gumgaForm',
      link: (scope, elm, attrs, gumgaCtrl) => {
				// console.log(gumgaCtrl);

				if(!attrs.gumgaModelError){
					throw "gumgaModelError precisa de um objeto de configuração, veja na  <a target=\"_blank\" href=\"http://gumga.github.io\">documentação</a>";
				}

				let configuration = scope[attrs.gumgaModelError];

				if(!configuration.hasOwnProperty('ngModel')){
					throw "O Objeto de configuração precisa ter o atributo ngModel, veja na  <a target=\"_blank\" href=\"http://gumga.github.io\">documentação</a>";
				}

				if(!configuration.hasOwnProperty('options')){
					throw "O Objeto de configuração precisa ter o atributo options, veja na  <a target=\"_blank\" href=\"http://gumga.github.io\">documentação</a>";
				}



				//CRIA ERRO SE FOR VAZIO
				const validateEmpty = value => {
						if(!configuration.options.hasOwnProperty('empty')) return;
						let isvalid = !((value == undefined || value == '' || value.length == 0));
						gumgaCtrl.updateFormErrors(configuration.ngModel, 'empty', isvalid, configuration.options.empty.message);
				}

				//CRIA ERRO SE O TIPO NÃO FOR OBJETO =
				const validateIsObject = value => {
						let isvalid = !(value !== Object(value));
						gumgaCtrl.updateFormErrors(configuration.ngModel, 'type', isvalid, configuration.options.message);
				}

				const validateIsArray = value => {
						let isvalid = (Array.isArray(value));
						gumgaCtrl.updateFormErrors(configuration.ngModel, 'type', isvalid, configuration.options.message);
				}

				const validateObject = value => {
						validateEmpty(value);
						validateIsObject(value);
				}

				const validateMin = value => {
					if(!configuration.options.hasOwnProperty('min')) return;
					let isvalid = !(value.length < configuration.options.min.value);
					gumgaCtrl.updateFormErrors(configuration.ngModel, 'min', isvalid, configuration.options.min.message);
				}

				const validateMax = value => {
					if(!configuration.options.hasOwnProperty('max')) return;
					let isvalid = !(value.length > configuration.options.max.value);
					gumgaCtrl.updateFormErrors(configuration.ngModel, 'max', isvalid, configuration.options.max.message);
				}

				const validateArray = value => {
						validateEmpty(value);
						validateMin(value);
						validateMax(value);
						validateIsArray(value);
				}

				const validateModel = value => {
						switch (configuration.options.type.toLowerCase().trim()) {
							case 'object':
								validateObject(value);
								break;
							case 'array':
								validateArray(value);
								break;
						}
				}

				scope.$watch(configuration.ngModel, (value) => {
					validateModel(value);
					scope.$broadcast('form-changed');
				}, true);

      }
    }
  }
	angular.module('gumga.directives.form.modelerror',[])
	.directive('gumgaModelError', ModelError);

})();
