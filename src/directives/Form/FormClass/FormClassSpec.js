describe("DIRECTIVE: GumgaFormClass",function(){
  let scope, controller, controllerTwo;

  beforeEach(module('gumga.directives.form'));

  beforeEach(
    inject(($rootScope,$compile) => {
      scope = $rootScope.$new();
      scope.entity = {};

      let template = `
      <form novalidate gumga-form name="Teste" class="col-md-6 col-md-offset-6">
        <div gumga-form-class>
          <input type="date" ng-model="teste" name="name" gumga-error ng-model="entity.foo" gumga-max-date="1995-09-16" gumga-error/>
          <input type="date" ng-model="teste" name="name" gumga-error ng-model="entity.foo" gumga-max-date="1995-09-16" gumga-error/>
        </div>
      </form>`
      let elm = angular.element(template);
      scope.pessoa = 'igor';
      $compile(elm)(scope);
      controllerTwo = elm.find('div').controller('gumgaFormClass');
      controller = elm.controller('gumgaForm');
      scope.$digest();
    })
  )

  it('Should do something', () => {
    console.log(controllerTwo);
  })
})
