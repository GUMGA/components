describe('COMPONENT: GumgaQuery', function() {
  const template = string => angular.element(string)

	let $compile                    = {},
      scope                       = {},
      gumgaQueryWithNothing       = template(`<gumga-query> </gumga-query>`),
      gumgaQueryWithSearch        = template(`<gumga-query search="foo(name, param)"> </gumga-query>`),
      gumgaQueryWithAdvanced      = template(`<gumga-query search="foo(name, param)" advanced-search="fooAdv(param)"> </gumga-query>`),
      gumgaQueryWithSavedFilters  = template(`<gumga-query search="foo(name, param)" saved-filters="fooFilters(page)"> </gumga-query>`),
      gumgaQueryWithAttribute     = template(`<gumga-query search="foo(name, param)"> <search-field field="name" select="false">        </search-field> </gumga-query>`)

	beforeEach(module('gumga.query'))

	beforeEach(inject((_$compile_, $rootScope) => {
    $compile          = _$compile_
    scope             = $rootScope.$new()
    scope.foo         = (field, param) => true
    scope.fooFilters  = (page) => true
    scope.fooAdv      = param => !!param
  }))

  describe('Getting the functions needed', () => {
    it(`Should console error when there's no search parameter`, () => {
      spyOn(console, 'error')
      $compile(gumgaQueryWithNothing)(scope)
      expect(console.error).toHaveBeenCalledWith('É necessário passar uma função para o atributo "search". [search="foo(field, param)"]')
    })

    it(`Should NOT console error when there's a search parameter`, () => {
      spyOn(console, 'error')
      $compile(gumgaQueryWithSearch)(scope)
      expect(console.error).not.toHaveBeenCalledWith('É necessário passar uma função para o atributo "search". [search="foo(field, param)"]')
    })

    it('Should call the scope.foo when i call controller.search', () => {
      spyOn(scope, 'foo')
      $compile(gumgaQueryWithSearch)(scope)
      let controller = gumgaQueryWithSearch.controller('gumgaQuery')
      controller.search()
      expect(scope.foo).toHaveBeenCalled()
    })

    it('Should call the scope.fooAdv when i call controller.advancedSearch', () => {
      spyOn(scope, 'fooAdv')
      $compile(gumgaQueryWithAdvanced)(scope)
      let controller = gumgaQueryWithAdvanced.controller('gumgaQuery')
      controller.advancedSearch()
      expect(scope.fooAdv).toHaveBeenCalled()
    })

    it('Should call the scope.fooFilters when i call controller.savedFilters', () => {
      spyOn(scope, 'fooFilters')
      $compile(gumgaQueryWithSavedFilters)(scope)
      let controller = gumgaQueryWithSavedFilters.controller('gumgaQuery')
      controller.savedFilters()
      expect(scope.fooFilters).toHaveBeenCalled()
    })
  })

  describe('Getting the attributes', () => {
    it('Should get the "select", "field" and "template" for the search-field', () => {
      $compile(gumgaQueryWithAttribute)(scope)
      let controller = gumgaQueryWithAttribute.controller('gumgaQuery')
    })
  })
})
