(function() {
  'use strict';

  GumgaCtrl.$inject = [];
  // Modelo utilizado para criar o objeto -----------------------------------------


  function Methods(Service){
    let self = this;
    this.callbacks = {};
    this.data = [];
    this.pageSize = 10;
    this.count = Infinity;
    this.methods = {
      get(page = 1){
        self.emit('getStart');
        Service
        .get(page)
        .then((data)=> {
          self.emit('getSuccess', data.data);
          self.data = data.data.values;
          self.pageSize = data.data.pageSize;
          self.count = data.data.count;1
        }, (err) => {self.emit('getError', err);})
      },
      getId(id = 0 ){
        self.emit('getIdStart');
        Service
        .getById(id)
        .then((data) => {
          self.emit('getIdSuccess', data.data);
          self.data = data.data;
          if(self.pageSize) delete self.pageSize;
          if(self.count) delete self.count
        }, (err) => {self.emit('getIdError', err);})
      },
      getNew(){
        self.emit('getNewStart');
        Service
        .getNew()
        .then((data) => {
          self.emit('getNewSuccess', data.data);
          self.data = data.data;
          if(self.pageSize) delete self.pageSize;
          if(self.count) delete self.count
        }, (err) => {self.emit('getNewError', err);})
      },
      put(value){
        self.emit('putStart');
        Service
        .update(value)
        .then(function(data){
          self.emit('putSuccess',data);
        }, (err) => {self.emit('putError', err);})
      },
      post(value){
        self.emit('postStart');
        Service
        .save(value)
				.then((data) => {
					self.emit('postStart', data);
				}, (err) => {self.emit('postError', err);})
      },
      delete(array){
        self.emit('deleteStart');
				Service
        .deleteCollection(array)
				.then((data) => {
					self.emit('deleteSuccess',data);
				}, (err) => {self.emit('deleteError', err);})
      },
      sort(field, way){
        self.emit('sortStart');
				Service
        .sort(field, way)
				.then((data) => {
          self.emit('sortSuccess', data.data);
          self.data = data.data.values;
          self.pageSize = data.data.pageSize;
          self.count = data.data.count;
				}, (err) => {self.emit('sortError', err);})
      },
      search(field, param){
        self.emit('searchStart');
        Service
        .getSearch(field,param)
        .then((data) => {
          self.emit('searchSuccess', data.data);
          self.data = data.data.values;
          self.pageSize = data.data.pageSize;
          self.count = data.data.count;
        }, (err) => {self.emit('searchError', err);})
      },
      advancedSearch(param){
        self.emit('advancedSearchStart');
				Service
        .getAdvancedSearch(param)
				.then((data) => {
          self.emit('advancedSearchSuccess', data.data);
          self.data = data.data.values;
          self.pageSize = data.data.pageSize;
          self.count = data.data.count;
				}, (err) => {self.emit('advancedSearchError', err);})
      },
      postQuery(query, name){
        self.emit('postQueryStart');
        Service.saveQuery({query: query, name: name})
        .then((data) =>{
          self.emit('postQuerySuccess');
        }, (err) => {self.emit('postQueryError', err);})
      },
      getQuery(page){
        self.emit('getQueryStart');
        return
        Service
        .getQuery(page)
				.then(function(data){
          self.emit('getQuerySuccess',data.data);
					return data.data.values;
				}, (err) => {self.emit('getQueryError', err);})
      }
    };
  }

  Methods.prototype.emit = function(ev,data){
    if(this.callbacks[ev]){
      this.callbacks[ev].forEach((cb)=> {
        cb(data);
      });
    }
    return this;
  }

  Methods.prototype.on = function(ev,cb){
    if(!this.callbacks[ev]){
      this.callbacks[ev] = [];
    }
    this.callbacks[ev].push(cb);
    return this;
  }

  // ------------------------------------------------------------------------------
  // Componente -------------------------------------------------------------------
  function GumgaCtrl(){

    function createRestMethods(container = ' ', service = ' ', identifierOrConfiguration){
      let idConstructor = identifierOrConfiguration.constructor;
      // Validando as entradas de dados.
      if(container.constructor !== Object)
      throw 'É necessário passar um objeto no primeiro parâmetro';
      if(service.constructor !== Object )
      throw 'É necessário passar um objeto no segundo parâmetro';
      if(idConstructor !== Object && idConstructor !== String)
      throw 'É necessário passar um objeto ou uma string no terceiro parâmetro';

      // Obtendo as opções que serão utilizadas.
      const options = this.createOptions(identifierOrConfiguration);

      let newObject = new Methods(service);
      return newObject;
    }

    function createOptions(identifierOrObject = {}){
      if(identifierOrObject.constructor === String){
        return {
          identifier: identifierOrObject,
          noScope: false
        }
      }
      let object = angular.extend({},identifierOrObject);
      object.noScope = !!object.noScope;
      if(!object.identifier)
      throw 'Você precisa passar um identificador para o objeto de configuração do createRestMethods!';

      return object;
    }
    return {
      createRestMethods,
      createOptions
    };
  }

  angular.module('gumga.services.gumgactrl',[])
  .factory('gumgaCtrl', GumgaCtrl);
}());
