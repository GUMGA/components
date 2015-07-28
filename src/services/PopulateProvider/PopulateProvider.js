(function(){
	'use strict';

	Populate.$inject = [];

	function Populate(){
		var helpers = {}, configs = {}, methods = {};
		helpers.guaranteeString = function(s){ return (s && angular.isString(s))};
		helpers.guaranteeArray = function(a){ return (a && angular.isArray(a))};
		helpers.guaranteeIsDefined = function(d){ return angular.isDefined(d)};
		helpers.guaranteeBasicList = function(s){ return (s && this.guaranteeString(s) && s == 'basic-list')};
		configs['base-list']= {
			get: true,
			resetAndGet: true,
			getById: true,
			update: true,
			delete: true,
			sort: true,
			search: true,
			advancedSearch: true,
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
			Scope[Id.toLowerCase() + 'Save'] = function(value,param){
				Scope.$broadcast('beforeSave',value);
				var obj = {};
				obj[param] = value;
				Service.update(obj)
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
			}
		}
		return {
			setConfig: function(n,v){
				helpers.guaranteeString(n) && helpers.guaranteeIsDefined(v) ? (configs[n] = v) : angular.noop;
			},
			getConfig: function(string){
				return configs[string];
			},
			setMethod: function(name,config,fn){
				if(!(helpers.guaranteeString(name) && helpers.guaranteeString(config)))
					throw 'One of $populateProvider.setMethod arguments is wrong.';
				configs[config][name] = true;
				methods[name] = fn;
			},
			populateScope: function(scp,svc,id,config){
				if(!helpers.guaranteeIsDefined(scp)) throw 'The $scope passed for populateScope wasn\'t defined';
				if(!helpers.guaranteeIsDefined(id)) throw 'The identifier for populateScope must be passed';
				if(!helpers.guaranteeIsDefined(config)) throw 'The configuration for populateScope must be passed';
				if(!helpers.guaranteeIsDefined(svc)) throw 'The service for populateScope must be passed';
				if(configs[config]){
					scp[id] = {};
					scp[id].content = {};
					var configuration = configs[config];
					for (var key in configuration) if(configuration.hasOwnProperty(key)){
						methods[key](scp,svc,id);
					}
				}
			},
			$get: function(){
				return null;
			}
		}
	}
	angular.module('gumga.services.populate',[])
	.provider('$populate',Populate)
})();