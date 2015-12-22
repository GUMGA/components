// describe('DIRECTIVE: GumgaTranslateTag', function() {
// 	var scope
// 	,	template
// 	,	element
// 	,	$compile
// 	,	TranslateHelper;
// 	beforeEach(module('gumga.directives.translatetag'));


// 	beforeEach(inject(function(_$compile_,$rootScope,GumgaTranslateHelper,$gumgaTranslate,$httpBackend){
// 		scope = $rootScope.$new();
// 		$compile = _$compile_;
// 		TranslateHelper = GumgaTranslateHelper;
// 		$httpBackend.when('GET','/i18n/pt-br.json')
// 		.respond({
// 			fields: {
// 				spike: 'Ambiente de Teste',
// 				id: 'Identificador',
// 				name: 'Nome',
// 				attributes: {
// 					server: 'Apache Server',
// 					port: '8080',
// 					machine: {
// 						name:'Computador do Munif',
// 						processor: 'i7'

// 					}
// 				}
// 			},
// 			identifier: 'Juca'
// 		})
// 		$gumgaTranslate.setLanguage('pt-br');
// 		$httpBackend.flush();
// 	}))

// 	describe('Possibilities',function(){
// 		function mount (argument,innerTag) {
// 			if(!innerTag) innerTag = '';
// 			element = angular.element('<label gumga-translate-tag="'+ argument + '">' + innerTag +'</label>');
// 			template = ($compile(element)(scope)).html();
// 			scope.$digest();
// 		}

// 		it('Should get \'Ambiente de Teste\' on the template',function(){
// 			mount('fields.spike');
// 			expect(template).toEqual('Ambiente de Teste');
// 		})

// 		it('Should get fields.spikes on the template',function(){
// 			mount('fields.spikes');
// 			expect(template).toEqual('fields.spikes')
// 		})

// 		it('Should keep the inner tags and add the translate',function(){
// 			mount('fields.attributes.machine.processor','<div>Sim</div>');
// 			expect(template).toEqual('i7<div class="ng-scope">Sim</div>')
// 		})
// 	})
// });