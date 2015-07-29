(function(){
	'use strict';

	Base.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name  gumga.core:GumgaBase
	 * @description 
	 * 	O service GumgaBase pode ser utilizado como helper para fazer chamadas HTTP. Ele permite que o programador não precise incluir o service $http
	 * 	do AngularJS e já vem com algumas funções incluídas. Para utilizar o GumgaBase, basta íncluí-lo como dependência.
	 *
	 * ## Métodos
	 *- get
	 *- getById
	 *- getNew
	 *- deleteAll
	 *- save
	 *- update
	 *- del
	 *- postImage
	 *- deleteImage
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
