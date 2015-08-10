describe('DIRECTIVE: GumgaList',function () {
  var scope
  ,   controller;

  beforeEach(module('gumga.directives.list'));

  beforeEach(
    inject(
      function($rootScope,$compile){
        scope = $rootScope.$new();
        var element = angular.element('<gumga-list name="ToDo"></gumga-list>');
        $compile(element)(scope);
        controller = element.controller('gumgaList');
      }
    )
  )

  describe('Getting the right configs',function(){
    it('Should do it right',function(){
      
    })
  })
})
