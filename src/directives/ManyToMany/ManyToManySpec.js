describe('DIRECTIVE: ManyToMany',function(){
	var scope;
	var isolated;
	var html;
	var $uibModal;
	beforeEach(module('gumga.directives.manytomany'));

	var modalInstance = {
		result: {
			then: function(confirmCallback, cancelCallback){
				this.confirmCallback = confirmCallback;
				this.cancelCallback = cancelCallback;
			}
		},
		close: function(item){
			this.result.confirmCallback(item);
		},
		dismiss: function(type){
			this.result.cancelCallback(type);
		}
	};

	beforeEach(inject(function ($rootScope, $compile,_$uibModal_,$controller) {
		scope = $rootScope.$new();
		$uibModal = _$uibModal_;
		scope.characters = [
		{name: 'Luke', surname: 'Skywalker', age: 20},
		{name: 'Anakin', surname: 'Skywalker', age: 50},
		{name: 'Frodo', surname: 'Baggins', age: 55},
		{name: 'Bilbo', surname: 'Baggins', age: 105},
		{name: 'Harry', surname: 'Potter', age: 19},
		{name: 'Hermione', surname: 'Granger', age: 19},
		{name: 'Rony', surname: 'Weasley', age: 21}
		];

		scope.realPersons = [
		{name: 'Maria', surname: 'Joaquina', age: 20},
		{name: 'Juca', surname: 'Edivalda', age: 50},
		{name: 'Marcelo', surname: 'D2', age: 55},
		{name: 'pinguim', surname: 'batman', age: 105},
		{name: 'Romero', surname: 'Britto', age: 19},
		{name: 'Sim', surname: 'senhor', age: 19},
		{name: 'Não', surname: 'senhor', age: 21}
		];

		scope.leftSearch = angular.noop;
		scope.doPost = angular.noop;

		var element = angular.element(
			'<gumga-many-to-many left-list="characters" right-list="realPersons" left-search="leftSearch(param)" authorize-add="true" left-label="Children" right-label="Hated Children" filter-parameter="name" post-method="doPost(value)">' +
			'       <left-field>{{$value.name}}</left-field>' +
			'       <right-field>{{$value.name}}</right-field>' +
			'</gumga-many-to-many>');
		$compile(element)(scope);
		html = element.html();
		isolated = element.isolateScope();
		spyOn($uibModal, 'open').and.returnValue(modalInstance);
	}));

	it('Should initialize all needed variables',function(){
		expect(isolated.left.length).toEqual(7);
		expect(isolated.right.length).toEqual(7);
		expect(isolated.texts.left).toEqual('{{$value.name}}');
		expect(isolated.texts.right).toEqual('{{$value.name}}');
	});

	describe('If it has leftSearch',function(){
		it('Should have a ng-change in input',function(){
			expect(html).toContain('ng-change="leftFn({param: leftFilter})"');
		});

		it('Should call leftSearch({param: filterLeftList}) with a param',function(){
			spyOn(scope,'leftSearch');
			isolated.leftFn({param: 'Busca'});
			expect(scope.leftSearch).toHaveBeenCalledWith('Busca');
		})
	});

	it('Should remove from a list and add to another if i click in a $value',function(){
		isolated.removeFromAndAddTo(isolated.left,isolated.right,{name: 'Luke', surname: 'Skywalker', age: 20});
		expect(isolated.left.length).toEqual(6);
		expect(isolated.right.length).toEqual(8);
	});

	describe('When i call addNew',function(){
		it('Should execute a post method and clean it all ',function(){
			spyOn(scope,'doPost');
			spyOn(scope,'leftSearch');
			isolated.addNew('Senhor Miyagi');
			expect(isolated.leftFilter).toEqual('');
			expect(scope.doPost).toHaveBeenCalledWith('Senhor Miyagi');
		})
	});

	describe('When i call showPlus',function(){
		it('Should filter both lists',function(){
			isolated.leftFilter = 'Luke';
			var x = isolated.showPlus();
			expect(x).toBe(false);
		});

		it('Should filter both lists',function(){
			isolated.leftFilter = 'Jamanta';
			var x = isolated.showPlus();
			expect(x).toBe(true);
		})
	});

	describe('When i call halp',function(){
		it('Should launch a modal',function(){
			isolated.halp({name: 'Luke', surname: 'Skywalker', age: 20});
			expect($uibModal.open).toHaveBeenCalled();
		})

	})


})
