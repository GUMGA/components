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
		.respond({"pageSize":10,"count":0,"start":0,"values":[]});

		ListService.get = function(){};
		ListService.resetAndGet = function(){};
		ListService.getById = function(){};
		ListService.update = function(){};
		ListService.deleteCollection = function(){};
		ListService.sort = function(){};
		ListService.getSearch = function(){};
		ListService.getAdvancedSearch = function(){};
		ListService.resetQuery = function(){};
		spyOn(ListService,'get').and.returnValue($http.get('http://pokeapi.co/api/v1/pokemon/1'));
		spyOn(ListService,'resetAndGet').and.returnValue();
		spyOn(ListService,'getById').and.returnValue();
		spyOn(ListService,'update').and.returnValue()
		spyOn(ListService,'deleteCollection').and.returnValue();
		spyOn(ListService,'sort').and.returnValue();
		spyOn(ListService,'getSearch').and.returnValue()
		spyOn(ListService,'getAdvancedSearch').and.returnValue();
		spyOn(ListService,'resetQuery').and.returnValue();




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
			let Identifier = gumgaCtrl.createRestMethods({},ListService,'Identifier');

			let fns = {
				getStart(){},
				getSuccess(){},
				getErr(){}
			}

			spyOn(fns,'getStart');
			spyOn(fns,'getSuccess');
			spyOn(fns,'getErr');

			Identifier.on('getSuccess', fns.getSuccess);
			Identifier.on('getStart', fns.getStart);
			Identifier.on('getErr', fns.getErr);

			Identifier.methods.get();
			$httpBackend.flush();

			expect(fns.getStart).toHaveBeenCalled();
			expect(fns.getSuccess).toHaveBeenCalled();
			expect(fns.getErr).not.toHaveBeenCalled();

		})
	})

});
