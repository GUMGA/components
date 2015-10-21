describe('Gumga.core:services:Populate',function(){
	var provider
	,		$rootScope
	,		FormService = {}
	,		ListService = {}
	,		scope
	,		data = []
	,		$q
	, 	def
	,		_def
	,		_def_
	,		__def
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


	beforeEach(module('gumga.services.populate'))
	beforeEach(
		inject(function(_$rootScope_,$q,$populate){
			$rootScope = _$rootScope_;
			scope = $rootScope.$new();
			provider = $populate;
			function getData(number){
				var names = ['João','Juca','Marcos','José','Amarildo','Wladnelson','Jefferson','Maria','Jacinto','Júlia','Carla','Maria Cláudia'];
				var surnames = ['Santana','Silva','Miranda','Souza','Santos','Pereira','Oliveira','Lima','Araújo','Ribeiro','Mendes','Barros','Pinto'];
				var professions = ['Padeiro','Açougueiro','Vendedor de coco','Carpinteiro','Professor de Tecnologia da Informação','Vagabundo','Programador','Analsita de Testes', 'Analista de Aviões de Papel','Manufaturador de Aviões de Papel','Campeão do Gumga Ball','Jogador de Futebol']
				var _data = [];

				function isEven(number){ return number % 2 == 0}
				for(var i = 0; i < number;i++){
					_data.push({
						name: names[Math.floor(Math.random()*names.length)] + ' ' + surnames[Math.floor(Math.random()*surnames.length)],
						age: Math.floor(Math.random()*50),
						profession: professions[Math.floor(Math.random()*professions.length)],
						hasDog: isEven(Math.floor(Math.random()*5855184))
					})
				}
				return _data;
			}
			data = getData(20);
			def = $q.defer()
			_def = $q.defer()
			_def_ = $q.defer();
			__def = $q.defer();
			__def.resolve({name: null,age: null, profession: null, hasDog: null});
			def.resolve(data);
			_def.resolve(data[Math.floor(Math.random()*15)]);
			_def_.resolve(true);

			ListService.get = function(){};
			ListService.resetAndGet = function(){};
			ListService.getById = function(){};
			ListService.update = function(){};
			ListService.deleteCollection = function(){};
			ListService.sort = function(){};
			ListService.getSearch = function(){};
			ListService.getAdvancedSearch = function(){};
			ListService.resetQuery = function(){};
			spyOn(ListService,'get').and.returnValue(def.promise)
			spyOn(ListService,'resetAndGet').and.returnValue(def.promise);
			spyOn(ListService,'getById').and.returnValue(_def.promise);
			spyOn(ListService,'update').and.returnValue(_def_.promise)
			spyOn(ListService,'deleteCollection').and.returnValue(_def_.promise);
			spyOn(ListService,'sort').and.returnValue(def.promise);
			spyOn(ListService,'getSearch').and.returnValue(def.promise)
			spyOn(ListService,'getAdvancedSearch').and.returnValue(def.promise);
			spyOn(ListService,'resetQuery').and.returnValue(def.promise);
			/* ------------------------ */
			FormService.getNew = function(){};
			FormService.getById = function(){};
			FormService.save = function(){};
			FormService.update = function(){};
			FormService.saveImage = function(){};
			FormService.deleteImage = function(){};
			spyOn(FormService,'getNew').and.returnValue(__def.promise);
			spyOn(FormService,'getById').and.returnValue(_def.promise);
			spyOn(FormService,'save').and.returnValue(_def_.promise);
			spyOn(FormService,'update').and.returnValue(_def_.promise);
			spyOn(FormService,'saveImage').and.returnValue(_def_.promise);
			spyOn(FormService,'deleteImage').and.returnValue(_def_.promise);
			/* ------------------------ */
			spyOn(scope,'$broadcast');
		}));

	it('Should populate the scope with the form-functions',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		expect(scope.userGetNew).toBeDefined();
		expect(scope.userGetById).toBeDefined();
		expect(scope.userSave).toBeDefined();
		expect(scope.userUpdate).toBeDefined();
		expect(scope.userSaveImage).toBeDefined();
		expect(scope.userDeleteImage).toBeDefined();
	})

	it('Should populate the scope with the list functions',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		expect(scope.userGet).toBeDefined();
		expect(scope.userResetAndGet).toBeDefined();
		expect(scope.userGetById).toBeDefined();
		expect(scope.userUpdate).toBeDefined();
		expect(scope.userDelete).toBeDefined();
		expect(scope.userSort).toBeDefined();
		expect(scope.userSearch).toBeDefined();
		expect(scope.userAdvancedSearch).toBeDefined();
		expect(scope.userResetQuery).toBeDefined();
	})

	//  ListService
	it('Should get the list inside the content when i call get',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userGet(2);
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeGet');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterGet',scope.User.content);
		expect(ListService.get).toHaveBeenCalledWith(2);
		expect(scope.User.content.length).toEqual(20);
	})
	it('Should get the list after resetAndGet gets called',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userResetAndGet();
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeResetAndGet');
		scope.$digest();
		expect(scope.page).toEqual(0);
		expect(scope.$broadcast).toHaveBeenCalledWith('afterResetAndGet',scope.User.content);
		expect(ListService.resetAndGet).toHaveBeenCalled();
		expect(scope.User.content.length).toEqual(20);
	})
	it('Should get one element when calls getById',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userGetById(5);
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeGetById');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterGetById',scope.User.id5);
		expect(ListService.getById).toHaveBeenCalledWith(5);
		expect(scope.User.id5).toBeDefined();
		expect(typeof scope.User.id5.name).toEqual('string');
		expect(typeof scope.User.id5.age).toEqual('number');
		expect(typeof scope.User.id5.profession).toEqual('string');
		expect(typeof scope.User.id5.hasDog).toEqual('boolean');
	})
	it('Should call update and return true',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userUpdate({name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true});
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeUpdate',{name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true});
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterUpdate',true);
		expect(ListService.update).toHaveBeenCalledWith({name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true});
	})

	it('Should call delete and return true',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userDelete([{name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true},{name: 'Marcio Souza',profession: 'Jogador de Pebolim',age: 12,hasDog: true}]);
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeDelete');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterDelete',true);
		expect(ListService.deleteCollection).toHaveBeenCalledWith([{name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true},{name: 'Marcio Souza',profession: 'Jogador de Pebolim',age: 12,hasDog: true}]);
	})
	it('Should update the list when i call sort',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userSort('name','asc');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeSort');
		expect(ListService.sort).toHaveBeenCalledWith('name','asc');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterSort',scope.User.content);
		expect(scope.User.content.length).toBe(20);
	})
	it('Should update the list when i call search',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userSearch('name','Juca');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeSearch');
		expect(ListService.getSearch).toHaveBeenCalledWith('name','Juca');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterSearch',scope.User.content);
		expect(scope.User.content.length).toBe(20);
	})
	it('Should update the list when i call advanced search',function(){
		provider.populateScope(scope,ListService,'User','base-list');
		scope.userAdvancedSearch('Juca');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeAdvancedSearch','Juca');
		expect(ListService.getAdvancedSearch).toHaveBeenCalledWith('Juca');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterAdvancedSearch',scope.User.content);
		expect(scope.User.content.length).toBe(20);
	})
	// Form Service
	it('Should get a new value when i call getNew',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		scope.userGetNew();
		expect(FormService.getNew).toHaveBeenCalled();
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeGetNew');
		scope.$digest();
		expect(scope.User.newUser).toBeDefined();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterGetNew',scope.User.newUser);
		expect(typeof scope.User.newUser).toEqual('object');
		expect(scope.User.newUser).toEqual({
			name: null,
			age: null,
			profession: null,
			hasDog: null
		});
	})
	it('Should get one element when calls getById',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		scope.userGetById(5);
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeGetById');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterGetById',scope.User.id5);
		expect(FormService.getById).toHaveBeenCalledWith(5);
		expect(scope.User.id5).toBeDefined();
		expect(typeof scope.User.id5.name).toEqual('string');
		expect(typeof scope.User.id5.age).toEqual('number');
		expect(typeof scope.User.id5.profession).toEqual('string');
		expect(typeof scope.User.id5.hasDog).toEqual('boolean');
	})
	it('Should receive true when the value was saved',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		scope.userSave('Juca da Silva','name');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeSave','Juca da Silva');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterSave',true);
		expect(FormService.update).toHaveBeenCalledWith({name: 'Juca da Silva'});
	})
	it('Should receive true when the value was updated',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		scope.userUpdate({name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true},'user');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeUpdate',{name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true});
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterUpdate',true);
		expect(FormService.update).toHaveBeenCalledWith({name: 'Juca da Silva',profession: 'Testezinhu',age: 155,hasDog: true});
	})
	it('Should receive true when saveImage is called',function(){
		provider.populateScope(scope,FormService,'User','base-form');
		scope.userSaveImage('attribute','model');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeSaveImage');
		expect(FormService.saveImage).toHaveBeenCalledWith('attribute','model');
	})
	it('Should receive true when deleteImage is called',function(){
		provider.populateScope(scope,FormService,'user','base-form');
		scope.userDeleteImage('attribute','model');
		expect(FormService.deleteImage).toHaveBeenCalledWith('attribute','model');
		expect(scope.$broadcast).toHaveBeenCalledWith('beforeDeleteImage');
		scope.$digest();
		expect(scope.$broadcast).toHaveBeenCalledWith('afterDeleteImage',true);
	})
})
