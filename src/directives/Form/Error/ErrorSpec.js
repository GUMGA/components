describe('Gumga.core:directives:formError', function() {

  var compile, mockBackend, scope, mock, form;
  beforeEach(module('gumga.directives.form.max.length'));
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;

    // mock = {
    //   name: 'nome',
    //   message: 'mensagem do campo {0} precisa de {1}',
    //   fieldMessage: 'mensagem precisa de {1}',
    //   valid: null,
    // };

    var element = angular.element(
      '<form name="myForm">' +
      '<input type="text" name="nome" ng-model="pessoa.nome" gumga-max-length="10">' +
      '</form>'
      );
    scope.pessoa = { nome: null };
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('max', function() {
    it('should valid input value',function() {
      // mock.valid = true;
      // $rootScope.$broadcast('$errorMessage',mock)
      //
      // form.nome.$setViewValue('Guilherme');
      // expect(scope.pessoa.nome).toEqual('Guilherme');
      // expect(form.nome.$valid).toBe(true);
    });
    it('should invalid input value',function() {
      form.nome.$setViewValue('Guilherme Siquinelli');
      expect(scope.pessoa.nome).toEqual('Guilherme Siquinelli');
      expect(form.nome.$valid).toBe(false);
    });
    it('event',function() {
      scope.$on('$errorMessage', function(event, data) {
        if (elm[0].name == data.name) {
          if (data.valid == false) {
            scope.addError(data);
          } else {
            scope.removeError(data);
          }
        }
      });
    });
  });
});
