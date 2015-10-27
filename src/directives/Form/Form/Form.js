(function(){
	'use strict';
	Form.$inject = ['$timeout','$rootScope'];
	/**
	* @ngdoc directive
	* @name gumga.core:gumgaForm
	* @restrict A
	* @element form
	* @description A directive gumgaForm é utilizada em conjunto com as directives de validação de input. Ela contém funções que serão
	* usadas para manipular o formulário. Ela expõe no $scope um objeto GumgaForm para agrupar as funções em um lugar só.
	*
	*	# Como utilizar
	*
	* O componente GumgaForm deve ser incluído no elemento `form`, que necessita ter um atributo name. É necessário também que os inputs que serão utilizados tenham um atributo name,
	* pois o controle deles é feito a partir deste atributo.
	*
	*	<pre>
	*  <form name="UserForm" gumga-form>
	*	   ...
	*  </form>
	* </pre>
	*
	*	# Métodos
	*
	*`$scope.GumgaForm.getMessages(name,error)`
  *
  *  O método `getMessages` aceita dois parâmetros `name` e `error`, onde name é o nome do input que desejada
  *  recuperar a mensagem e o erro. Caso o parâmetro error não seja passado, é retornado o objeto com todas as mensagens do campo.
  *  ### Parâmetros
  *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">name</label> String que terá o nome do in put para retornar os errors.
  *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	*  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">error</label> String que será terá o nome do erro que será retornado. Caso
	*  não seja passado este parâmetro, será retornado um objeto com todos os erros.
  * 	### Retorno
  *
  *  - <label class="label label-info">[Object|String]</label> String que conterá a mensagem de erro ou o objeto com todas as mensagens de erro.
	*
	* ----
	*
	*`$scope.GumgaForm.changeMessage(name,error,message)`
	*
	*  O método `changeMessage` aceita três parâmetros, `name`,`error` e `message`, onde `name` é o nome do input que desejada
	*  recuperar a mensagem, `error` é qual erro que a mensagem será alterada e `message` qual será a nova mensagem .
	*  ### Parâmetros
	*  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">name</label> String que terá o nome do input para retornar os errors.
	*   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	*  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">error</label> String que será terá o nome do erro que será retornado. Caso
	*  não seja passado este parâmetro, será retornado um objeto com todos os erros.
	*  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">message</label> String que será usada como mensagem de erro para a directive.
	* 	### Retorno
	*
	*  - <label class="label label-info">Boolean</label> True caso a mensagem tenha sido alterada, False caso não.
	*
	* ----
	*
	*`$scope.GumgaForm.setFormValid()`
	*
	*  O método `setFormValid` é utilizado para limpar todos os erros que estiverem ativos no formulário. Ele percorre o objeto de erro que o Angular.js cria automaticamente e valida todos os campos
	*  que estiverem com erro.
	*
	* ----
  *
	*`$scope.GumgaForm.setFormPristine()`
	*
	*  O método `setFormPristine` é utilizado para colocar todos os campos em um estado de $pristine, ou seja, quando ainda não foram atualizados pelo usuário.
	*
	* ----
	*
	*`$scope.GumgaForm.clearForm()`
	*
	*  O método `clearForm` é utilizado para limpar todos os campos do formulário e, além disso, colocar eles em um estado de $pristine.
	*
	* ----
	*
	*`$scope.GumgaForm.getFormErrors()`
	*
	*  O método `getFormErrors` é utilizado para quando deseja-se obter todos os erros que estão presentes no formulário.
	*
	* ### Retorno
	*
	*  - <label class="label label-info">[Array]</label> Lista que irá conter todos os erros que estão no formulário.
	*
	* ----
	*/
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
						console.log(angular.element(input));
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
								rangedate:'A data especificada no campo {0} deve estar dentro do intervalo: {1}.',
								rangenumber: 'O número especificado no campo {0} deve estar dentro do intervalo: {1}.',
								validatetype: 'O valor digitado no campo {0} deve ser do tipo: {1}',
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
						if (data.error.substring(0,5) == 'range') {
							var auxValue = scope.$eval(data.value);
							data.value = 'mínimo de ' + auxValue.min + ' e máximo de ' + auxValue.max;
						}
						var _aux = returnObject(data.name)
						,		message = _aux.errorMessages[data.error].replace('{1}',data.value)
						,		auxMessage = message;
						if (data.error != 'required') {
							auxMessage = auxMessage.replace('no campo {0}','');
						} else {
							auxMessage = auxMessage.replace('{0}','');
						}
						message = message.replace('{0}',data.label);
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
						return returnObject(name).errorMessages[error] || null;
					}
				}
				scope.GumgaForm.changeMessage = function(input,which,message){
					if(!input || !which || !message) throw 'Valores passados errados para a função GumgaForm.changeMessage(input,message)'
					var aux = _formControllers.filter(function(value){
						return input == value.name;
					})[0];
					if(aux.errorMessages && aux.errorMessages[which]){
						aux.errorMessages[which] = message;
						return true;
					}
					return false;
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
