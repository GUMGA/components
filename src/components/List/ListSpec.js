describe('COMPONENTE: GumgaList', () => {
  let scope,
  $compile,
  simple                                = angular.element('<gumga-list></gumga-list>'),
  simpleWithData                        = angular.element('<gumga-list data="arrayData"></gumga-list>'),
  simpleWithConfig                      = angular.element('<gumga-list configuration="tableConfig"></gumga-list>'),
  simpleWithConfigAndData               = angular.element('<gumga-list data="arrayData" configuration="emptyObject"></gumga-list>'),
  simpleWithNoError                     = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns"></gumga-list>'),
  simpleWithNoErrorAndSort              = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" sort="sort(field, dir)"></gumga-list>'),
  simpleWithNoErrorAndSortAndSortEvent  = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" sort="sort(field, dir)" on-sort="onSort(field, dir)">></gumga-list>'),
  simpleWithNoErrorAndClass             = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" class="table-condensed table-striped"></gumga-list>'),
  simpleWithNoErrorAndClickEvent        = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" on-click="onClick($value)"></gumga-list>'),
  simpleWithNoErrorAndDoubleClickEvent  = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" on-double-click="onDoubleClick($value)"></gumga-list>'),
  simpleWithNoErrorAndSortEvent         = angular.element('<gumga-list data="arrayData" configuration="objectWithColumns" on-sort="onSort(field, dir)"></gumga-list>'),
  simpleWithConfigThatHasCheckbox       = angular.element('<gumga-list data="arrayData" configuration="objectWithColumnsAndCheckbox"></gumga-list>'),
  simpleWithConfigThatHasSelection      = angular.element('<gumga-list data="arrayData" configuration="objectWithColumnsAndSelection" ></gumga-list>'),
  simpleWithConfigThatHasSortDefault    = angular.element('<gumga-list data="arrayData" configuration="objectWithColumnsAndSortDefault"></gumga-list>'),
  simpleWithConfigThatHasConditional    = angular.element('<gumga-list data="arrayData" configuration="objectWithColumnsAndConditional"></gumga-list>'),
  simpleWithConfigThatHasColumnsConfig  = angular.element('<gumga-list data="arrayData" configuration="objectWithColumnsAndColumnsConfig" selected-values="arr"></gumga-list>')

  const errorMessages = {
    noData: 'O componente gumgaList necessita de um atributo data, que irá conter os dados que serão visualizados.',
    noConfig: 'O componente gumgaList necessita de um atributo config, que irá conter a configuração necessária.',
    noColumns:  'O componente gumgaList necessita que, no objeto de configuração, exista um atributo columns.'
  }
  beforeEach(module('gumga.list'))


  beforeEach(
    inject(($rootScope, _$compile_) => {
      scope = $rootScope.$new()
      $compile  = _$compile_

      let columns = [{ name: 'name', size: 'col-md-3'  }, { name: 'age', content: 'Idade: {{$value.age}} anos'}]

      scope.emptyObject                         = {},
      scope.objectWithColumns                   = { columns: 'name, age' },
      scope.objectWithColumnsAndCheckbox        = { columns: 'name, age', checkbox: true },
      scope.objectWithColumnsAndSelection       = { columns: 'name, age', selection: 'multi' },
      scope.objectWithColumnsAndSelectionSingle = { columns: 'name, age', selection: 'single' },
      scope.objectWithColumnsAndSortDefault     = { columns: 'name, age', sortDefault: 'name' },
      scope.objectWithColumnsAndConditional     = { columns: 'name, age', conditional: angular.noop },
      scope.objectWithColumnsAndColumnsConfig   = { columns: 'name, age', columnsConfig: columns , selection: 'multi'}
      scope.sort          = angular.noop
      scope.onClick       = angular.noop
      scope.onDoubleClick = angular.noop
      scope.onSort        = angular.noop
      scope.arrayData     = [{ name: 'Igor', age: 20}, {name: 'Juca', age: 122}]
      scope.arr           = []
    })
  )

  describe('Testing errors', () => {
    it('Should console noData, noConfig and noColumns errors and get default configurations', () => {
      spyOn(console, 'error')
      expect(() => $compile(simple)(scope)).not.toThrow()
      let controller  = simple.controller('gumgaList')
      expect(console.error).toHaveBeenCalledWith(errorMessages.noData)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noConfig)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noColumns)
      expect(controller.class).toEqual('table ')
      expect(controller.sort).toEqual(angular.noop)
      expect(controller.onSort).toEqual(angular.noop)
      expect(controller.onDoubleClick).toEqual(angular.noop)
      expect(controller.onClick).toEqual(angular.noop)
    })

    it('Should console noConfig and noColumns errors and get default configurations', () => {
      spyOn(console, 'error')
      expect(() => $compile(simpleWithData)(scope)).not.toThrow()
      let controller  = simpleWithData.controller('gumgaList')
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noData)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noConfig)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noColumns)
      expect(controller.class).toEqual('table ')
      expect(controller.sort).toEqual(angular.noop)
      expect(controller.onSort).toEqual(angular.noop)
      expect(controller.onDoubleClick).toEqual(angular.noop)
      expect(controller.onClick).toEqual(angular.noop)
    })

    it('Should console noData and noColumns errors and get default configurations', () => {
      spyOn(console, 'error')
      expect(() => $compile(simpleWithConfig)(scope)).not.toThrow()
      let controller  = simpleWithConfig.controller('gumgaList')
      expect(console.error).toHaveBeenCalledWith(errorMessages.noData)
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noConfig)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noColumns)
      expect(controller.class).toEqual('table ')
      expect(controller.sort).toEqual(angular.noop)
      expect(controller.onSort).toEqual(angular.noop)
      expect(controller.onDoubleClick).toEqual(angular.noop)
      expect(controller.onClick).toEqual(angular.noop)
    })

    it('Should console noColumns error and get default configurations', () => {
      spyOn(console, 'error')
      expect(() => $compile(simpleWithConfigAndData)(scope)).not.toThrow()
      let controller  = simpleWithConfigAndData.controller('gumgaList')
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noData)
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noConfig)
      expect(console.error).toHaveBeenCalledWith(errorMessages.noColumns)
      expect(controller.class).toEqual('table ')
      expect(controller.sort).toEqual(angular.noop)
      expect(controller.onSort).toEqual(angular.noop)
      expect(controller.onDoubleClick).toEqual(angular.noop)
      expect(controller.onClick).toEqual(angular.noop)
    })

    it('Should not console errors and get default configurations', () => {
      spyOn(console, 'error')
      expect(() => $compile(simpleWithNoError)(scope)).not.toThrow()
      let controller  = simpleWithNoError.controller('gumgaList')
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noData)
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noConfig)
      expect(console.error).not.toHaveBeenCalledWith(errorMessages.noColumns)
      expect(controller.class).toEqual('table ')
      expect(controller.sort).toEqual(angular.noop)
      expect(controller.onSort).toEqual(angular.noop)
      expect(controller.onDoubleClick).toEqual(angular.noop)
      expect(controller.onClick).toEqual(angular.noop)
      expect(controller.config.checkbox).toBe(false)
      expect(controller.config.selection).toEqual('single')
      expect(controller.config.itemsPerPage).toEqual([])
      expect(controller.config.sortDefault).toEqual(null)
      expect(controller.config.columnsConfig).toEqual([
        { title: 'Name', size: ' ', name: 'name', content: '{{$value.name}}', sortField: null  , conditional: angular.noop },
        { title: 'Age', size: ' ', name: 'age', content: '{{$value.age}}', sortField: null  , conditional: angular.noop }
      ])

    })

  })

  describe('Testing the attributes', () => {
    it('Should get the correct sort function', () => {
      expect(() => $compile(simpleWithNoErrorAndSort)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndSort.controller('gumgaList')

      spyOn(scope, 'sort')
      spyOn(controller, 'onSort')

      controller.doSort('name', 'asc')
      expect(scope.sort).toHaveBeenCalledWith('name', 'asc')
      expect(controller.onSort).toHaveBeenCalledWith({field: 'name', dir: 'asc'})
    })

    it('Should get the correct class attribute ', () => {
      expect(() => $compile(simpleWithNoErrorAndClass)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndClass.controller('gumgaList')
      expect(controller.class).toEqual('table table-condensed table-striped')
    })

    it('Should call the right function for the click event when user clicks on a row', () => {
      expect(() => $compile(simpleWithNoErrorAndClickEvent)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndClickEvent.controller('gumgaList')
      scope.$apply()
      spyOn(scope,'onClick')
      controller.select(0, undefined, 'multi')
      expect(scope.onClick).toHaveBeenCalledWith({ name: 'Igor', age: 20})
    })

    it('Should call the right function for the double-click event when user clicks on a row', () => {
      expect(() => $compile(simpleWithNoErrorAndDoubleClickEvent)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndDoubleClickEvent.controller('gumgaList')
      scope.$apply()
      spyOn(scope,'onDoubleClick')
      controller.doubleClick({ name: 'Igor', age: 20})
      expect(scope.onDoubleClick).toHaveBeenCalledWith({ name: 'Igor', age: 20})
    })

    it('Should call the right function for the sort event when user clicks on a head that has sort', () => {
      expect(() => $compile(simpleWithNoErrorAndSortEvent)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndSortEvent.controller('gumgaList')
      scope.$apply()
      spyOn(scope,'onSort')
      controller.doSort('name', 'asc')
      expect(scope.onSort).toHaveBeenCalledWith('name', 'asc')
    })

    it('Should call the right function for the sort event when user clicks on a head that has sort', () => {
      expect(() => $compile(simpleWithConfigThatHasCheckbox)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasCheckbox.controller('gumgaList')
      scope.$apply()
      expect(controller.config.checkbox).toBe(true)
    })
  })

  describe('Testing the configurations', () => {
    it('Should get the correct checkbox configuration that was passed through configuration attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasCheckbox)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasCheckbox.controller('gumgaList')
      expect(controller.config.checkbox).toBe(true)
    })

    it('Should get the correct selection configuration that was passed through configuration attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasSelection)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasSelection.controller('gumgaList')
      expect(controller.config.selection).toEqual('multi')
    })

    it('Should get the correct sortDefault configuration that was passed through configuration attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasSortDefault)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasSortDefault.controller('gumgaList')
      expect(controller.config.sortDefault).toEqual('name')
    })

    it('Should get the correct conditional configuration that was passed through configuration attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasConditional)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasConditional.controller('gumgaList')
      expect(controller.config.conditional).toEqual(angular.noop)
    })

    it('Should get the correct ColumnsConfig configuration that was passed through configuration attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasColumnsConfig)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasColumnsConfig.controller('gumgaList')
      expect(controller.config.columnsConfig).toEqual([
        { title: 'Name',size: 'col-md-3', name: 'name', content: '{{$value.name}}', sortField: null  , conditional: angular.noop },
        { title: 'Age', size: ' ', name: 'age', content: 'Idade: {{$value.age}} anos', sortField: null  , conditional: angular.noop }
      ])
    })
  })

  describe('Testing doSort', () => {
    it('Should update the sortedObject', () => {
      expect(() => $compile(simpleWithNoErrorAndSort)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndSort.controller('gumgaList')
      scope.$apply()
      expect(controller.activeSorted.column).toBe(null)
      expect(controller.activeSorted.direction).toBe(null)
      controller.doSort('name')
      expect(controller.activeSorted.column).toEqual('name')
      expect(controller.activeSorted.direction).toBe('asc')
      controller.doSort('name')
      expect(controller.activeSorted.direction).toBe('desc')
    })

    it('Should call outer functions of sorting', () => {
      spyOn(scope, 'sort')
      spyOn(scope, 'onSort')
      expect(() => $compile(simpleWithNoErrorAndSortAndSortEvent)(scope)).not.toThrow()
      let controller  = simpleWithNoErrorAndSortAndSortEvent.controller('gumgaList')
      scope.$apply()
      controller.doSort('name')
      expect(scope.sort).toHaveBeenCalledWith('name','asc')
      expect(scope.onSort).toHaveBeenCalledWith('name','asc')
      controller.doSort('name')
      expect(scope.sort).toHaveBeenCalledWith('name','desc')
      expect(scope.onSort).toHaveBeenCalledWith('name','desc')
    })
  })

  describe('Testing select', () => {
    it('Should change the checkbox value on selected rows when its multi', () => {
      expect(() => $compile(simpleWithConfigThatHasSelection)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasSelection.controller('gumgaList')
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      controller.select(0, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([{ name: 'Igor', age: 20}])
      controller.select(1, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([{ name: 'Igor', age: 20}, { name: 'Juca', age: 122}])
      controller.select(0, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([{ name: 'Juca', age: 122}])
      controller.select(1, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([])
      expect(scope.selectedValues).toEqual([])
    })

    it('Should change the checkbox value on selected rows when its single', () => {
      expect(() => $compile(simpleWithConfigThatHasCheckbox)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasCheckbox.controller('gumgaList')
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      controller.select(0, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([{ name: 'Igor', age: 20}])
      expect(scope.selectedValues).toEqual([{ name: 'Igor', age: 20}])
      controller.select(1, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([ { name: 'Juca', age: 122}])
      expect(scope.selectedValues).toEqual([ { name: 'Juca', age: 122}])
      controller.select(0, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([{ name: 'Igor', age: 20}])
      expect(scope.selectedValues).toEqual([{ name: 'Igor', age: 20}])
      controller.select(1, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([ { name: 'Juca', age: 122}])
      expect(scope.selectedValues).toEqual([ { name: 'Juca', age: 122}])
      controller.select(1, undefined)
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      expect(controller.selectedValues).toEqual([])
      expect(scope.selectedValues).toEqual([])
    })

    it('Should change the checkbox value from outside the list', () => {
      expect(() => $compile(simpleWithConfigThatHasColumnsConfig)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasColumnsConfig.controller('gumgaList')
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.arr.push({ name: 'Igor', age: 20})
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.arr.push({ name: 'Juca', age: 122})
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      scope.arr.pop()
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.arr.pop()
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
    })


    it('Should change the checkbox value from outside the list without a selected-values attribute', () => {
      expect(() => $compile(simpleWithConfigThatHasSelection)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasSelection.controller('gumgaList')
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.selectedValues.push({ name: 'Igor', age: 20})
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.selectedValues.push({ name: 'Juca', age: 122})
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
      scope.selectedValues.pop()
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      scope.selectedValues.pop()
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
    })

    it('Should select every item in the selectedMap when i use selectAll', () => {
      expect(() => $compile(simpleWithConfigThatHasSelection)(scope)).not.toThrow()
      let controller  = simpleWithConfigThatHasSelection.controller('gumgaList')
      scope.$apply()
      expect(controller.selectedMap['0']).toEqual({ checkbox: false, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: false, value: { name: 'Juca', age: 122} })
      controller.selectAll(true)
      expect(controller.selectedMap['0']).toEqual({ checkbox: true, value: { name: 'Igor', age: 20} })
      expect(controller.selectedMap['1']).toEqual({ checkbox: true, value: { name: 'Juca', age: 122} })
    })
  })


})
