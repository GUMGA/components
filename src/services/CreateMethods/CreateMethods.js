(function() {
  'use strict';

  GumgaCtrl.$inject = [];

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



  angular.module('gumga.services.createmethods',[])
  .factory('gumgaCtrl', GumgaCtrl);
}());
