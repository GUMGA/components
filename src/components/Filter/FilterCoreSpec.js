describe('COMPONENTE: FilterCore', () => {
  let $scope,
      $compile


  beforeEach(module('gumga.filter'))

  beforeEach(
    inject(($rootScope, _$compile_) => {
      $scope = $rootScope.$new()
      $compile = _$compile_
    })
  )

})
