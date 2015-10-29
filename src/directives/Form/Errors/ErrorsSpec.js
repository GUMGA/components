describe('Gumga.core:directives:formErrors', function() {
  let scope, controller, directiveScope;

  beforeEach(module('gumga.directives.form.errors'));
  beforeEach(module('gumga.directives.form.form'));

  beforeEach(
    inject(($rootScope,$compile) => {
      scope = $rootScope.$new();
      scope.entity = {};
      let template = `
      <form novalidate gumga-form name="Teste" class="col-md-6 col-md-offset-6">
        <input type="date" ng-model="teste" name="name" gumga-error ng-model="entity.foo" gumga-max-date="1995-09-16" gumga-error/>
        <input type="text" ng-model="teste" name="name1" gumga-error ng-model="entity.foo" gumga-error/>
        <gumga-errors></gumga-errors>
      </form>`

      let elm = angular.element(template);
      $compile(elm)(scope);
      directiveScope = elm.find('gumga-errors').isolateScope();
      controller = elm.controller('gumgaForm');
      scope.$digest();
    })
  )

  it('should valids',function() {
    controller.changeStateOfInput('name','maxlength',false, 10);
    controller.changeStateOfInput('name','required', false, 10);
    controller.changeStateOfInput('name1','required', false, 10);
    scope.$broadcast('form-changed', {
      name:{
        maxlength: "O texto especificado no campo name não deve ultrapassar o limite de: 10.",
        required:"O campo name é obrigatório."},
      name1:{
        required:"O campo name1 é obrigatório."
      }
    })
    expect(directiveScope.errors).toEqual({
      namemaxlength: "O texto especificado no campo name não deve ultrapassar o limite de: 10.",
      namerequired: "O campo name é obrigatório.",
      name1required: "O campo name1 é obrigatório."
    })
  });
});
