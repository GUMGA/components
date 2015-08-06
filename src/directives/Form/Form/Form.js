(function(){
	'use strict';
	/**
   * @ngdoc directive
   * @name gumga.core:gumgaForm
   * @element form
   * @restrict A
   * @description O componente gumgaForm trabalha em comunicação com o {@link gumga.core:gumgaErrors} e {@link gumga.core:gumgaError}
   * recebendo e enviando eventos de validação. O componente também expõe funções para manipulação do formulário e suas validações.
   *
	 * ## Métodos
	 *
	 * O componente GumgaForm possui seis métodos que podem ser acessados via scope no controller.
	 * - getMessages(name,error)
	 * - changeMessage(input,which,message)
	 * - setFormValid()
	 * - clearForm()
	 * - setFormPristine()
	 * - getFormErrors()
   *
   * @example
   *  Um exemplo da directive gumgaForm funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
   *  <pre>
   *    <form name="myForm" gumga-form="form">
   *      <input type="number" name="minNumber" ng-model="minNumber" gumga-min-number="20">
   *    </form>
   *  </pre>
  */
 	Form.$inject = ['$timeout','$rootScope'];
	function Form($timeout,$rootScope) {
		return {
			restrict: 'A',
			require: '^form',
			scope: false,
			link: function(scope, elm, attrs, ctrl) {
				if(!attrs.name) throw 'É necessário passar um valor para o atributo "name" do element <form>';
				scope.GumgaForm = {};
				var _form = scope[attrs.name];
				var _formControllers = [];
				(function() {
					angular.forEach(elm.find('input'),function(input){
						_formControllers.push({
							name: angular.element(input).controller('ngModel').$name,
							controller: angular.element(input).controller('ngModel'),
							errorMessages: {
								maxdate: 'A data especificada no campo {0} não deve ultrapassar o limite de: {1}.',
								maxlength: 'O texto especificado no campo {0} não deve ultrapassar o limite de: {1}.',
								maxnumber: 'O número especificado no campo {0} não deve ultrapassar o limite de: {1}.',
								mindate: 'A data especificada no campo {0} não deve ser menor que o limite mínimo de: {1}.',
								minlength: 'O texto especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
								minnumber: 'O número especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
								pattern: 'O texto especificado no campo {0} deve estar dentro do padrão: {1}.',
								rangedate:'A data especificada no campo {0} deve estar dentro do alcance: {1}.',
								rangenumber: 'O número especificado no campo {0} deve estar dentro do alcance: {1}.',
								required: 'O campo {0} é obrigatório.'
							}
						})
					})
				})();

				function returnObject(name){
						return _formControllers.filter(function($v){
							return $v.name.trim().toLowerCase() === name.trim().toLowerCase();
						})[0];
				}

				scope.$on('$error',function(ev,data){
					$timeout(function(){
						var _aux = returnObject(data.name)
<<<<<<< HEAD
						,		message = _aux.errorMessages[data.error].replace('{1}',data.value)
						,		auxMessage = message;
						data.error != 'required' ? auxMessage.replace('no campo {0}','') :
						message = message.replace('{0}',data.label);
=======
						,		message = _aux.errorMessages[data.error].replace('{1}',data.value).replace('{0}',data.label);
>>>>>>> upstream/v1.1.x_dev
						$rootScope.$broadcast('$errorMessage',{
							name: data.name,
							message: message,
							fieldMessage: auxMessage,
							valid: data.valid,
						})
					})
				})
				scope.GumgaForm.getMessages = function(name,error){
					if(!error){
						return returnObject(name).errorMessages;
					}
					if(returnObject(name).errorMessages){
						return Object(name).errorMessages[error] || null;
					}
				}
				scope.GumgaForm.changeMessage = function(input,which,message){
					if(!input || !which || !message) throw 'Valores passados errados para a função GumgaForm.changeMessage(input,which,message)'
					var aux = _formControllers.filter(function(value){
							return input == value.name;
					})[0];
					if(aux.errorsMessages && aux.errorsMessages[which]){
						aux.errorsMessages[which] = message;
					}
				}
				scope.GumgaForm.setFormValid = function () {
					for(var key in _form.$error) if(_form.$error.hasOwnProperty(key)){
							_form.$error[key].forEach(function (value) {
								value.$setValidity(key,true);
							})
					}
					scope.$apply();
				}
				scope.GumgaForm.clearForm = function(){
					_formControllers.forEach(function(controller){
						controller.controller.$setViewValue('');
						controller.controller.$setPristine();
					})
					scope.$apply();
				}

				scope.GumgaForm.setFormPristine = function () {
					_formControllers.forEach(function(controller){
						controller.controller.$setPristine();
					})
					scope.$apply();
				}

				scope.GumgaForm.getFormErrors = function(){
					var _arr = []
					,		name
					,		aux = [];
					for(var key in _form.$error) if(_form.$error.hasOwnProperty(key)){
							_form.$error[key].forEach(function (value) {
								aux.push(value.$name);
							})
							_arr.push({type: key,fields: aux});
							aux = [];
					}
					return _arr;
				}


			}
		}
	}
	angular.module('gumga.directives.form.form',[])
	.directive('gumgaForm',Form);
})();
