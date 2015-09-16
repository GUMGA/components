(function(){
	'use strict';
	/**
	* @ngdoc directive
	* @name gumga.core:gumgaAddress
	* @restrict E
	* @description O componente GumgaAddress recebe um objeto que será preenchido com o endereço, que pode ser pesquisado através do CEP (Utilizando um WebService GUMGA),
	* ou preenchido manualmente pelo usuário. Este objeto de entrada pode ser vazio ou preferivelmente no formato do objeto GUMGA.
	* ## Exemplo
	* Veja um exemplo em funcionamento [aqui](http://embed.plnkr.co/7t9mZtLl9bPuVhmig0oI/).
	* @param {Object} value Atributo obrigatório que irá conter o nome do objeto no $scope no qual os valores do Endereço serão colocados.
	* @param {String} name Atributo obrigatório e único que irá conter um nome de identificador para a directive.
	* @param {String} title Atributo opcional que irá conter o título para o panel da directive.
	* @param {Boolean} cep Adiciona ou remove bloco de CEP.
	* @param {Boolean} street Adiciona ou remove um campo do logradouro, sem um campo separado para número.
	* @param {Boolean} streetNumber Adiciona ou remove um campo do logradouro, com um campo extra para número.
	* @param {Boolean} complement Adiciona ou remove um campo de complemento.
	* @param {Boolean} neighbourhood Adiciona ou remove um campo para bairro.
	* @param {Boolean} cityStateCountry Adiciona ou remove um bloco para cidade, estado e país.
	* @param {Boolean} maps Adiciona ou remove um botão com link externo para o Google Maps do endereço referenciado.
	* @param {Function} onSearchCepStart Atributo opcional que irá conter o nome de uma função que será executada quando a busca pelo CEP começar. Requer uso do atributo cep.
	* @param {Function} onSearchCepSuccess Atributo opcional que irá conter o nome de uma função que será executada quando a busca pelo CEP retornar sucesso.
	*  Pode ser chamada com um atributo com os valores `on-search-cep-success="doSomething($value)"` e requer uso do atributo cep.
	* @param {Function} onSearchCepError Atributo opcional que irá conter o nome de uma função que será executada quando a busca pelo CEP retornar erro.
	*  Pode ser chamada com um atributo com os valores `on-search-cep-error="doSomething($value)"` e requer uso do atributo cep.
	*/

	AddressDirective.$inject = ['GumgaAddressService','$http','$compile'];
	function AddressDirective(GumgaAddressService,$http,$compile){
		var templateBegin =
		'<div class="address">' +
		'		<div class="col-md-8 col-sm-12 col-xs-12">' +
		'				<accordion>' +
		'						<accordion-group is-open="true" heading="{{::title}}">'
		;
		var blockCep =
		'<div class="row">' +
		'		<div class="col-md-12">' +
		'				<div class="form-group">' +
		'						<label for="input{{::id}}">CEP</label>' +
		'						<div class="input-group">' +
		'								<input type="text" class="form-control" ng-model="value.zipCode" id="input{{::id}}" ng-keypress="custom($event,value.zipCode)">' +
		'								<span class="input-group-btn">' +
		'										<button class="btn btn-primary" type="button" ng-click="searchCep(value.zipCode)" ng-disabled="loader{{::id}}" id="buttonSearch{{::id}}"><i class="glyphicon glyphicon-search"></i></button>' +
		'								</span>' +
		'						</div>' +
		'				</div>' +
		'		</div>' +
		'</div>'
		;
		var streetType =
		'<div class="form-group">' +
		'		<label for="tipoLogradouro">Tipo Logradouro</label>' +
		'		<select type="text" ng-model="value.premisseType" class="form-control" ng-options="log for log in factoryData.logs"></select>' +
		'</div>'
		;
		var street =
		'<div class="form-group">' +
		'		<label for="Logradouro">Logradouro</label>' +
		'		<input type="text" ng-model="value.premisse" class="form-control id="oi"/>' +
		'</div>'
		;
		var number =
		'<div class="form-group">' +
		'		<label for="Número">Número</label>' +
		'		<input type="text" ng-model="value.number" class="form-control" id="numberInput{{::id}}"/>' +
		'</div>'
		;
		var blockStreet =
		'<div class="row">' +
		'		<div class="col-md-4">' + streetType +
		'		</div>' +
		'		<div class="col-md-8">' + street +
		'		</div>' +
		'</div>'
		;
		var blockStreetNumber =
		'<div class="row">' +
		'		<div class="col-md-4">' + streetType +
		'		</div>' +
		'		<div class="col-md-5">' + street +
		'		</div>' +
		'		<div class="col-md-3">' + number +
		'		</div>' +
		'</div>'
		;
		var blockComplement =
		'<div class="row">' +
		'		<div class="col-md-12">' +
		'				<div class="form-group">' +
		'						<label for="Complemento">Complemento</label>' +
		'						<input type="text" ng-model="value.information" class="form-control"/>' +
		'				</div>' +
		'		</div>' +
		'</div>'
		;
		var blockNeighbourhood =
		'<div class="row">' +
		'		<div class="col-md-12">' +
		'				<div class="form-group">' +
		'						<label for="Bairro">Bairro</label>' +
		'						<input type="text" ng-model="value.neighbourhood" class="form-control"/>' +
		'				</div>' +
		'		</div>' +
		'</div>'
		;
		var blockCityStateCountry =
		'<div class="row">' +
		'		<div class="col-md-5">' +
		'				<div class="form-group">' +
		'						<label for="Localidade">Localidade</label>' +
		'						<input type="text" ng-model="value.localization" class="form-control"/>' +
		'				</div>' +
		'		</div>' +
		'		<div class="col-md-3">' +
		'				<div class="form-group">' +
		'						<label for="UF">UF</label>' +
		'						<select ng-model="value.state" class="form-control" ng-options="uf for uf in factoryData.ufs"></select>' +
		'				</div>' +
		'		</div>' +
		'		<div class="col-md-4">' +
		'				<div class="form-group">' +
		'						<label for="País">País</label>' +
		'						<select ng-model="value.country" class="form-control" ng-options="pais for pais in factoryData.availableCountries"></select>' +
		'				</div>' +
		'		</div>' +
		'</div>'
		;
		var blockMaps =
		'<div class="row">' +
		'		<div class="col-md-12">' +
		'				<button type="button" class="btn btn-default btn-block" ng-disabled="!value.localization" ng-click="openMaps(value)" target="_blank">Maps <i class="glyphicon glyphicon-globe"></i></button>' +
		'		</div>' +
		'</div>'
		;
		var templateEnd =
		'						</accordion-group>' +
		'				</accordion>' +
		'		</div>' +
		'</div>'
		;
		return {
			restrict: 'E',
			scope: {
				value: '=',
				onSearchCepStart: '&?',
				onSearchCepSuccess: '&?',
				onSearchCepError: '&?'
			},
			//template: template.join('\n'),
			link: function (scope, elm, attrs, ctrl) {
				function isEmpty(obj){
					for(var key in obj) if(obj.hasOwnProperty(key)){
						return false;
					}
					return true;
				}
				function forceAttr2Bool(attr) {
					return (attr == undefined || attr == 'true') ? true : false;
				}

				if(isEmpty(scope.value)) scope.value = GumgaAddressService.returnFormattedObject();

				attrs.cep = forceAttr2Bool(attrs.cep);
				attrs.street = forceAttr2Bool(attrs.street);
				attrs.streetNumber = forceAttr2Bool(attrs.streetNumber);
				attrs.complement = forceAttr2Bool(attrs.complement);
				attrs.neighborhood = forceAttr2Bool(attrs.neighborhood);
				attrs.cityStateCountry = forceAttr2Bool(attrs.cityStateCountry);
				attrs.maps = forceAttr2Bool(attrs.maps);

				if(!attrs.name) throw "É necessário passar um parâmetro 'name' como identificador para GumgaAddress";
				if((!attrs.street || !attrs.streetNumber) && !attrs.cityStateCountry) throw "É necessário usar ao menos um dos elementos principais [street / city-state-country] para GumgaAddress";
				if(!attrs.cep && (attrs.onSearchCepStart || attrs.onSearchCepSuccess || attrs.onSearchCepError)) throw "É necessário uso do atributo cep para uso das funções [on-search-cep-start / on-search-cep-success / on-search-cep-error]";

				var template = '';
				template = template.concat(templateBegin);

				if(attrs.cep) template = template.concat(blockCep);
				if(attrs.street) template = template.concat(blockStreet);
				if(attrs.streetNumber) template = template.concat(blockStreetNumber);
				if(attrs.complement) template = template.concat(blockComplement);
				if(attrs.neighborhood) template = template.concat(blockNeighbourhood);
				if(attrs.cityStateCountry) template = template.concat(blockCityStateCountry);
				if(attrs.maps) template = template.concat(blockMaps);

				template = template.concat(templateEnd);
				elm.append($compile(template)(scope));

				scope.title = attrs.title || 'Endereço';
				scope.id = attrs.name;
				scope['loader' + scope.id] = false;
				scope['maps' + scope.id] = false;
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
				scope.custom = function ($event, cep) {
					$event.charCode == 13? scope.searchCep(cep) : angular.noop;
				};
				scope.openMaps = function(value) {
					if (!value.number) {
						value.number = '';
					}
					var maps = 'https://www.google.com.br/maps/place/' + value.premisseType + ' ' + value.premisse + ',' + value.number + ',' + value.localization;
					window.open(maps);
				};
				scope.returnLink = function (value) {
					if (!value.number) {
						value.number = '';
					}
					return 'https://www.google.com.br/maps/place/' + value.premisseType + ' ' + value.premisse + ',' + value.number + ',' + value.localization;
				};
				scope.searchCep = function (cep) {
					scope['loader' + scope.id] = true;
					eventHandler.searchCepStart();
					$http.get('http://www.gumga.com.br/services-api/public/cep/'+cep)
					.success(function (values) {
						eventHandler.searchCepSuccess({$value: values});
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
						eventHandler.searchCepError({$value: data});
					})
				};
				if (scope.value.zipCode) {
					scope.searchCep(scope.value.zipCode);
				}

			}
		};
	}
	angular.module('gumga.directives.address', ['gumga.services.address'])
	.directive('gumgaAddress',AddressDirective);
})();
