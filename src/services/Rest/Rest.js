(function(){
	'use strict';

	Base.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaRest
	 * @description
	 * 	O service GumgaRest é uma evolução do service {@link gumga.core:GumgaBase}, pois sua configuração não necessita
	 * 	de nenhuma outra configuração adicional no service que irá chamá-lo.
	 *
	 * ## Exemplo
	 * <pre>
	 * angular.module('sample',['gumga.core'])
	 * .service('GumgaRest',function(GumgaRest){
	 * 	   //Exemplo de utilização.
	 * 	   var service = new GumgaRest('http://www.gumga.com.br/api');
	 *     // Ou, caso não queira adicionar nenhum método, utilizar:
	 *     // return new GumgaRest('http://www.gumga.com.br/api');
	 *
	 *	   service.get = function(page){
	 *	       alert('Modifiquei um método da service e chamei o padrão!');
	 *		     return GumgaRest.prototype.get.call(this,page);
	 *	   }
	 * 	   return service;
	 * })
	 * </pre>
	 *
	 * # Métodos
	 *
	 *  `GumgaRest.get(params)`
	 *
	 *  O método get aceita um parâmetro `url` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">params</label> Parâmetros da query que será feita.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
	 *  `GumgaRest.resetAndGet()`
	 *
	 *  O método resetAndGet reseta a query atual e performa uma chamada HTTP do tipo GET.
	 *
	 *  ### Retorno
	 *
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP GET.
	 *
	 * 	---
	 *
 	 *  `GumgaRest.getById(id)`
	 *
	 *  O método getById aceita um parâmetro `id` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number]</label> <label class="label label-info">id</label> Identificador do registro que será buscado.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
	 *  `GumgaRest.getNew()`
	 *
	 *  O método getById  retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Retorno
	 *
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP GET.
	 *
	 *  ---
 	 *  `GumgaRest.delete(data)`
	 *
	 *  O método delete recebe como parâmetro um objeto que será deletado. O objeto deve ter um parâmetro ID,
	 *  que será passado para a url da chamada.
	 *
 	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">data</label> Registro que será deletado.
	 *
	 *  ### Retorno
	 *
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP DELETE.
	 *
	 *  ---
	 *
 	 *  `GumgaRest.sort(field,way)`
	 *
	 * O método sort recebe dois parâmetros para fazer a ordenação: `field` e `way`, que determinarão qual campo será ordenado
	 * e se será 'asc' ou 'desc'.
	 *
 	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">field</label> Qual campo será feita a ordenação
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">way</label> Em que sentido a ordenação será feita, se será ascendente `asc` ou descendente `desc`.
	 *  ### Retorno
	 *
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP GET.
	 *
	 *  ---
	 *
	 *  `GumgaRest.deleteCollection(array)`
	 *
	 *  O método deleteAll aceita um parâmetro `url`  e retorna uma promise de uma série de chamadas http do tipo DELETE que serão resolvidas ao mesmo tempo.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Array</label><label class="label label-info">array</label> Array com todas os registros que serão deletados
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise após todas as chamadas terem sido resolvidas.
	 *  ---
	 *
 	 *  `GumgaRest.saveImage(attribute,data)`
	 *
	 *  O método saveImage aceita dois parâmetros `attribute` e `data` e retorna uma promise de de uma chamada HTTP POST FORM-DATA.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">attribute</label> Atributo no qual a imagem será feito o
	 *  bind após o form ter sido enviado completo.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Dados da imagem que foi selecionada..
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP POST. Nesta promise, será retornado o valor de uma String que deverá ser atribuída ao atributo
	 *  onde estava a imagem. Esta string é um identificador para quando o registro for enviado através de um post.
	 *  ---
 	 *  `GumgaRest.deleteImage(attribute,data)`
	 *
	 *  O método deleteImage aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP DELETE FORM-DATA.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">attribute</label> Atributo no qual a imagem será feito o
	 *  bind após o form ter sido enviado completo.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">data</label> Dados da imagem que foi selecionada.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retorna uma promise da chamada HTTP DELETE.
	 *  ---
 	 *
 	 *  `GumgaRest.getSearch(field,param)`
	 *
	 *  O método getSearch aceita dois parâmetros `field` e `param` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">[String]</label> <label class="label label-info">field</label> Qual campo a busca será feita. Caso
	 *  queira fazer a busca em mais de um campo, passar uma string com os nomes separados por vírgula.
 	 *  - <label class="label label-warning" style="margin-right: 1%">[Object]</label> <label class="label label-info">param</label> Objeto que irá conter os parâmetros
 	 *  da busca.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
	 *
 	 *  `GumgaRest.getAdvancedSearch(param)`
	 *
	 *  O método getAdvancedSearch aceita um parâmetro `param` e retorna uma promise de uma chamada HTTP do tipo GET.
	 *  ### Parâmetros
 	 *  - <label class="label label-warning" style="margin-right: 1%">[Object]</label> <label class="label label-info">param</label> Objeto que irá conter os parâmetros
 	 *  da busca.
	 *  ### Retorno
	 *  - <label class="label label-info">HttpPromise</label> Retona uma promise da chamada HTTP GET.
	 *  ---
   *
 	 *  `GumgaRest.resetDefaultState()`
	 *
	 *  O método resetDefaultState retorna o objeto de query ao seu estado padrão.
	 *
	 *  ---
	 */
	function Base($http,$q){
		function RestPrototype(url){
			this._url = url;
			this._query = {params: {start: 0,pageSize: 10}};
		}
		RestPrototype.prototype.get = _get;
		RestPrototype.prototype.resetAndGet = _resetAndGet;
		RestPrototype.prototype.getNew = _getNew;
		RestPrototype.prototype.getById = _getById;
		RestPrototype.prototype.save = _save;
		RestPrototype.prototype.update= _update;
		RestPrototype.prototype.delete = _delete;
		RestPrototype.prototype.sort = _sort;
		RestPrototype.prototype.deleteCollection = _deleteCollection;
		RestPrototype.prototype.saveImage = _saveImage;
		RestPrototype.prototype.deleteImage = _deleteImage;
		RestPrototype.prototype.getSearch = _getSearch;
		RestPrototype.prototype.getAdvancedSearch = _getAdvancedSearch;
		RestPrototype.prototype.resetDefaultState = _resetQuery;
		function _get(page){
			if (page) {
				this._query.params.start = (page - 1) * this._query.params.pageSize;
				if (page < 1) throw 'Invalid page';
			}
			return $http.get(this._url,this._query);
		}
		function _getNew () {return $http.get(this._url + '/new')}
		function _getById(id){return $http.get(this._url + '/' + id);}
		function _save (v){return $http.post(this._url,v);}
		function _update (v){
			if(v.id){
				return $http.put(this._url + '/' + v.id ,v);
			}
			return this.save(v);
		}
		function _delete(v){return $http.delete(this._url + '/' + v.id);}
		function _resetQuery(){this._query = {params: {start: 0,pageSize: 10}};}

		function _resetAndGet(){
			this.resetDefaultState();
			return $http.get(this._url,this._query);
		}
		function _sort(f,w){
			this.resetDefaultState();
			this._query.params.sortField = f;
			this._query.params.sortDir = w;
			return $http.get(this._url,this._query);
		}
		function _deleteCollection(arr){
			var url = this._url;
			return $q.all(arr.map(function(v){
				return $http.delete(url + '/' + v.id);
			}))
		}
		function _saveImage(a,m){
			var fd = new FormData();
			fd.append(a,m);
			return $http.post(this._url + '/' +a ,fd,{
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
		}
		function _deleteImage(a){
			var fd = new FormData();
			fd.append(a,{});
			return $http.delete(this._url + '/' +a,fd,{
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
		}
		function _getSearch(f,p){
			this.resetDefaultState();
			(!p) ?  p = '' : angular.noop;
			this._query.params.q = p;
			this._query.params.searchFields = f;
			return this.get();
		}
		function _getAdvancedSearch(p){
			if(typeof p === 'string'){
				this._query.params = {}
				this._query.params.aq = p;
				return $http.get(this._url,this._query);
			}
			if(!p.hql || !p.source) throw 'You\'ve passed the wrong parameters to GumgaRest.getAdvancedSearch';
			this._query.params = {};
			this._query.params.aq = p.hql;
			this._query.params.aqo = p.source;
			return $http.post(this._url + '/aq',this._query);
		}
		return RestPrototype;
	}

	angular.module('gumga.services.rest',[])
	.service('GumgaRest',Base);

})();
