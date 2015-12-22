describe('PROVIDER: GumgaTranslate', function() {
	var Provider
	,		$httpBackend;
	beforeEach(module('gumga.services.translate'));
	angular.module('myApp',[]);

	beforeEach(function(){
		inject(function($gumgaTranslate,_$httpBackend_){
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET','/i18n/en-us.json')
			.respond({spike: 'Ambiente de Teste',id: 'Identificador',name: 'Nome',
				attributes: {server: 'Apache Server',port: '8080',machine: 'Computador do Munif'}})
			Provider = $gumgaTranslate;
		})
		angular.module('testApp',[])
		.config(function($gumgaTranslateProvider){});
		angular.module('myOtherApp','testApp');
	})
	it('Should get the right language on the variable',function(){
		$httpBackend.expectGET('/i18n/')
		Provider.setLanguage('pt-br');
		expect(Provider._language).toEqual('pt-br');

	})
});