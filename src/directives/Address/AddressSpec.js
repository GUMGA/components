describe('DIRECTIVE: Address',function(){
	var scope
	,		isolatedScope
	,		requestAddress
	,		$httpBackend;

	beforeEach(module('gumga.directives.address'));

	beforeEach(inject(
		function($rootScope,$compile,_$httpBackend_){
			scope = $rootScope.$new();
			scope.addressObject = {};
			$httpBackend = _$httpBackend_;
			requestAddress = 
				$httpBackend.when('GET','http://www.gumga.com.br/services-api/public/cep/87030200')
					.respond({
						"resultado": "1",
						"resultado_txt": "sucesso - cep completo",
						"uf": "PR",
						"cidade": "Maringá",
						"bairro": "Zona 07",
						"tipo_logradouro": "Rua",
						"logradouro": "São João"
					})

				var element = angular.element(
					'<gumga-address value="addressObject" title="Endereço Residencial" name="address"></gumga-address>'
				);
				$compile(element)(scope);
				isolatedScope = element.isolateScope();
		}	
	))

	it('Should get all needed variables',function(){
		expect(isolatedScope.title).toEqual('Endereço Residencial');
		expect(isolatedScope.loaderadress).toBeFalsy();
		expect(isolatedScope.id).toEqual('address')
		expect(isolatedScope.value).toEqual({	zipCode : null, premisseType: null,premisse: null,number: null,information: null,
																					neighbourhood: null,localization: null,state: null,country: null});
	})

	it('Should call searchCep when someone hits enter in input',function(){
		spyOn(isolatedScope,'searchCep');
		isolatedScope.custom({charCode: 13},'87030200');
		expect(isolatedScope.searchCep).toHaveBeenCalledWith('87030200');
	})

	it('Should make an http Request when calling searchCep',function(){
		$httpBackend.expectGET('http://www.gumga.com.br/services-api/public/cep/87030200');
		isolatedScope.value.zipCode = '87030200';
		isolatedScope.searchCep(isolatedScope.value.zipCode);
		expect(isolatedScope.loaderaddress).toBeTruthy();
		$httpBackend.flush();
		expect(isolatedScope.loaderaddress).toBeFalsy();
		expect(isolatedScope.value)
			.toEqual({zipCode: '87030200',premisseType: 'Rua',premisse:'São João',localization: 'Maringá',
								neighbourhood: 'Zona 07',state: 'PR',country: 'Brasil',number: '',information: null})
	})

	it('Should return the right google maps Address',function(){
		var x = isolatedScope.returnLink({premisseType: 'Rua',premisse:'São João',localization: 'Maringá',number: '65'});
		expect(x).toEqual('https://www.google.com.br/maps/place/Rua São João,65,Maringá')
	})
})