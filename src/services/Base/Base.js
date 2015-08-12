(function(){
	'use strict';

	Base.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaBase
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
	function Base($http,$q){
		var defaultParams = {};
		this.get = get;
		this.getById = getById;
		this.getNew = getNew;
		this.deleteAll = deleteAll;
		this.save = save;
		this.update = update;
		this.del = del;
		this.postImage = postImage;
		this.deleteImage = deleteImage;

		function get(url,params) {
			if (!params) {
				params = defaultParams;
			}
			return $http.get(url, params);
		}

		function getById(url,id) {
			return $http.get(url + '/' + id);
		}

		function getNew(url){
			return $http.get(url+'/new');
		}

		function deleteAll(url,entities) {
			var promises = entities.map(function(entity){
				return del(url,entity);
			});
			return $q.all(promises);
		}

		function save(url,entity) {
			return $http.post(url, entity);
		}

		function update(url,entity) {
			return $http.put(url + '/' + entity.id, entity);
		}

		function del(url,entity) {
			return $http.delete(url + '/' + entity.id);
		}

		function postImage(url, attribute, model) {
			var fd = new FormData();
			fd.append(attribute, model);
			return $http.post(url + '/' + attribute + '/', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
		}

		function deleteImage(url, attribute, value) {
			return $http.delete(url + '/' + attribute + '/' + value, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});

		}
	}
	angular.module('gumga.services.base',[])
	.service('GumgaBase',Base);
})();
