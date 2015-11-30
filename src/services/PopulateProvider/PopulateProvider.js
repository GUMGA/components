(function(){
	'use strict';
	Populate.$inject = [];
	function Populate(){
		let helpers = {
			isString(str){
				return str && angular.isString(str);
			},
			isArray(arr){
				return arr && angular.isArray(arr);
			},
			isBasicList(str){
				return str && this.isString(str) && str == 'basic-list';
			}
		};
		let configs = {};
		let methods = {};

		configs['base-list']= {
			get: true,
			resetAndGet: true,
			getById: true,
			update: true,
			delete: true,
			sort: true,
			search: true,
			advancedSearch: true,
			saveQuery: true,
			getQuery: true,
			resetQuery: true
		};
		configs['base-form'] = {
			getNew: true,
			getById: true,
			save: true,
			update: true,
			saveImage: true,
			deleteImage: true
		};

		configs['many-to-many'] = {
			search: true,
			save: true,
			searchAsync: true,
			saveAsync: true
		}

		configs['many-to-one']={
			save: true,
			searchAsync: true,
			saveAsync: true
		}

		methods.searchAsync = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'AsyncSearch'] = function(field,value){
				return Service.getSearch(field, value)
				.then(function (data) {
					return data.data.values;
				});
			}
		}

		methods.getQuery = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'GetQuery'] = function(page){
				return Service.getQuery(page)
				.then(function(data){
					return data.data.values;
				})
			}
		}

		methods.saveQuery = function(Scope,Service,Id){
				Scope[Id.toLowerCase() + 'SaveQuery'] = function(query,name){
					Scope.$broadcast('beforeSaveQuery',{query: query, name: name});
					Service.saveQuery({query: query, name: name})
					.then(function(data){
						Scope.$broadcast('afterSaveQuery',data);
					})
				}
		}

		methods.saveAsync = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'AsyncSave'] = function(value,param){
				var obj = {};
				obj[param] = value;
				return Service.update(obj);
			}
		}
		methods.get = function(Scope,Service,Id){
			Scope[Id]= {};
			Scope.page = 0;
			Scope[Id.toLowerCase() + 'Get']= function(page) {
				Scope.$broadcast('beforeGet');
				Service.get(page)
				.then(function (values) {
					Scope[Id].content = values;
					Scope.$broadcast('afterGet',values);
				})
			}
			Scope[Id.toLowerCase() + 'Get']();
		};
		methods.resetAndGet = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'ResetAndGet'] = function(){
				Scope.page = 0;
				Scope.$broadcast('beforeResetAndGet');
				Service.resetAndGet()
				.then(function(values){
					Scope[Id].content = values;
					Scope.$broadcast('afterResetAndGet',values);
				})
			}
		};
		methods.getNew = function(Scope,Service,Id){
			Scope[Id] = Scope[Id] || {};
			Scope[Id.toLowerCase() + 'GetNew'] = function(){
				Scope.$broadcast('beforeGetNew');
				Service.getNew()
				.then(function(values){
					Scope.$broadcast('afterGetNew',values);
					Scope[Id]['new' + Id] = values;
				})
			}
		};
		methods.getById = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'GetById'] = function(id){
				Scope.$broadcast('beforeGetById');
				Service.getById(id)
				.then(function(values){
					Scope[Id]['id' + id] = values;
					Scope.$broadcast('afterGetById',values);
				})
			}
		};
		methods.save = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'Save'] = function(value){
				Scope.$broadcast('beforeSave',value);
				Service.update(value)
				.then(function(values){
					Scope.$broadcast('afterSave',values);
				})
			}
		};
		methods.update = function(Scope,Service,Id){
			Scope[Id.toLowerCase()+'Update'] = function(value){
				Scope.$broadcast('beforeUpdate',value);
				Service.update(value)
				.then(function(values){
					Scope.$broadcast('afterUpdate',values);
				})
			}
		};
		methods.delete = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'Delete'] = function(value){
				Scope.$broadcast('beforeDelete');
				Service.deleteCollection(value)
				.then(function(values){
					Scope.$broadcast('afterDelete',values);
					Scope[Id.toLowerCase() + 'Get']();
				})
			}
		};
		methods.sort = function(Scope,Service,Id){
			Scope[Id.toLowerCase()+'Sort'] = function(field,way){
				Scope.$broadcast('beforeSort');
				Service.sort(field,way)
				.then(function(values){
					Scope[Id].content = values;
					Scope.$broadcast('afterSort',values);
				})
			}
		};
		methods.saveImage = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'SaveImage'] = function(attribute,model){
				Scope.$broadcast('beforeSaveImage');
				return Service.saveImage(attribute,model);
			}
		};
		methods.deleteImage = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'DeleteImage'] = function(attribute,model){
				Scope.$broadcast('beforeDeleteImage');
				Service.deleteImage(attribute,model)
				.then(function(values){
					Scope.$broadcast('afterDeleteImage',values);
				})
			}
		};
		methods.search = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'Search'] = function(field,param){
				Scope.$broadcast('beforeSearch');
				Service.getSearch(field,param)
				.then(function(values){
					Scope[Id].content = values;
					Scope.$broadcast('afterSearch',values);
				})
			}
		}
		methods.advancedSearch = function(Scope,Service,Id){
			Scope[Id.toLowerCase() + 'AdvancedSearch'] = function(param){
				Scope.$broadcast('beforeAdvancedSearch',param)
				Service.getAdvancedSearch(param)
				.then(function(values){
					Scope[Id].content = values;
					Scope.$broadcast('afterAdvancedSearch',values)
				})
			}
		}
		methods.resetQuery = function(Scope,Service,id){
			Scope[id.toLowerCase() + 'ResetQuery'] = function(){
				Scope.page = 0;
				Service.resetQuery();
			}
		}

		return {
			setConfig(name, value = {}){
				if(!name) throw 'Você deve passar um nome para o componente $populate';
				configs[name] = value;
			},
			getConfig(name){
				return configs[name];
			},
			setMethod(name,config,fn){
				if(!!helpers.isString(name)) throw 'O argumento do nome é inválido';
				if(!!helpers.isString(config)) throw 'O argumento da configuração é inválido';
				configs[config][name] = true;
				methods[name] = fn;
			},
			populateScope(scp,svc,id,config){
				if(!angular.isDefined(scp)) throw 'The $scope passed for populateScope wasn\'t defined';
				if(!angular.isDefined(id)) throw 'The identifier for populateScope must be passed';
				if(!angular.isDefined(config)) throw 'The configuration for populateScope must be passed';
				if(!angular.isDefined(svc)) throw 'The service for populateScope must be passed';
				if(configs[config]){
					scp[id] = {};
					scp[id].content = {};
					var configuration = configs[config];
					for (var key in configuration) if(configuration.hasOwnProperty(key)){
						methods[key](scp,svc,id);
					}
				}
			},
			$get(){
				return this;
			}
		}
	}
	angular.module('gumga.services.populate',[])
	.provider('$populate',Populate)
})();
