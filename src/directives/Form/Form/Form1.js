(function(){
	'use strict';
	Form.$inject = [];

	function Form() {
		return {
			restrict: 'A',
			scope: false,
			priority: 501,
			require: 'form',
			transclude: false,
			controller: ['$scope','$element','$attrs','$timeout', function($scope, $element, $attrs, $timeout) {
				let ctrl = this;
				const defaultMessages = {
					maxdate: 'A data especificada no campo {0} não deve ultrapassar o limite de: {1}.',
					maxlength: 'O texto especificado no campo {0} não deve ultrapassar o limite de: {1}.',
					maxnumber: 'O número especificado no campo {0} não deve ultrapassar o limite de: {1}.',
					mindate: 'A data especificada no campo {0} não deve ser menor que o limite mínimo de: {1}.',
					minlength: 'O texto especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
					minnumber: 'O número especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
					pattern: 'O texto especificado no campo {0} deve estar dentro do padrão: {1}.',
					rangedate:'A data especificada no campo {0} deve estar dentro do intervalo: {1}.',
					rangenumber: 'O número especificado no campo {0} deve estar dentro do intervalo: {1}.',
					validatetype: 'O valor digitado no campo {0} deve ser do tipo: {1}',
					required: 'O campo {0} é obrigatório.'
				};

				ctrl.customMessage			= {};
				ctrl.changeInputMessage	= changeInputMessage;
				ctrl.getDefaultMessages	= getDefaultMessages;
				ctrl.changeStateOfInput	= changeStateOfInput;
				ctrl.setFormValidity		=	setFormValidity;


				function changeInputMessage(inputName, obj){
					if(!inputName) throw 'É necessário passar o nome do input [changeInputMessage(inputName, messages)]';
					if(!obj) throw 'É necessário passar um objeto com as mensagens [changeInputMessage(inputName, messages)]';
					let isMessagesRight = Object.keys(obj).filter(key => !defaultMessages[key]),
							moreThanOne 		= isMessagesRight.length > 1;
					if(isMessagesRight.length > 0){
						throw `${moreThanOne ? 'Os' : 'O'} ${moreThanOne ? 'tipos' : 'tipo'} de validação ${moreThanOne ? isMessagesRight.join(',') : isMessagesRight} não ${moreThanOne ? 'existem' : 'existe'}.`
					}
					ctrl.customMessage[inputName] = obj;
					return this;
				}

				function getDefaultMessages(){
					return angular.copy(defaultMessages);
				}

				function changeStateOfInput(inputName, validationType, inputIsValid, value){
					if(!inputName) throw 'É necessário passar um valor válido como primeiro parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]';
					if(!validationType) throw 'É necessário passar um valor válido como segundo parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]';
					if(inputIsValid !== true && inputIsValid !== false) throw 'É necessário passar um booleano como terceiro parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]';
					let custom = ctrl.customMessage[inputName] ? ctrl.customMessage[inputName] : {};
					let message =
							(custom[validationType] ? custom[validationType] : defaultMessages[validationType])
								.replace('{0}', inputName)
								.replace('{1}', validationType.includes('range') ? ('mínimo de ' + value[0] + ' e máximo de ' + value[1]) : value);

					let objectSentToGumgaError = {validationType, message};
					if(inputIsValid) delete objectSentToGumgaError.message;
					$scope.$emit(`${inputName.toLowerCase()}-${inputIsValid ? '' : 'in'}valid`, objectSentToGumgaError);
					return this;
				}

				function setFormValidity(boolean = true){
					$timeout(() =>{
						let errors	= $scope[$attrs.name].$error,
						toExclude 	= [];
						Object.keys(errors)
						.forEach(value => errors[value].forEach((x, idx) =>{
							toExclude.push(x);
							if(idx == errors[value].length -1){
								toExclude.forEach(x => x.$setValidity(value,boolean));
								toExclude = [];
							}
						}));
						return this;
					});
				}
			}]
		}
	}
	angular.module('gumga.directives.form.form1',[])
	.directive('gumgaForm',Form);
})();
