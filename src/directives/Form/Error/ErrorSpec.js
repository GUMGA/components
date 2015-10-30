describe('Gumga.core:directives:error', function() {
  let scope, controller, directiveScope;

  beforeEach(module('gumga.directives.form'));

  beforeEach(
    inject(($rootScope,$compile) => {
      scope = $rootScope.$new();
      scope.entity = {};
      let template = `
      <form novalidate gumga-form name="Teste" class="col-md-6 col-md-offset-6">
        <input type="date" ng-model="teste" name="name" gumga-error ng-model="entity.foo" gumga-max-date="1995-09-16" gumga-error/>
        <input type="text" ng-model="teste" name="name1" gumga-error ng-model="entity.teste" required gumga-error/>
      </form>`

      let elm = angular.element(template);
      $compile(elm)(scope);
      controller = elm.controller('gumgaForm');
      scope.$digest();
    })
  )

  it('should valids',function() {
    
  });
});
