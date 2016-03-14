describe('COMPONENT: GumgaQuery', function() {
  const template = string => angular.element(string)

  let $compile                        = {},
      scope                           = {},
      gumgaQueryWithNothing           = template(`<gumga-query> </gumga-query>`),
      gumgaQueryWithSearch            = template(`<gumga-query search="foo(name, param)"> </gumga-query>`),
      gumgaQueryWithAdvanced          = template(`<gumga-query search="foo(name, param)" advanced-search="fooAdv(param)"> </gumga-query>`),
      gumgaQueryWithSavedFilters      = template(`<gumga-query search="foo(name, param)" saved-filters="fooFilters(page)"> </gumga-query>`),
      gumgaQueryWithAttribute         = template(`<gumga-query search="foo(name, param)"> <search-field field="name" select="false" label="Nome"> </search-field> </gumga-query>`),
      gumgaQueryWithAttributeNoLabel  = template(`<gumga-query search="foo(name, param)"> <search-field field="name" select="false"> </search-field> </gumga-query>`),
      gumgaQueryWithAttributeNoField  = template(`<gumga-query search="foo(name, param)"> <search-field select="false"> </search-field> </gumga-query>`)


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
    //
    it('Should call the scope.foo when i call controller.search', () => {
      spyOn(scope, 'foo')
      $compile(gumgaQueryWithSearch)(scope)
      let controller = gumgaQueryWithSearch.controller('gumgaQuery')
      controller.search()
      expect(scope.foo).toHaveBeenCalled()
    })
    //
    //
    it('Should call the scope.fooFilters when i call controller.savedFilters', () => {
      spyOn(scope, 'fooFilters')
      $compile(gumgaQueryWithSavedFilters)(scope)
      let controller = gumgaQueryWithSavedFilters.controller('gumgaQuery')
      controller.savedFilters()
      expect(scope.fooFilters).toHaveBeenCalled()
    })
  })
//
  describe('Getting the attributes', () => {
    it('Should get the "select", "field" and "label" for the search-field', () => {
      $compile(gumgaQueryWithAttribute)(scope)
      let controller = gumgaQueryWithAttribute.controller('gumgaQuery')
      expect(controller.mapFields['name']).toEqual({
        checkbox: true,
        label: 'Nome',
        field: 'name'
      })
    })

    it('Should create a label for the field', () => {
      $compile(gumgaQueryWithAttributeNoLabel)(scope)
      let controller = gumgaQueryWithAttributeNoLabel.controller('gumgaQuery')
      expect(controller.mapFields['name']).toEqual({
        checkbox: true,
        label: 'Name',
        field: 'name'
      })
    })

    it('Should log error if field is not found', () => {
      spyOn(console,'error')
      $compile(gumgaQueryWithAttributeNoField)(scope)
      let controller = gumgaQueryWithAttributeNoField.controller('gumgaQuery')
      expect(console.error).toHaveBeenCalledWith('É necessário um parâmetro field na tag search-field.[<search-field field="foo"></search-field>]')
    })

    it('Should not call scope.foo', () => {
      spyOn(scope, 'foo')
      $compile(gumgaQueryWithAttribute)(scope)
      let controller = gumgaQueryWithAttribute.controller('gumgaQuery')
      controller.doSearch('Jonathan da nova Geração')
      expect(scope.foo).not.toHaveBeenCalled()
    })


  })
//
})
