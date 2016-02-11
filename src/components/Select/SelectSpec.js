describe('Componente: GumgaSelect', () => {
  let $scope, $compile

  const GET_ERROR = `É necessário passar uma função no parâmetro get. <gumga-select get="foo()"></gumga-select>`,
        NGMODEL_ERROR = `É necessário passar uma variável para o parâmetro ngModel. <gumga-select ng-model="person"></gumga-select>`

  const noParamsElement     = angular.element(`<gumga-select></gumga-select>`),
        onlyGetElement      = angular.element(`<gumga-select get="foo()"></gumga-select>`),
        onlyNgModelElement  = angular.element(`<gumga-select ng-model="person"> </gumga-select>`),
        noErrorsElement     = angular.element(`<gumga-select ng-model="person" get="foo()"></gumga-select>`),
        addItemElement      = angular.element(`<gumga-select ng-model="person" get="foo()" add-item="add($value)"></gumga-select>`)


  beforeEach(module('gumga.select'))

  beforeEach(
    inject(($rootScope, _$compile_) => {
      $scope    = $rootScope.$new()
      $compile  = _$compile_

      $scope.foo    = angular.noop
      $scope.person = {}
      $scope.add    = angular.noop
    })
  )

  describe('Testing the params passed in html', () => {

    it(`Should console error when there's no ngModel and no get function`, () => {
      spyOn(console, 'error')
      $compile(noParamsElement)($scope)
      expect(console.error).toHaveBeenCalledWith(GET_ERROR)
      expect(console.error).toHaveBeenCalledWith(NGMODEL_ERROR)
    })

    it('Should console only ngModel error when get function is passed', () => {
      spyOn(console, 'error')
      $compile(onlyGetElement)($scope)
      expect(console.error).not.toHaveBeenCalledWith(GET_ERROR)
      expect(console.error).toHaveBeenCalledWith(NGMODEL_ERROR)
    })

    it('Should console only get Error when ngModel is passed', () => {
      spyOn(console, 'error')
      $compile(onlyNgModelElement)($scope)
      expect(console.error).toHaveBeenCalledWith(GET_ERROR)
      expect(console.error).not.toHaveBeenCalledWith(NGMODEL_ERROR)
    })

    it('Should not console any error', () => {
      spyOn(console, 'error')
      $compile(noErrorsElement)($scope)
      expect(console.error).not.toHaveBeenCalledWith(GET_ERROR)
      expect(console.error).not.toHaveBeenCalledWith(NGMODEL_ERROR)
    })

  })

  describe(`Testing component's I/O`, () => {

    it('Should call $scope.foo when i call ctrl.get', () => {
      spyOn($scope, 'foo')
      $compile(noErrorsElement)($scope)
      let controller = noErrorsElement.controller('gumgaSelect')
      controller.get()
      expect($scope.foo).toHaveBeenCalled()
    })

    it('Should call $scope.foo when i call ctrl.asyncGet', () => {
      spyOn($scope, 'foo')
      $compile(noErrorsElement)($scope)
      let controller = noErrorsElement.controller('gumgaSelect')
      controller.asyncGet()
      expect($scope.foo).toHaveBeenCalled()
    })

    it('Should call $scope.foo when i call ctrl.addItem', () => {
      spyOn($scope, 'add')
      $compile(addItemElement)($scope)
      let controller = addItemElement.controller('gumgaSelect')
      controller.addItem({  $value: { name: 'Igor'}})
      expect($scope.add).toHaveBeenCalledWith({name: 'Igor'})
    })

  })
})
