describe('COMPONENT: searchField', function() {
  let templateWithError                               = `<gumga-query search="foo()" > <search-field></search-field></gumga-query>`,
      templateWithField                               = `<gumga-query search="foo()"> <search-field field="name"></search-field></gumga-query>`,
      templateWithFieldAndStaticLabel                 = `<gumga-query search="foo()"> <search-field field="name" label="Nome"></search-field></gumga-query>`,
      templateWithFieldAndVariableLabel               = `<gumga-query search="foo()"> <search-field field="name" label="{{'Nome' | uppercase}}"></search-field></gumga-query>`,
      templateWithFieldAndVariableLabelAndSelectFalse = `<gumga-query search="foo()"> <search-field field="name" label="{{'Nome' | uppercase}}" select="false"></search-field></gumga-query>`,
      templateWithFieldAndVariableLabelAndSelectTrue  = `<gumga-query search="foo()"> <search-field field="name" label="{{'Nome' | uppercase}}" select="true"></search-field></gumga-query>`,
      elementWithError                                = angular.element(templateWithError),
      elementWithField                                = angular.element(templateWithField),
      elementWithFieldAndStaticLabel                  = angular.element(templateWithFieldAndStaticLabel),
      elementWithFieldAndVariableLabel                = angular.element(templateWithFieldAndStaticLabel),
      elementWithFieldAndVariableLabelAndSelectFalse  = angular.element(templateWithFieldAndVariableLabelAndSelectFalse),
      elementWithFieldAndVariableLabelAndSelectTrue   = angular.element(templateWithFieldAndVariableLabelAndSelectTrue),
      scope                                           = {},
      $compile                                        = {},
      isolated                                        = {}

	beforeEach(module('gumga.query'))

	beforeEach(
    inject((_$compile_, $rootScope) => {
      scope             = $rootScope.$new()
      $compile          = _$compile_
    })
  )

  describe('Testing incoming parameters', () => {

    it(`Should console error when there's no field`, () => {
      spyOn(console, 'error')
      console.log(scope)
      $compile(elementWithError)(scope)
      let scope = elementWithError.find('search-field').isolateScope()
      expect(console.error).toHaveBeenCalledWith(`É necessário passar um atributo field para o search-field`)

    })
  })
})
