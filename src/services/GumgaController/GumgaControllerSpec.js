describe('SERVICE: gumgaCtrl', () => {
	let gumgaCtrl,
	ListService = {},
	$httpBackend;

	beforeEach(module('gumga.services.gumgactrl'));

	beforeEach(inject(function(_gumgaCtrl_,$q,_$httpBackend_,$http){
		gumgaCtrl = _gumgaCtrl_;
		$httpBackend = _$httpBackend_;

		$httpBackend
		.when('GET', 'http://pokeapi.co/api/v1/pokemon/1')
		.respond({"pageSize":20,"count":200,"start":0,"values":[]});

		$httpBackend
		.when('GET', '/1')
		.respond({"id":1,"oi":null,"nome":"Mateus Miranda de almeida","email":{"value":"info.mateusmiranda@gmail.com"}});

		$httpBackend
		.when('GET', '/new')
		.respond({"id":null,"oi":null,"nome":null,"email":null,"telefone":null,"endereco":null,"ativo":null,"cnpj":null,"url":null});

		$httpBackend
		.when('POST', '/save')
		.respond({"code":null,"message":"BoardCardTemplate saved successfully","details":null,"data":{"id":2,"oi":null,"name":"ds","description":"desds","template":"<div>Jesus</div>"}});

		$httpBackend
		.when('PUT', '/update')
		.respond({"code":null,"message":"BoardCardTemplate saved successfully","details":null,"data":{"id":2,"oi":null,"name":"ds","description":"desds","template":"<div>Jesus</div>"}});

		$httpBackend
		.when('DELETE', '/del')
		.respond({"code":null,"message":"BoardCardTemplate deleted successfully","details":null,"data":null});

		$httpBackend
		.when('GET', '/sort')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('GET', '/search')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('GET', '/advancedsearch')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('POST', '/query')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('GET', '/query')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('POST', '/image')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		$httpBackend
		.when('DELETE', '/image')
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		ListService.get = function(){};
		ListService.getNew = function(){};
		ListService.resetAndGet = function(){};
		ListService.getById = function(){};
		ListService.update = function(){};
		ListService.save = function(){};
		ListService.deleteCollection = function(){};
		ListService.sort = function(){};
		ListService.getSearch = function(){};
		ListService.getAdvancedSearch = function(){};

		ListService.saveQuery = function(){};
		ListService.getQuery = function(){};
		ListService.saveImage = function(){};
		ListService.deleteImage = function(){};
		ListService.resetQuery = function(){};
		ListService.resetDefaultState = function(){};

		spyOn(ListService,'get').and.returnValue($http.get('http://pokeapi.co/api/v1/pokemon/1'));
		spyOn(ListService,'getNew').and.returnValue($http.get('/new'));
		spyOn(ListService,'getById').and.returnValue($http.get('/1'));
		spyOn(ListService,'update').and.returnValue($http.put('/update'));
		spyOn(ListService,'save').and.returnValue($http.post('/save'));
		spyOn(ListService,'deleteCollection').and.returnValue($http.delete('/del'));
		spyOn(ListService,'sort').and.returnValue($http.get('/sort'));
		spyOn(ListService,'getSearch').and.returnValue($http.get('/search'));
		spyOn(ListService,'getAdvancedSearch').and.returnValue($http.get('/advancedsearch'));
		spyOn(ListService,'resetQuery').and.returnValue();
		spyOn(ListService,'getQuery').and.returnValue($http.get('/query'));
		spyOn(ListService,'saveQuery').and.returnValue($http.post('/query'));
		spyOn(ListService,'saveImage').and.returnValue($http.post('/image'));
		spyOn(ListService,'deleteImage').and.returnValue($http.delete('/image'));
		spyOn(ListService,'resetDefaultState');

	}))

	describe('createOptions', () => {
		it('Should return the populated object if a string is passed', () => {
			let result = gumgaCtrl.createOptions('User');
			expect(result.identifier).toEqual('User');
			expect(result.noScope).toEqual(false);
		})

		it('Should return the correct object if another object is passed', () => {
			let result = gumgaCtrl.createOptions({
				identifier: 'Usuario',
			})
			expect(result.identifier).toEqual('Usuario');
			expect(result.noScope).toEqual(false);

			let anotherResult = gumgaCtrl.createOptions({
				identifier: 'User',
				noScope: true
			})

			expect(anotherResult.identifier).toEqual('User');
			expect(anotherResult.noScope).toEqual(true);

			expect(() => {
				gumgaCtrl.createOptions({
					noScope: true
				})
			}).toThrow('Você precisa passar um identificador para o objeto de configuração do createRestMethods!');
		})
	})

	describe('createRestMethods', () => {
		it('Should throw an error when the values passed to the first parameters are wrong', () => {
			const err = 'É necessário passar um objeto no primeiro parâmetro';
			expect(()=> {
				gumgaCtrl.createRestMethods({},{},'Identifier');
			}).not.toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods('$scope',{},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods(function(){},{},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods([],{},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods(2,{},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods(undefined,{},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods(true,{},'Identifier');
			}).toThrow(err);
		})
		it('Should throw an error when the values passed to the second parameters are wrong', () => {
			const err = 'É necessário passar um objeto no segundo parâmetro';
			expect(()=> {
				gumgaCtrl.createRestMethods({},{},'Identifier');
			}).not.toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},'$scope','Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},function(){},'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},[],'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},2,'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},undefined,'Identifier');
			}).toThrow(err);
			expect(()=> {
				gumgaCtrl.createRestMethods({},true,'Identifier');
			}).toThrow(err);
		})

		it('Should execute get right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');
			let fns = {
				getStart(){},
				getSuccess(){},
				getErr(){}
			}
			spyOn(fns,'getStart');
			spyOn(fns,'getSuccess');
			spyOn(fns,'getErr');

			container['Identifier'].on('getSuccess', fns.getSuccess);
			container['Identifier'].on('getStart', fns.getStart);
			container['Identifier'].on('getErr', fns.getErr);

			container['Identifier'].methods.get();
			$httpBackend.flush();
			expect(container['Identifier'].pageSize).toEqual(20);
			expect(container['Identifier'].count).toEqual(200);
			expect(ListService.get).toHaveBeenCalledWith(1);
			expect(fns.getStart).toHaveBeenCalled();
			expect(fns.getSuccess).toHaveBeenCalled();
			expect(fns.getErr).not.toHaveBeenCalled();

		})

		it('Should execute getId right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				getIdStart(){},
				getIdSuccess(){},
				getIdErr(){}
			}

			spyOn(fns,'getIdStart');
			spyOn(fns,'getIdSuccess');
			spyOn(fns,'getIdErr');

			container['Identifier'].on('getIdStart', fns.getIdStart);
			container['Identifier'].on('getIdSuccess', fns.getIdSuccess);
			container['Identifier'].on('getIdErr', fns.getIdErr);

			container['Identifier'].methods.getId();
			$httpBackend.flush();

			expect(ListService.getById).toHaveBeenCalledWith(0);
			expect(fns.getIdStart).toHaveBeenCalled();
			expect(fns.getIdSuccess).toHaveBeenCalled();
			expect(fns.getIdErr).not.toHaveBeenCalled();
		})

		it('Should execute getNew right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				getNewStart(){},
				getNewSuccess(){},
				getNewErr(){}
			}

			spyOn(fns,'getNewStart');
			spyOn(fns,'getNewSuccess');
			spyOn(fns,'getNewErr');

			container['Identifier'].on('getNewStart', fns.getNewStart);
			container['Identifier'].on('getNewSuccess', fns.getNewSuccess);
			container['Identifier'].on('getNewErr', fns.getNewErr);

			container['Identifier'].methods.getNew();
			$httpBackend.flush();

			expect(ListService.getNew).toHaveBeenCalled();
			expect(fns.getNewStart).toHaveBeenCalled();
			expect(fns.getNewSuccess).toHaveBeenCalled();
			expect(fns.getNewErr).not.toHaveBeenCalled();
		})

		it('Should execute put right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				putStart(){},
				putSuccess(){},
				putErr(){}
			}

			spyOn(fns,'putStart');
			spyOn(fns,'putSuccess');
			spyOn(fns,'putErr');

			container['Identifier'].on('putStart', fns.putStart);
			container['Identifier'].on('putSuccess', fns.putSuccess);
			container['Identifier'].on('putErr', fns.putErr);

			container['Identifier'].methods.put({id:1,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			$httpBackend.flush();

			expect(ListService.update).toHaveBeenCalledWith({id:1,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			expect(fns.putStart).toHaveBeenCalled();
			expect(fns.putSuccess).toHaveBeenCalled();
			expect(fns.putErr).not.toHaveBeenCalled();
		})
		it('Should execute post right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				postStart(){},
				postSuccess(){},
				postErr(){}
			}

			spyOn(fns,'postStart');
			spyOn(fns,'postSuccess');
			spyOn(fns,'postErr');

			container['Identifier'].on('postStart', fns.postStart);
			container['Identifier'].on('postSuccess', fns.postSuccess);
			container['Identifier'].on('postErr', fns.postErr);

			container['Identifier'].methods.post({id:null,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			$httpBackend.flush();

			expect(ListService.save).toHaveBeenCalledWith({id:null,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			expect(fns.postStart).toHaveBeenCalled();
			expect(fns.postSuccess).toHaveBeenCalled();
			expect(fns.postErr).not.toHaveBeenCalled();
		})

		it('Should execute delete right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				deleteStart(){},
				deleteSuccess(){},
				deleteErr(){}
			}

			spyOn(fns,'deleteStart');
			spyOn(fns,'deleteSuccess');
			spyOn(fns,'deleteErr');

			container['Identifier'].on('deleteStart', fns.deleteStart);
			container['Identifier'].on('deleteSuccess', fns.deleteSuccess);
			container['Identifier'].on('deleteErr', fns.deleteErr);

			container['Identifier'].methods.delete([{id:1},{id:2}]);
			$httpBackend.flush();

			expect(ListService.deleteCollection).toHaveBeenCalledWith([{id:1},{id:2}]);
			expect(fns.deleteStart).toHaveBeenCalled();
			expect(fns.deleteSuccess).toHaveBeenCalled();
			expect(fns.deleteErr).not.toHaveBeenCalled();
		})

		it('Should execute sort right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				sortStart(){},
				sortSuccess(){},
				sortErr(){}
			}

			spyOn(fns,'sortStart');
			spyOn(fns,'sortSuccess');
			spyOn(fns,'sortErr');

			container['Identifier'].on('sortStart', fns.sortStart);
			container['Identifier'].on('sortSuccess', fns.sortSuccess);
			container['Identifier'].on('sortErr', fns.sortErr);

			container['Identifier'].methods.sort('name','asc');
			$httpBackend.flush();

			expect(ListService.sort).toHaveBeenCalledWith('name','asc');
			expect(container['Identifier'].pageSize).toEqual(10);
			expect(container['Identifier'].count).toEqual(0);
			expect(fns.sortStart).toHaveBeenCalled();
			expect(fns.sortSuccess).toHaveBeenCalled();
			expect(fns.sortErr).not.toHaveBeenCalled();
		})

		it('Should execute search right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				searchStart(){},
				searchSuccess(){},
				searchErr(){}
			}

			spyOn(fns,'searchStart');
			spyOn(fns,'searchSuccess');
			spyOn(fns,'searchErr');

			container['Identifier'].on('searchStart', fns.searchStart);
			container['Identifier'].on('searchSuccess', fns.searchSuccess);
			container['Identifier'].on('searchErr', fns.searchErr);
			container['Identifier'].methods.search('name','juca');

			$httpBackend.flush();

			expect(ListService.getSearch).toHaveBeenCalledWith('name','juca');
			expect(container['Identifier'].pageSize).toEqual(10);
			expect(container['Identifier'].count).toEqual(0);
			expect(fns.searchStart).toHaveBeenCalled();
			expect(fns.searchSuccess).toHaveBeenCalled();
			expect(fns.searchErr).not.toHaveBeenCalled();
		})

		it('Should execute advancedSearch right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				advancedSearchStart(){},
				advancedSearchSuccess(){},
				advancedSearchErr(){}
			}

			spyOn(fns,'advancedSearchStart');
			spyOn(fns,'advancedSearchSuccess');
			spyOn(fns,'advancedSearchErr');

			container['Identifier'].on('advancedSearchStart', fns.advancedSearchStart);
			container['Identifier'].on('advancedSearchSuccess', fns.advancedSearchSuccess);
			container['Identifier'].on('advancedSearchErr', fns.advancedSearchErr);

			container['Identifier'].methods.advancedSearch('name like juca');
			$httpBackend.flush();

			expect(ListService.getAdvancedSearch).toHaveBeenCalledWith('name like juca');
			expect(container['Identifier'].pageSize).toEqual(10);
			expect(container['Identifier'].count).toEqual(0);
			expect(fns.advancedSearchStart).toHaveBeenCalled();
			expect(fns.advancedSearchSuccess).toHaveBeenCalled();
			expect(fns.advancedSearchErr).not.toHaveBeenCalled();
		})

		it('Should execute postQuery right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				postQueryStart(){},
				postQuerySuccess(){},
				postQueryErr(){}
			}

			spyOn(fns,'postQueryStart');
			spyOn(fns,'postQuerySuccess');
			spyOn(fns,'postQueryErr');

			container['Identifier'].on('postQueryStart', fns.postQueryStart);
			container['Identifier'].on('postQuerySuccess', fns.postQuerySuccess);
			container['Identifier'].on('postQueryErr', fns.postQueryErr);

			container['Identifier'].methods.postQuery('query','name');
			$httpBackend.flush();

			expect(ListService.saveQuery).toHaveBeenCalledWith({
				query: 'query',
				name: 'name'
			});
			expect(fns.postQueryStart).toHaveBeenCalled();
			expect(fns.postQuerySuccess).toHaveBeenCalled();
			expect(fns.postQueryErr).not.toHaveBeenCalled();
		})

		it('Should execute getQuery right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				getQueryStart(){}
			}
			spyOn(fns,'getQueryStart');
			container['Identifier'].on('getQueryStart', fns.getQueryStart);
			container['Identifier'].methods.getQuery('/page');
			$httpBackend.flush();
			expect(fns.getQueryStart).toHaveBeenCalled();
		})

		it('Should execute postImage right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				postImageStart(){}
			}
			spyOn(fns,'postImageStart');
			container['Identifier'].on('postImageStart', fns.postImageStart);
			container['Identifier'].methods.postImage('/page');
			$httpBackend.flush();
			expect(fns.postImageStart).toHaveBeenCalled();
		})

		it('Should execute deleteImage right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				deleteImageStart(){},
				deleteImageSuccess(){},
				deleteImageErr(){}
			}

			spyOn(fns,'deleteImageStart');
			spyOn(fns,'deleteImageSuccess');
			spyOn(fns,'deleteImageErr');

			container['Identifier'].on('deleteImageStart', fns.deleteImageStart);
			container['Identifier'].on('deleteImageSuccess', fns.deleteImageSuccess);
			container['Identifier'].on('deleteImageErr', fns.deleteImageErr);

			container['Identifier'].methods.deleteImage('query','name');
			$httpBackend.flush();

			expect(ListService.deleteImage).toHaveBeenCalledWith('query','name');
			expect(fns.deleteImageStart).toHaveBeenCalled();
			expect(fns.deleteImageSuccess).toHaveBeenCalled();
			expect(fns.deleteImageErr).not.toHaveBeenCalled();
		})

		it('Should call Service.resetDefaultState when i call reset', ()=> {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let fns = {
				resetStart(){}
			}

			spyOn(fns,'resetStart');

			container['Identifier'].on('resetStart', fns.resetStart);

			container['Identifier'].methods.reset();

			expect(ListService.resetDefaultState).toHaveBeenCalled();
			expect(fns.resetStart).toHaveBeenCalled();

		})
	})

	describe(`When i use 'and'`, () => {
		it('Should chain functions', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			expect(() => {
				container['Identifier']
				.methods.get()
				.and
				.methods.post()
				.and
				.methods.sort()
				.and
				.data.filter((val) => val);
			}).not.toThrow();
		})
	})

	describe(`When i use 'execute'`, () => {
		it('Should call a function when the parameter is right', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			let methods = container['Identifier'].methods;
			spyOn(methods, 'get');
			spyOn(methods, 'post')
			container['Identifier'].execute('get',2);
			container['Identifier'].execute('post',{
				name: 'José'
			});
			expect(methods.get).toHaveBeenCalledWith(2);
			expect(methods.post).toHaveBeenCalledWith({
				name: 'José'
			});
		})
		it('Should throw an error when the entry is wrong', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');

			const err = 'O primeiro parâmetro deve ser uma string!';
			expect(()=> {
				container['Identifier'].execute({},2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute('get',2);
			}).not.toThrow(err);
			expect(()=> {
				container['Identifier'].execute(function(){},2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute([],2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute(190,2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute(undefined,2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute(true,2);
			}).toThrow(err);
		})

		it('Should throw an error when the function passed doesn\'t exist', () => {
			let container = {};
			gumgaCtrl.createRestMethods(container,ListService,'Identifier');
			const err = 'O nome do método está errado! Por favor coloque um método que está no GumgaController';
			expect(()=> {
				container['Identifier'].execute('foo',2);
			}).toThrow(err);
			expect(()=> {
				container['Identifier'].execute('get',2);
				container['Identifier'].execute('getId',2);
				container['Identifier'].execute('getNew',2);
				container['Identifier'].execute('put',2);
				container['Identifier'].execute('post',2);
				container['Identifier'].execute('delete',2);
				container['Identifier'].execute('sort',2);
				container['Identifier'].execute('search',2);
				container['Identifier'].execute('advancedSearch',2);
				container['Identifier'].execute('postQuery',2);
				container['Identifier'].execute('getQuery',2);
				container['Identifier'].execute('postImage',2);
				container['Identifier'].execute('deleteImage',2);
				container['Identifier'].execute('reset',2);
			}).not.toThrow(err);
		})
	})
});
