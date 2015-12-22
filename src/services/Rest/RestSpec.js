describe('SERVICE: GumgaRest',function(){
	var GumgaRest = {}
	,		$httpBackend
	,		$rootScope
	,		Service
	,		httpResponse = {
		pageSize: 10,count: 1,start: 0,
		values: [{"id": 1,"oi": null,"version": 0,"descricao": "Abacaxi",
		"valor": 1,"ativo": true}]
	}
	,	httpNewResponse = {
		"id": null,
		"oi": null,
		"version": 0,
		"descricao": null,
		"valor": null,
		"ativo": false
	}
	,	httpIdResponse = {
		"id": 2,
		"oi": null,
		"version": 0,
		"descricao": "Mamão",
		"valor": 10,
		"ativo": false
	}
	function getData(number){
		var names = ['João','Juca','Marcos','José','Amarildo','Wladnelson','Jefferson','Maria','Jacinto','Júlia','Carla','Maria Cláudia'];
		var surnames = ['Santana','Silva','Miranda','Souza','Santos','Pereira','Oliveira','Lima','Araújo','Ribeiro','Mendes','Barros','Pinto'];
		var professions = ['Padeiro','Açougueiro','Vendedor de coco','Carpinteiro','Professor de Tecnologia da Informação','Desempregado','Programador','Analsita de Testes', 'Analista de Aviões de Papel','Manufaturador de Aviões de Papel','Campeão do minicurso de Android','Jogador de Futebol']
		var _data = [];
		function isEven(number){ return number % 2 == 0}
		for(var i = 0; i < number;i++){
			_data.push({
				name: names[Math.floor(Math.random()*names.length)] + ' ' + surnames[Math.floor(Math.random()*surnames.length)],
				age: Math.floor(Math.random()*50),
				profession: professions[Math.floor(Math.random()*professions.length)],
				hasDog: isEven(Math.floor(Math.random()*4))
			})
		}
		return _data;
	}

	beforeEach(module('gumga.services.rest'));

	beforeEach(inject(function(_$rootScope_,_GumgaRest_,_$httpBackend_, $http){
		$rootScope = _$rootScope_;
		GumgaRest = _GumgaRest_;
		$httpBackend = _$httpBackend_;
		Service = new GumgaRest('http://www.gumga.com.br/api');

		$httpBackend.when('GET','http://www.gumga.com.br/api?pageSize=10&start=0')
		.respond(httpResponse);

		$httpBackend.when('GET','http://www.gumga.com.br/api/new')
		.respond(httpNewResponse);

		$httpBackend.when('GET','http://www.gumga.com.br/api/2')
		.respond(httpIdResponse)

		$httpBackend.when('POST','http://www.gumga.com.br/api')
		.respond('Coisa saved successfully');

		$httpBackend.when('PUT','http://www.gumga.com.br/api/2')
		.respond('Object updated successfully');

		$httpBackend.when('DELETE','http://www.gumga.com.br/api/2')
		.respond('Object deleted successfully');

		$httpBackend.when('GET','http://www.gumga.com.br/api?pageSize=10&sortDir=asc&sortField=name&start=0')
		.respond(httpResponse);

		$httpBackend.when('POST','http://www.gumga.com.br/api/attribute/')
		.respond('Image saved successfully');

		$httpBackend.when('DELETE','http://www.gumga.com.br/api/attribute')
		.respond('Image deleted successfully');

		$httpBackend.when('GET','http://www.gumga.com.br/api?pageSize=10&q=name&searchFields=Teste&start=0')
		.respond(httpResponse);

		$httpBackend.when('GET','http://www.gumga.com.br/api?aq=obj.name%3D\'teste\'&pageSize=10&start=0')
		.respond(httpResponse)

		$httpBackend.when('GET','http://www.gumga.com.br/api/teste')
		.respond(httpResponse);

		$httpBackend.when('GET','http://www.gumga.com.br/api/teste?foo=bar')
		.respond(httpResponse);

		$httpBackend.when('POST','http://www.gumga.com.br/api/foo/bar')
		.respond(httpResponse);
	}))

	it('Should execute a get',function(){
		var x = Service.get();
		$httpBackend.flush();
		$rootScope.$digest();
		expect(x.$$state.value.status).toEqual(200);
		expect(x.$$state.value.data).toEqual(httpResponse)
	})

	it('Should execute a getNew',function(){
		var aux = Service.getNew();
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpNewResponse)
	})

	it('Should execute resetAndGet',function(){
		Service._query.params = {sortField: 'teste',pageSize: 40,start: 30};
		var x = Service.resetAndGet();
		$httpBackend.flush();
		$rootScope.$digest();
		expect(Service._query.params).toEqual({start: 0,pageSize: 10})
		expect(x.$$state.value.status).toEqual(200);
		expect(x.$$state.value.data).toEqual(httpResponse);
	})

	it('Should execute a getById',function(){
		var aux = Service.getById(2);
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpIdResponse);
	})

	it('Should execute a save',function(){
		var aux = Service.save({"id": 2,"oi": null,"version": 0,"descricao": "Mamão","valor": 10,"ativo": false});
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual('Coisa saved successfully');
	})

	it('Should execute an update',function(){
		var aux = Service.update({id: 2,oi: 0.1,version: 0, descricao: 'Mamãozin',valor: 20, ativo: true})
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual('Object updated successfully');
	})

	it('Should execute a delete',function(){
		var aux = Service.delete({id: 2,oi: 0.1,version: 0, descricao: 'Mamãozin',valor: 20, ativo: true})
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual('Object deleted successfully');
	})

	it('Should execute sort',function(){
		var aux = Service.sort('name','asc');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
	})

	it('Should post an image',function(){
		var aux = Service.saveImage('attribute',new Object());
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual('Image saved successfully');
	})

	it('Should delete an image',function(){
		var aux = Service.deleteImage('attribute');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual('Image deleted successfully');
	})

	it('Should execute a search',function(){
		var aux = Service.getSearch('Teste','name');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
	})

	it('Should execute an advanced search',function(){
		var aux = Service.getAdvancedSearch('obj.name=\'teste\'');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
	})

	it('Should extend the get function',function(){
		var aux = Service.extend('get', '/teste');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
	})

	it('Should extend the post function',function(){
		var aux = Service.extend('post', '/foo/bar');
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
	})

	it('Should extend the get function with params',function(){
		var aux = Service.extend('get', '/teste', {
			params: {
				foo: 'bar'
			}
		});
		$httpBackend.flush();
		expect(aux.$$state.value.status).toEqual(200);
		expect(aux.$$state.value.data).toEqual(httpResponse);
		expect(aux.$$state.value.config.params.foo).toEqual('bar');
	})

});
