describe('SERVICE: GumgaTranslateHelper', function() {
	var TranslateHelper;	
	var store = {};
	store.GUMGACurrent = 'pt-br';
	store['GUMGApt-br'] = JSON.stringify({
		fields: {
			spike: 'Ambiente de Teste',
			id: 'Identificador',
			name: 'Nome',
			attributes: {
				server: 'Apache Server',
				port: '8080',
				machine: {
					name:'Computador do Munif',
					processor: 'i7'

				}
			}
		},
		identifier: 'Juca'
	});
	beforeEach(module('gumga.services.translate.helper'));

	beforeEach(inject(function(GumgaTranslateHelper) {
		TranslateHelper = GumgaTranslateHelper;
		spyOn(localStorage,'getItem').and.callFake(function(key){
			return store[key];
		})
		spyOn(localStorage,'setItem').and.callFake(function(key,item){
			store[key] = item;
			return true;
		})

	}));

	describe('FUNCTION __getFromLocalStorage', function() {
		it('Should set the right values on the _translation variable',function(){
			TranslateHelper.__getFromLocalStorage();
			expect(TranslateHelper._translation).not.toBe(undefined);
			expect(TranslateHelper._translation['fields.spike']).toEqual('Ambiente de Teste');
			expect(TranslateHelper._translation['fields.id']).toEqual('Identificador');
			expect(TranslateHelper._translation['fields.name']).toEqual('Nome');
			expect(TranslateHelper._translation['fields.attributes.server']).toEqual('Apache Server');
			expect(TranslateHelper._translation['fields.attributes.port']).toEqual('8080');
			expect(TranslateHelper._translation['fields.attributes.machine.name']).toEqual('Computador do Munif');
			expect(TranslateHelper._translation['fields.attributes.machine.processor']).toEqual('i7');
		})
	});
	describe('FUNCTION getTranslate', function() {
		it('Should throw an error if an invalid value is passed',function(){
			expect(function(){
				TranslateHelper.getTranslate('');
			}).toThrow('The value passed to GumgaTranslate is Wrong!')
		})

		it('Should throw an error if the parameter is not a string',function(){		
			expect(function(){
				TranslateHelper.getTranslate(function(){});
			}).toThrow('The value passed to GumgaTranslate is Wrong!');
		})

		it('Should return the parameter if the value is not on the object _translation',function(){
			expect(TranslateHelper.getTranslate('fields.machine')).toBe('fields.machine');
		})

		it('Should returna string to Translate if it matches',function(){
			expect(TranslateHelper.getTranslate('fields.attributes.server')).toEqual('Apache Server');
			expect(TranslateHelper.getTranslate('identifier')).toEqual('Juca');
			expect(TranslateHelper.getTranslate('fields.attributes.machine.name')).toEqual('Computador do Munif');
		})


	});

});