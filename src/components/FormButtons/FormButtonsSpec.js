describe('COMPONENTE: FormButtons', () => {
	let scope,
		controller;

	beforeEach(module('gumga.formbuttons'));

	beforeEach(inject(($compile, $rootScope, $timeout, $uibModal)=> {
		scope	=	$rootScope.$new();
		scope.age = 10;
		scope.foo = function(){};
		let template =`
		<gumga-form-buttons continue="{{age > 15}}" confirm-dirty="{{age > 15}}" submit="foo()"
			return-text="Listagem" save-text="Salvar e voltar" keep-inserting-text="Continuar inserindo registros">
		</gumga-form-buttons>
		`
		let element = angular.element(template);
		$compile(element)(scope);
		controller	=	element.isolateScope().vm;
	}))

	it('Should add the boolean value to vm.continue variable', ()=> {
		scope.age = 20;
		scope.$digest();
		expect(controller.continue).toBe(true);
		scope.age = 10;
		scope.$digest();
		expect(controller.continue).toBe(false);
	})

	it('Should add the boolean value to vm.confirmDirty variable', () => {
		scope.age = 20;
		scope.$digest();
		expect(controller.confirmDirty).toBe(true);
		scope.age = 10;
		scope.$digest();
		expect(controller.confirmDirty).toBe(false);
	})

	it('Should get all texts passed to directive', () => {
		expect(controller.returnText).toEqual('Listagem');
		expect(controller.saveText).toEqual('Salvar e voltar');
		expect(controller.keepInsertingText).toEqual('Continuar inserindo registros');
	})
})
