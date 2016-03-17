describe('COMPONENTE: FilterCore', () => {
  let scope,
      $compile,
      HQLFactory,
      noAttributesElement                 = angular.element(`<gumga-filter-core> </gumga-filter-core>`),
      searchAttributeElement              = angular.element(`<gumga-filter-core search="foo(param)"> </gumga-filter-core>`),
      searchFieldWithNoAttributeElement   = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithNoTypeElement        = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="name"></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithInvalidTypeElement   = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="name" type="xablau"></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithValidTypeElement     = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="name" type="string"></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithStaticLabelElement   = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="name" type="string" label="Nome"></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithDynamicLabelElement  = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="name" type="string" label="{{ name | lowercase}}"></advanced-search-field> </gumga-filter-core>`),
      searchFieldWithOrder                = angular.element(`<gumga-filter-core search="foo(param)"> <advanced-search-field field="age" type="number" label="Idade"></advanced-search-field><advanced-search-field field="name" type="string" label="{{ name | lowercase}}"></advanced-search-field> </gumga-filter-core>`)

      const FIELD_ERR   = `É necessário atribuir um valor ao atributo FIELD da tag ADVANCED-SEARCH-FIELD.`,
            TYPE_ERR    = `O tipo "{1}" passado como parâmetro para o ADVANCED-SEARCH-FIELD não é suportado.`,
            NOTYPE_ERR  = `É necessário atribuir um valor ao atributo TYPE da tag ADVANCED-SEARCH-FIELD.`,
            SEARCH_ERR  = `É necessário atribuir uma função para o atributo SEARCH. [search="foo()"]`

  beforeEach(module('gumga.filter'))

  beforeEach(
    inject(($rootScope, _$compile_, _HQLFactory_) => {
      scope = $rootScope.$new()
      $compile = _$compile_
      HQLFactory = _HQLFactory_
      scope.foo = angular.noop
      /*
        Como o filterCore é utilizado dentro do $scope de um componente hospedeiro (query ou filter),
        o contexto que ele utilizará para compilar a label será o do $parent.$parent. Como neste caso não estamos utilizando um hospedeiro,
        a variável que será utilizada na label dinâmica deve estar 2 escopos acima
      */
      scope.$parent.name = 'nOME'
    })
  )

  describe('Testing error handling', () => {

    it(`Should console error when there's no search`, () => {
      spyOn(console, 'error'), $compile(noAttributesElement)(scope)
      expect(console.error).toHaveBeenCalledWith(SEARCH_ERR)
      expect(console.error).not.toHaveBeenCalledWith(TYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(NOTYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(FIELD_ERR)
    })

    it(`Should NOT console error when there's a search attribute`, () => {
      spyOn(console, 'error'), $compile(searchAttributeElement)(scope)
      expect(console.error).not.toHaveBeenCalledWith(SEARCH_ERR)
      expect(console.error).not.toHaveBeenCalledWith(TYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(NOTYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(FIELD_ERR)
    })

    it(`Should console.error when the advancedSearchField passed there's not field attribute`, () => {
      spyOn(console, 'error'), $compile(searchFieldWithNoAttributeElement)(scope)
      expect(console.error).not.toHaveBeenCalledWith(SEARCH_ERR)
      expect(console.error).not.toHaveBeenCalledWith(TYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(NOTYPE_ERR)
      expect(console.error).toHaveBeenCalledWith(FIELD_ERR)
    })

    it(`Should console.error when there's no type attribute on advancedSearchField`, () => {
      spyOn(console, 'error'), $compile(searchFieldWithNoTypeElement)(scope)
      expect(console.error).not.toHaveBeenCalledWith(SEARCH_ERR)
      expect(console.error).toHaveBeenCalledWith(NOTYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(TYPE_ERR)
      expect(console.error).not.toHaveBeenCalledWith(FIELD_ERR)
    })

    it(`Should console.error when the the type passed to advancedSearchField is invalid`, () => {
      spyOn(console, 'error'), $compile(searchFieldWithInvalidTypeElement)(scope)
      expect(console.error).not.toHaveBeenCalledWith(SEARCH_ERR)
      expect(console.error).not.toHaveBeenCalledWith(NOTYPE_ERR)
      expect(console.error).toHaveBeenCalledWith(TYPE_ERR.replace('{1}', 'xablau'))
      expect(console.error).not.toHaveBeenCalledWith(FIELD_ERR)
    })
  })

  describe('Testing if the attributes taken are okay', () => {

    it(`Should get the attributes right if there's no error`, () => {
      $compile(searchFieldWithValidTypeElement)(scope)
      let isolated = searchFieldWithValidTypeElement.isolateScope()
      isolated.$apply()
      expect(isolated._attributes[0]).toEqual({ field: 'name', type: 'string', label: 'Name', extraProperties: undefined})
    })

    it(`Should get the attributes right if there's a static label passed`, () => {
      $compile(searchFieldWithStaticLabelElement)(scope)
      let isolated = searchFieldWithStaticLabelElement.isolateScope()
      isolated.$apply()
      expect(isolated._attributes[0]).toEqual({ field: 'name', type: 'string', label: 'Nome', extraProperties: undefined})
    })

    it(`Should get the attributes right if there's a dynamic label passed`, () => {
      $compile(searchFieldWithDynamicLabelElement)(scope)
      let isolated = searchFieldWithDynamicLabelElement.isolateScope()
      isolated.$apply()
      expect(isolated._attributes[0]).toEqual({ field: 'name', type: 'string', label: 'nome', extraProperties: undefined})
    })

    it('Should get both attributes in the right order', () => {
      $compile(searchFieldWithOrder)(scope)
      let isolated = searchFieldWithOrder.isolateScope()
      isolated.$apply()
      expect(isolated._attributes[0]).toEqual({ field: 'age', type: 'number', label: 'Idade', extraProperties: undefined})
      expect(isolated._attributes[1]).toEqual({ field: 'name', type: 'string', label: 'nome', extraProperties: undefined})
    })

  })


})
