(function(){
	'use strict';

	Populate.$inject = [];
	/**
	 * @ngdoc service
	 * @name gumga.core:$populateProvider
	 * @description O service **$populate** é utilizado para adicionar funções básicas de CRUD, que já fazem a conexão com o Service
	 *  (*Melhor utilizado com o service GumgaRest*), possibilitando assim que o $scope fique limpo. É possível também criar uma configuração
	 *  nova para ser utilizada, extender as já criadas e recuperar o objeto de controle da configuração.
	 *
	 * 	As funções criam um objeto com o nome do ID passado para armazenar os dados. Além disso, o identificador é utilizado para nomear as funções. Caso o Identificador
	 * 	passado seja `User` e a função seja `get`, o nome da função será `userGet`, para evitar colisão de nomes.
	 * 	Todas as funções possuem eventos que são disparados antes e depois da execução da função, para ajudar o desenvolvedor a extender as funcionalidades
	 * 	das funções sem precisar sobrescrever-las. Para utilizar estes eventos, basta adicionar um listener no $scope, como por exemplo:
	 *  <pre>
	 *  	$scope.$on('beforeGet',function(){
	 *    alert('Antes do Get!');
	 *  	})
	 *
	 * 		$scope.$on('afterGet',function(values){
	 *		  // values é retorno da função asíncrona.
	 * 		})
	 * 	</pre>
	 *
	 *
	 * # Como utilizar:
	 *
	 * 	Para utilizar o assistente, é necessário injetar como dependência no bloco de configuração do módulo:
	 * 	<pre>
	 *  	angular.module('sample',['gumga.core'])
	 *  	.config(function($populateProvider){
	 *     $stateProvider
   *   	 .state('crud.list', {
   *      url: '/list',
	 *      templateUrl: 'app/modules/crud/views/list.html',
	 *      controller: 'CrudController',
   *      resolve:  {
   *       populateScope: function(){
   *        return $populateProvider.populateScope;
   *       }
   *     }
   *   })
	 *   })
	 *  </pre>
	 *
	 * 	E depois no controller, utilizar ele executando a função populateScope que foi passada através do resolve:
	 * 	<pre>
	 * 		angular.module('sample')
	 * 		.controller('SampleController',
	 * 	   ['$scope','populateScope','UserService',function($scope,populateScope,UserService){
	 * 		   populateScope($scope,UserService,'User','base-list');
	 * 	   }])
	 * 	</pre>
	 *
	 * 	Pode-se optar também por não incluir no módulo de configuração, mas direto no controller:
	 * 	<pre>
	 * 		angular.module('sample')
	 * 		.controller('SampleController',
	 * 	   ['$scope','$populate','UserService',function($scope,$populate,UserService){
	 * 		   $populate.populateScope($scope,UserService,'User','base-list');
	 * 	   }])
	 * 	</pre>
	 *
	 * # Configurações:
	 *
	 * 	- `base-list`: A configuração `base-list` serve para incluir funções gerais que são necessárias em páginas de listagem, que são:
	 * 		- `get`
	 * 		- `resetAndGet`
	 * 		- `getById`
	 * 		- `update`
	 * 		- `saveQuery`
	 * 		- `delete`
	 *
	 *    - `sort`
	 *    - `search`
	 *    - `advancedSearch`
	 *
	 *
	 * 	- `base-form`: A configuração `base-form` serve para incluir funções gerais que são necessárias em páginas de formulário, que são:
	 * 		- `getNew`
	 * 		- `getById`
	 * 		- `save`
	 * 		- `update`
	 * 		- `saveImage`
	 *
	 *    - `deleteImage`
	 *
	 *
	 * 	- `many-to-many`: A configuração `many-to-many` serve para incluir funções que comumente são utilizadas em relações muitos para muitos, que são:
	 * 		- `search`
	 * 		- `save`
	 * 		- `searchAsync`
	 * 		- `saveAsync`
	 *
	 * 	- `many-to-one`: A configuração `many-to-one` serve para incluir funções que comumente são utilizadas em relações muitos para um, que são:
	 * 		- `search`
	 * 		- `save`
	 * 		- `saveAsync`
	 *
	 *	## Implementações:
	 *		Para ver as implementações das funções acima, clique [aqui]().
	 *
	 *	# Métodos
	 *  `$populate.setConfig(name,value)`
	 *
	 *  O método setConfig aceita dois parâmetros `name` e `value`, o nome da configuração e o objeto que irá fazer a configuração.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">name</label> String que será usada para identificar o objeto que será criado.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">value</label> Objeto de configuração que será usado.
	 *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	 *
	 *  ---
	 *
	 *  `$populate.getConfig(name)`
	 *
	 *  O método getConfig aceita um parâmetro `name`, que é o nome da configuração desejada.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">name</label> String que será usada para identificar o objeto que será recuperado.
	 *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	 *
	 * 	### Retorno
	 *
	 *  - <label class="label label-info">Object</label> Configuração que será recuperada da função.
	 *
	 *
	 *  ---
	 *
	 *  `$populate.setMethod(name,config,function)`
	 *
	 *  O método setMethod aceita três parâmetros: `name`,`config`, `function`. Este método é utilizado para extender as funcionalidades de uma configuração.
	 *
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">name</label> String que será usada para identificar como será o nome da função a ser adicionada.
	 *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">config</label> String que será usada para identificar qual objeto de configuração esta função será adicionada.
	 *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	 *  - <label class="label label-warning" style="margin-right: 1%">Function</label><label class="label label-info">function</label> Função que será adicionada ao $scope. *Ao passar a função, o desenvolvedor
	 *  tem acesso a 4 parâmetros que serão utilizados para definir a função no scope: `Scope`, `Service`,`Id`*.
	 *
	 *  ---
	 *
 	 *
	 *  `$populate.populateScope(scope,service,id,config)`
	 *
	 *  O método populateScope aceita quatro parâmetros: `scope`,`service`, `id` e `config`. Este método é utilizado para popular o $scope do controlador com as funções da configuração.
	 *
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label><label class="label label-info">scope</label> Objeto onde as funções são colocadas, caso sejam num controlador, no *$scope*.
	 *   Para adicionar a função, coloque o nome da função e o valor dele como `true`
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">id</label> Identificador que será utilizado para armazenar os dados no $scope, além de nomear
	 *  as funções.
 	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">config</label> String que será utilizada para definir qual configuração será utilizada.
	 *  ---
	 */

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
			saveQuery: true,
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
				Service.resetQuery();
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
				return this;
			}
		}
	}
	angular.module('gumga.services.populate',[])
	.provider('$populate',Populate)
})();
