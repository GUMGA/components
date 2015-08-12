(function(){
	'use strict';

	Notification.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaNotification
	 * @description
	 * 	O service GumgaBase pode ser utilizado como helper para fazer chamadas HTTP. Ele permite que o programador não precise incluir o service $http
	 * 	do AngularJS e já vem com algumas funções incluídas. Para utilizar o GumgaBase, basta íncluí-lo como dependência.
	 *
	 *
	 *  # Métodos
	 *  `GumgaBase.get(url,params)`
	 *
	 *  O método get aceita dois parâmetros `url` e `params` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">params</label> Parâmetros da query que será feita.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
 	 *  `GumgaBase.getById(url,id)`
	 *
	 *  O método getById aceita dois parâmetros `url` e `id` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number]</label> <label class="label label-info">id</label> Identificador do registro que será buscado.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
	 *  `GumgaBase.getNew(url)`
	 *
	 *  O método getById aceita um parâmetro `url` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita e na qual
	 *   será feita a chamada para um novo registro.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP GET.
	 *  ---
 	 *  `GumgaBase.deleteAll(url,array)`
	 *
	 *  O método deleteAll aceita dois parâmetros `url` e `array` e retorna uma promise de uma série de chamadas http do tipo DELETE que serão resolvidas ao mesmo tempo.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">Array</label><label class="label label-info">array</label> Array com todas os registros que serão deletados
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise após todas as chamadas terem sido resolvidas.
	 *  ---
	 *  `GumgaBase.save(url,data)`
	 *
	 *  O método save aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP POST.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Objeto que deseja ser salvo.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP POST.
	 *  ---
 	 *  `GumgaBase.update(url,data)`
	 *
	 *  O método deleteAll aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP PUT.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Objeto que deseja ser atualizado.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP POST.
	 *  ---
 	 *  `GumgaBase.del(url,data)`
	 *
	 *  O método del aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP DELETE. Esta função é chamada para cada registro passado dentro do Array
	 *  na função deleteAll.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Objeto que deseja ser deletado.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP DELETE.
	 *  ---
	 *  `GumgaBase.postImage(url,attribute,data)`
	 *
	 *  O método postImage aceita três parâmetros `url`,`attribute` e `data` e retorna uma promise de de uma chamada HTTP POST FORM-DATA.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label>  Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">attribute</label> Atributo no qual a imagem será feito o
	 *  bind após o form ter sido enviado completo.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Dados da imagem que foi selecionada..
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP POST. Nesta promise, será retornado o valor de uma String que deverá ser atribuída ao atributo
	 *  onde estava a imagem. Esta string é um identificador para quando o registro for enviado através de um post.
	 *  ---
 	 *  `GumgaBase.deleteImage(url,attribute,data)`
	 *
	 *  O método del aceita três parâmetros `url`, `attribute` e `data` e retorna uma promise de uma chamada HTTP DELETE FORM-DATA.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">url</label> Endereço no qual a chamada http será feita.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">attribute</label> Atributo no qual a imagem será feito o
	 *  bind após o form ter sido enviado completo.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Dados da imagem que foi selecionada.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP DELETE.
	 *  ---
	 */
	function Notification($http,$q){
		var token = window.sessionStorage.getItem('token');
		var url = 'http://192.168.25.201/security-api/notifications/source?gumgaToken=' + token;
		var eventSource;

		this.getEvent = getEvent;
		this.newMessages = newMessages;
		this.newMessagesCount = newMessagesCount;

		function setUrl(url) {
			url = url;
		}
		function setToken(token) {
			token = token;
		}
		function getEvent() {
			if (token) url.concat('?gumgaToken=' + token);
			return new EventSource(url);
		}
		function newMessages() {
			getEvent().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessages);
				return data.newMessages;
			}, false);
		}
		function newMessagesCount() {
			getEvent().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessagesCount);
				return data.newMessagesCount;
			}, false);
		}
	}
	angular.module('gumga.services.notification',[])
	.service('GumgaNotification',Notification);
})();
