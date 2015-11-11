describe('SERVICE: gumgaCtrl', () => {
	function Service(){};
	let gumgaCtrl,
	ListService = new Service(),
	$httpBackend,
	$scope;
	let container = new Function();
	beforeEach(module('gumga.services.gumgactrl'));

	beforeEach(inject(function(_gumgaController_,$q,_$httpBackend_,$http, $rootScope){
		gumgaCtrl = _gumgaController_;
		$httpBackend = _$httpBackend_;
		$scope = $rootScope.$new();
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

		Service.prototype.get = function(){};
		Service.prototype.getNew = function(){};
		Service.prototype.resetAndGet = function(){};
		Service.prototype.getById = function(){};
		Service.prototype.update = function(){};
		Service.prototype.save = function(){};
		Service.prototype.deleteCollection = function(){};
		Service.prototype.sort = function(){};
		Service.prototype.getSearch = function(){};
		Service.prototype.getAdvancedSearch = function(){};

		Service.prototype.saveQuery = function(){};
		Service.prototype.getQuery = function(){};
		Service.prototype.saveImage = function(){};
		Service.prototype.deleteImage = function(){};
		Service.prototype.resetQuery = function(){};
		Service.prototype.resetDefaultState = function(){};

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

	describe('_createOptions', () => {
		it('Should return the populated object if a string is passed', () => {
			let result = gumgaCtrl._createOptions('User');
			expect(result.identifier).toEqual('User');
			expect(result.noScope).toEqual(false);
		})

		it('Should return the correct object if another object is passed', () => {
			let result = gumgaCtrl._createOptions({
				identifier: 'Usuario',
			})

			expect(result.identifier).toEqual('Usuario');
			expect(result.noScope).toEqual(false);

			let anotherResult = gumgaCtrl._createOptions({
				identifier: 'User',
				noScope: true
			})

			expect(anotherResult.identifier).toEqual('User');
			expect(anotherResult.noScope).toEqual(true);

			expect(() => {
				gumgaCtrl._createOptions({
					noScope: true
				})
			}).toThrow('Você precisa passar um identificador para o objeto de configuração do createRestMethods!');
		})
	})

	describe('createRestMethods', () => {
		it('Should execute get right', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');
			let fns = {
				getStart(){},
				getSuccess(){},
				getErr(){}
			}
			spyOn(fns,'getStart');
			spyOn(fns,'getSuccess');
			spyOn(fns,'getErr');

			$scope['Identifier'].on('getSuccess', fns.getSuccess);
			$scope['Identifier'].on('getStart', fns.getStart);
			$scope['Identifier'].on('getErr', fns.getErr);

			$scope['Identifier'].methods.get();
			$httpBackend.flush();
			expect($scope['Identifier'].pageSize).toEqual(20);
			expect($scope['Identifier'].count).toEqual(200);
			expect(ListService.get).toHaveBeenCalledWith(1);
			expect(fns.getStart).toHaveBeenCalled();
			expect(fns.getSuccess).toHaveBeenCalled();
			expect(fns.getErr).not.toHaveBeenCalled();

		})

		it('Should execute getId right', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				getIdStart(){},
				getIdSuccess(){},
				getIdErr(){}
			}

			spyOn(fns,'getIdStart');
			spyOn(fns,'getIdSuccess');
			spyOn(fns,'getIdErr');

			$scope['Identifier'].on('getIdStart', fns.getIdStart);
			$scope['Identifier'].on('getIdSuccess', fns.getIdSuccess);
			$scope['Identifier'].on('getIdErr', fns.getIdErr);

			$scope['Identifier'].methods.getId();
			$httpBackend.flush();

			expect(ListService.getById).toHaveBeenCalledWith(0);
			expect(fns.getIdStart).toHaveBeenCalled();
			expect(fns.getIdSuccess).toHaveBeenCalled();
			expect(fns.getIdErr).not.toHaveBeenCalled();
		})

		it('Should execute getNew right', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				getNewStart(){},
				getNewSuccess(){},
				getNewErr(){}
			}

			spyOn(fns,'getNewStart');
			spyOn(fns,'getNewSuccess');
			spyOn(fns,'getNewErr');

			$scope['Identifier'].on('getNewStart', fns.getNewStart);
			$scope['Identifier'].on('getNewSuccess', fns.getNewSuccess);
			$scope['Identifier'].on('getNewErr', fns.getNewErr);

			$scope['Identifier'].methods.getNew();
			$httpBackend.flush();

			expect(ListService.getNew).toHaveBeenCalled();
			expect(fns.getNewStart).toHaveBeenCalled();
			expect(fns.getNewSuccess).toHaveBeenCalled();
			expect(fns.getNewErr).not.toHaveBeenCalled();
		})

		it('Should execute put right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				putStart(){},
				putSuccess(){},
				putErr(){}
			}

			spyOn(fns,'putStart');
			spyOn(fns,'putSuccess');
			spyOn(fns,'putErr');

			$scope['Identifier'].on('putStart', fns.putStart);
			$scope['Identifier'].on('putSuccess', fns.putSuccess);
			$scope['Identifier'].on('putErr', fns.putErr);

			$scope['Identifier'].methods.put({id:1,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			$httpBackend.flush();

			expect(ListService.update).toHaveBeenCalledWith({id:1,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			expect(fns.putStart).toHaveBeenCalled();
			expect(fns.putSuccess).toHaveBeenCalled();
			expect(fns.putErr).not.toHaveBeenCalled();
		})
		it('Should execute post right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				postStart(){},
				postSuccess(){},
				postErr(){}
			}

			spyOn(fns,'postStart');
			spyOn(fns,'postSuccess');
			spyOn(fns,'postErr');

			$scope['Identifier'].on('postStart', fns.postStart);
			$scope['Identifier'].on('postSuccess', fns.postSuccess);
			$scope['Identifier'].on('postErr', fns.postErr);

			$scope['Identifier'].methods.post({id:null,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			$httpBackend.flush();

			expect(ListService.save).toHaveBeenCalledWith({id:null,oi:null,nome:'Mateus Miranda de almeida',email:{value:'info.mateusmiranda@gmail.com'}});
			expect(fns.postStart).toHaveBeenCalled();
			expect(fns.postSuccess).toHaveBeenCalled();
			expect(fns.postErr).not.toHaveBeenCalled();
		})

		it('Should execute delete right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				deleteStart(){},
				deleteSuccess(){},
				deleteErr(){}
			}

			spyOn(fns,'deleteStart');
			spyOn(fns,'deleteSuccess');
			spyOn(fns,'deleteErr');

			$scope['Identifier'].on('deleteStart', fns.deleteStart);
			$scope['Identifier'].on('deleteSuccess', fns.deleteSuccess);
			$scope['Identifier'].on('deleteErr', fns.deleteErr);

			$scope['Identifier'].methods.delete([{id:1},{id:2}]);
			$httpBackend.flush();

			expect(ListService.deleteCollection).toHaveBeenCalledWith([{id:1},{id:2}]);
			expect(fns.deleteStart).toHaveBeenCalled();
			expect(fns.deleteSuccess).toHaveBeenCalled();
			expect(fns.deleteErr).not.toHaveBeenCalled();
		})

		it('Should execute sort right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				sortStart(){},
				sortSuccess(){},
				sortErr(){}
			}

			spyOn(fns,'sortStart');
			spyOn(fns,'sortSuccess');
			spyOn(fns,'sortErr');

			$scope['Identifier'].on('sortStart', fns.sortStart);
			$scope['Identifier'].on('sortSuccess', fns.sortSuccess);
			$scope['Identifier'].on('sortErr', fns.sortErr);

			$scope['Identifier'].methods.sort('name','asc');
			$httpBackend.flush();

			expect(ListService.sort).toHaveBeenCalledWith('name','asc');
			expect($scope['Identifier'].pageSize).toEqual(10);
			expect($scope['Identifier'].count).toEqual(0);
			expect(fns.sortStart).toHaveBeenCalled();
			expect(fns.sortSuccess).toHaveBeenCalled();
			expect(fns.sortErr).not.toHaveBeenCalled();
		})

		it('Should execute search right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				searchStart(){},
				searchSuccess(){},
				searchErr(){}
			}

			spyOn(fns,'searchStart');
			spyOn(fns,'searchSuccess');
			spyOn(fns,'searchErr');

			$scope['Identifier'].on('searchStart', fns.searchStart);
			$scope['Identifier'].on('searchSuccess', fns.searchSuccess);
			$scope['Identifier'].on('searchErr', fns.searchErr);
			$scope['Identifier'].methods.search('name','juca');

			$httpBackend.flush();

			expect(ListService.getSearch).toHaveBeenCalledWith('name','juca');
			expect($scope['Identifier'].pageSize).toEqual(10);
			expect($scope['Identifier'].count).toEqual(0);
			expect(fns.searchStart).toHaveBeenCalled();
			expect(fns.searchSuccess).toHaveBeenCalled();
			expect(fns.searchErr).not.toHaveBeenCalled();
		})

		it('Should execute advancedSearch right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				advancedSearchStart(){},
				advancedSearchSuccess(){},
				advancedSearchErr(){}
			}

			spyOn(fns,'advancedSearchStart');
			spyOn(fns,'advancedSearchSuccess');
			spyOn(fns,'advancedSearchErr');

			$scope['Identifier'].on('advancedSearchStart', fns.advancedSearchStart);
			$scope['Identifier'].on('advancedSearchSuccess', fns.advancedSearchSuccess);
			$scope['Identifier'].on('advancedSearchErr', fns.advancedSearchErr);

			$scope['Identifier'].methods.advancedSearch('name like juca');
			$httpBackend.flush();

			expect(ListService.getAdvancedSearch).toHaveBeenCalledWith('name like juca');
			expect($scope['Identifier'].pageSize).toEqual(10);
			expect($scope['Identifier'].count).toEqual(0);
			expect(fns.advancedSearchStart).toHaveBeenCalled();
			expect(fns.advancedSearchSuccess).toHaveBeenCalled();
			expect(fns.advancedSearchErr).not.toHaveBeenCalled();
		})

		it('Should execute postQuery right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				postQueryStart(){},
				postQuerySuccess(){},
				postQueryErr(){}
			}

			spyOn(fns,'postQueryStart');
			spyOn(fns,'postQuerySuccess');
			spyOn(fns,'postQueryErr');

			$scope['Identifier'].on('postQueryStart', fns.postQueryStart);
			$scope['Identifier'].on('postQuerySuccess', fns.postQuerySuccess);
			$scope['Identifier'].on('postQueryErr', fns.postQueryErr);

			$scope['Identifier'].methods.postQuery('query','name');
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

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				getQueryStart(){}
			}
			spyOn(fns,'getQueryStart');
			$scope['Identifier'].on('getQueryStart', fns.getQueryStart);
			$scope['Identifier'].methods.getQuery('/page');
			$httpBackend.flush();
			expect(fns.getQueryStart).toHaveBeenCalled();
		})

		it('Should execute asyncSearch right', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				asyncSearchStart(){}
			}
			spyOn(fns,'asyncSearchStart');
			$scope['Identifier'].on('asyncSearchStart', fns.asyncSearchStart);
			$scope['Identifier'].methods.asyncSearch('pim','ba');
			$httpBackend.flush();
			expect(fns.asyncSearchStart).toHaveBeenCalled();
		})

		it('Should execute asyncPost right', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				asyncPostStart(){}
			}
			spyOn(fns,'asyncPostStart');
			$scope['Identifier'].on('asyncPostStart', fns.asyncPostStart);
			$scope['Identifier'].methods.asyncPost('pim','ba');
			$httpBackend.flush();
			expect(fns.asyncPostStart).toHaveBeenCalled();
		})

		it('Should execute postImage right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				postImageStart(){}
			}
			spyOn(fns,'postImageStart');
			$scope['Identifier'].on('postImageStart', fns.postImageStart);
			$scope['Identifier'].methods.postImage('/page');
			$httpBackend.flush();
			expect(fns.postImageStart).toHaveBeenCalled();
		})

		it('Should execute deleteImage right', () => {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				deleteImageStart(){},
				deleteImageSuccess(){},
				deleteImageErr(){}
			}

			spyOn(fns,'deleteImageStart');
			spyOn(fns,'deleteImageSuccess');
			spyOn(fns,'deleteImageErr');

			$scope['Identifier'].on('deleteImageStart', fns.deleteImageStart);
			$scope['Identifier'].on('deleteImageSuccess', fns.deleteImageSuccess);
			$scope['Identifier'].on('deleteImageErr', fns.deleteImageErr);

			$scope['Identifier'].methods.deleteImage('query','name');
			$httpBackend.flush();

			expect(ListService.deleteImage).toHaveBeenCalledWith('query','name');
			expect(fns.deleteImageStart).toHaveBeenCalled();
			expect(fns.deleteImageSuccess).toHaveBeenCalled();
			expect(fns.deleteImageErr).not.toHaveBeenCalled();
		})

		it('Should call Service.resetDefaultState when i call reset', ()=> {

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let fns = {
				resetStart(){}
			}

			spyOn(fns,'resetStart');

			$scope['Identifier'].on('resetStart', fns.resetStart);

			$scope['Identifier'].methods.reset();

			expect(ListService.resetDefaultState).toHaveBeenCalled();
			expect(fns.resetStart).toHaveBeenCalled();

		})
	})

	describe(`When i use 'and'`, () => {
		it('Should chain functions', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			expect(() => {
				$scope['Identifier']
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

			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			let methods = $scope['Identifier'].methods;
			spyOn(methods, 'get');
			spyOn(methods, 'post')
			$scope['Identifier'].execute('get',2);
			$scope['Identifier'].execute('post',{
				name: 'José'
			});
			expect(methods.get).toHaveBeenCalledWith(2);
			expect(methods.post).toHaveBeenCalledWith({
				name: 'José'
			});
		})
		it('Should throw an error when the entry is wrong', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');

			const err = 'O primeiro parâmetro deve ser uma string!';
			expect(()=> {
				$scope['Identifier'].execute({},2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute('get',2);
			}).not.toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute(function(){},2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute([],2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute(190,2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute(undefined,2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute(true,2);
			}).toThrow(err);
		})

		it('Should throw an error when the function passed doesn\'t exist', () => {
			gumgaCtrl.createRestMethods($scope,ListService,'Identifier');
			const err = 'O nome do método está errado! Por favor coloque um método que está no GumgaController';
			expect(()=> {
				$scope['Identifier'].execute('foo',2);
			}).toThrow(err);
			expect(()=> {
				$scope['Identifier'].execute('get',2);
				$scope['Identifier'].execute('getId',2);
				$scope['Identifier'].execute('getNew',2);
				$scope['Identifier'].execute('put',2);
				$scope['Identifier'].execute('post',2);
				$scope['Identifier'].execute('delete',2);
				$scope['Identifier'].execute('sort',2);
				$scope['Identifier'].execute('search',2);
				$scope['Identifier'].execute('advancedSearch',2);
				$scope['Identifier'].execute('postQuery',2);
				$scope['Identifier'].execute('getQuery',2);
				$scope['Identifier'].execute('postImage',2);
				$scope['Identifier'].execute('deleteImage',2);
				$scope['Identifier'].execute('reset',2);
			}).not.toThrow(err);
		})
	})
});
