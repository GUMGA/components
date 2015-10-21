describe('Gumga.core:directives:GumgaPassword', function() {
  beforeEach(module('gumga.directives.password'));
  var element, form, scope;
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element(
       '<form name="myForm">'
      +'  <gumga-password value="entity.password" contains-uppercase="true" contains-numbers="true"></gumga-password>'
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
      scope.$digest();
      expect(scope.entity.password).toEqual('senha');
      expect(form.$error.pattern).toBe(true);
    });
    it('whin the value is valid', function(){
      scope.entity.password = 'SenhA123'
      scope.$digest();
      expect(scope.entity.password).toEqual('SenhA123');
      expect(form.$error.pattern).toBe(undefined);
    });
  });
});
