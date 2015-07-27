(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:GumgaAddress
	 * @restrict E
	 * @element ANY
	 * @scope
	 * @description O componente GumgaAddress recebe um objeto que será preenchido com o endereço, que pode ser pesquisado através do CEP (Utilizando um WebService GUMGA), 
	 * ou preenchido manualmente pelo usuário. 
	 * @param {Object} value - Objeto que irá conter o endereço pesquisado/preenchido pelo usuário. - Obrigatório
	 * @param {String} name -  String que será usada como identificador do componente
	 * @param {String} title - Título que irá aparecer no accordion - Opcional
	 * @param {Function} onSearchCepStart - Função que será executada quando a consulta do CEP começar. - Opcional
	 * @param {Function} onSearchCepSuccess - Função que será executada quando a consulta do CEP retornar com sucesso. - Opcional
	 * @param {Function} onSearchCepError - Função que será executada quando a consulta do CEP retornar com erro. - Opcional
	 * @example
	 * <pre>
	 * 	var addressObject = {
        zipCode : null,
        premisseType: null,
        premisse: null,
        number: null,
        information: null,
        neighbourhood: null,
        localization: null,
        state: null,
        country: null
}
      </pre>
      */
	AddressDirective.$inject = ['GumgaAddressService','$http'];
      /*
            TODO[1]: Remover gif da busca
            TODO[2]: Adicionar mensagem enquanto procura.      
            TODO[3]: Foco no input de número quando a busca retorna.
       */
      function AddressDirective(GumgaAddressService,$http){
      	var template = [
      	'<div class="address" style="padding-left: 0">',
      	'    <div class="col-md-8 col-sm-12 col-xs-12" style="padding-left: 0">',
      	'          <accordion>',
      	'                <accordion-group style="margin-top: 1%" is-open="true" heading="{{::title}}">',
      	'                      <div class="col-md-12">',
      	'                            <label for="input{{::id}}">CEP</label>',
      	'                            <div class="input-group">',
      	'                                  <input type="text" class="form-control" ng-model="value.zipCode" id="input{{::id}}" ng-keypress="custom($event,value.zipCode)">',
      	'                                  <span class="input-group-btn">',
      	'                                        <button class="btn btn-primary" type="button" ng-click="searchCep(value.zipCode)" ng-disabled="loader{{::id}}" id="buttonSearch{{::id}}">Search <i class="glyphicon glyphicon-search"></i></button>',  '<img src="./resources/images/ajax-loader.gif" style="margin-left: 5%" ng-show="loader{{::id}}">',
      	'                                  </span>',
      	'                            </div>',
      	'                      </div>',
      	'                      <div class="col-md-4">',
      	'                            <label for="tipoLogradouro"><small>Tipo Logradouro</small></label>',
      	'                            <select type="text" ng-model="value.premisseType" class="form-control" ng-options="log for log in factoryData.logs"></select>',
      	'                      </div>',
      	'                      <div class="col-md-5" style="padding-left: 0; padding-right: 0">',
      	'                            <label for="Logradouro"><small>Logradouro</small></label>',
      	'                            <input type="text" ng-model="value.premisse" class="form-control id="oi"/>',
      	'                      </div>',
      	'                      <div class="col-md-3">',
      	'                            <label for="Número"><small> Número </small></label>',
      	'                            <input type="text" ng-model="value.number" class="form-control" id="numberInput{{::id}}"/>',
      	'                      </div>',
      	'                      <div class="col-md-12">',
      	'                            <label for="Complemento"><small>Complemento</small></label>',
      	'                            <input type="text" ng-model="value.information" class="form-control"/>',
      	'                      </div>',
      	'                      <div class="col-md-7">',
      	'                            <label for="Bairro"><small> Bairro </small></label>',
      	'                            <input type="text" ng-model="value.neighbourhood" class="form-control"/>',
      	'                      </div>',
      	'                      <div class="col-md-5">',
      	'                            <label for="Localidade"><small> Localidade </small></label>',
      	'                            <input type="text" ng-model="value.localization" class="form-control"/>',
      	'                      </div>',
      	'                      <div class="col-md-4">',
      	'                            <label for="UF"><small> UF </small></label>',
      	'                            <select ng-model="value.state" class="form-control" ng-options="uf for uf in factoryData.ufs"></select>',
      	'                      </div>',
      	'                      <div class="col-md-4">',
      	'                            <label for="País"><small> País </small></label>',
      	'                            <select ng-model="value.country" class="form-control" ng-options="pais for pais in factoryData.availableCountries"></select>',
      	'                      </div>',
      	'                      <div class="col-md-4" style="padding-top: 2%">',
      	'                            <a class="btn btn-default pull-right" ng-href="{{returnLink(value)}}" target="_blank">Maps <i class="glyphicon glyphicon-globe"></i></a>',
      	'                      </div>',
      	'                </accordion-group>',
      	'          </accordion>',
      	'    </div>',
      	'</div>'];
      	return {
      		restrict: 'E',
      		scope: {
      			value: '=',
      			onSearchCepStart: '&?',
      			onSearchCepSuccess: '&?',
      			onSearchCepError: '&?'
      		},
      		template: template.join('\n'),
      		link: function (scope, elm, attrs, ctrl) {
                        if(!scope.value) throw "É necesário um atributo value para a directive GumgaAddress"
                        if(!attrs.name) throw "É necessário passar um parâmetro 'name' como identificador para GumgaAddress";
      			scope.title = attrs.title || 'Endereço';
      			scope.id = attrs.name;
      			scope['loader' + scope.id] = false;
                        scope.factoryData = {
                              ufs: GumgaAddressService.everyUf,
                              logs: GumgaAddressService.everyLogradouro,
                              availableCountries: GumgaAddressService.availableCountries
                        };
                        var eventHandler = {
                              searchCepStart: (attrs.onSearchCepStart ? scope.onSearchCepStart : angular.noop),
                              searchCepSuccess: (attrs.onSearchCepSuccess ? scope.onSearchCepSuccess : angular.noop),
                              searchCepError: (attrs.onSearchCepError ? scope.onSearchCepError: angular.noop)
                        };
                        if(scope.value || JSON.stringify(scope.value) == "{}"){
                              scope.value = GumgaAddressService.returnFormattedObject();
                        }
      			scope.custom = function ($event, cep) {
                              $event.charCode == 13? scope.searchCep(cep) : angular.noop;
      			};
      			
      			scope.returnLink = function (value) {
      				if (!value.number) {
      					value.number = '';
      				}
      				return 'https://www.google.com.br/maps/place/' + value.premisseType + ' ' + value.premisse + ',' + value.number+ ',' + value.localization;
      			};
      			scope.searchCep = function (cep) {
      				scope['loader' + scope.id] = true;
      				eventHandler.searchCepStart();
      				$http.get('http://www.gumga.com.br/services-api/public/cep/'+cep)
      				.success(function (values) {
      					eventHandler.searchCepSuccess();
      					scope['loader' + scope.id] = false;
      					if (parseInt(values.resultado) == 1) {
      						scope.value.premisseType = values.tipo_logradouro;
      						scope.value.premisse = values.logradouro;
      						scope.value.localization = values.cidade;
      						scope.value.neighbourhood = values.bairro;
      						scope.value.state = values.uf;
      						scope.value.country = 'Brasil';
      					}

      				})
      				.error(function(data){
      					eventHandler.searchCepError();
      				})
      			};
      			if (scope.value.zipCode) {
      				scope.searchCep(scope.value.zipCode);
      			}
      		}
      	};
      }	
      angular.module('gumga.directives.address',['gumga.services.address'])
      .directive('gumgaAddress',AddressDirective);
    })();