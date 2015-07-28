(function(){
	'use strict';
	AddressService.$inject = [];
	function AddressService(){
		return {
			everyUf: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
			'RJ', 'RN', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
			everyLogradouro: [	'Outros', 'Aeroporto', 'Alameda', 'Área', 'Avenida', 'Campo', 'Chácara', 'Colônia', 'Condomínio', 'Conjunto', 'Distrito',
			'Esplanada', 'Estação', 'Estrada', 'Favela', 'Fazenda', 'Feira', 'Jardim', 'Ladeira', 'Largo', 'Lago', 'Lagoa', 'Loteamento',
			'Núcleo', 'Parque', 'Passarela', 'Pátio', 'Praça', 'Quadra', 'Recanto', 'Residencial', 'Rodovia', 'Rua', 'Setor', 'Sítio',
			'Travessa', 'Trevo', 'Trecho', 'Vale', 'Vereda', 'Via', 'Viaduto', 'Viela', 'Via'],
			availableCountries: ['Brasil'],
			returnFormattedObject: function(){
				return {
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
			}
		}
	}

		angular.module('gumga.services.address',[])
		.factory('GumgaAddressService',AddressService);

	})();
