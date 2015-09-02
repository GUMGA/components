describe('Gumga.core:directives:GumgaPassword', function() {
  beforeEach(module('gumga.directives.password'));
  var element;
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element(
       '<form name="myForm">'
      +'  <gumga-password value="entity.password" with-uppercase="true" with-numbers="true"></gumga-password>'
      +'</form>'
    );
    scope.entity = {};
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('when entity.password pass validation', function() {
    it('when the value is invalid', function(){
      scope.entity.password = 'senha'
      expect(scope.entity.password).toEqual('senha');
      expect(scope.status).toEqual('error');
    });
    it('whin the value is valid', function(){
      scope.entity.password = 'Senha123'
      expect(scope.entity.password).toEqual('Senha123');
      expect(scope.status).toEqual('success');
    });
  });
});
