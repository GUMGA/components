describe('COMPONENTE: GumgaList', () => {
  let scope,
      controller;

  beforeEach(module('gumga.list'));


  beforeEach(
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();

      scope.tableConfig = {
        columns: 'teste, testezinho',
        checkbox: true,
        columnsConfig: [{
          name: 'teste'
        }]
      }
      let html    = `<gumga-list-two sort="function()" class="table-responsive table-striped" configuration="tableConfig"> </gumga-list-two>`,
          element = angular.element(html);

      $compile(element)(scope);
      controller  = element.isolateScope().ctrl;
    })
  )


  describe('SUITE', () => {
    it('Should something', () => {

    })
  })
})
