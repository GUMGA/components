describe('Gumga.core:directives:Counter', function() {
  beforeEach(module('gumga.directives.counter'));
  var element, scope, form;
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element(
      '<form name="myForm">'+
        '<input type="text" name="nome" ng-model="nome" gumga-counter="15"/> ' +
      '</form>'
    );
    scope.nome = '';
    $compile(element)(scope);
    scope.$digest();
    form = scope.myForm;
  }));

  describe('when pessoa.nome is higher than 15', function() {
    it('when the value is invalid', function(){
      form.nome.$setViewValue('augusto carniel sena miranda de almeida');
      expect(scope.nome).toEqual('augusto carniel sena miranda de almeida');
      expect(scope._max).toEqual(15)
      expect(element.find('p').html()).toEqual('Você passou o limite de '+scope._max+' caracteres')
    });
    it('whin the value is valid', function(){
      form.nome.$setViewValue('Mateus');
      expect(scope.nome).toEqual('Mateus');
      expect(scope._max).toEqual(15)
      expect(element.find('p').html()).toEqual(scope._max - scope.nome.length+' caracteres restantes')
    });
  });
});
