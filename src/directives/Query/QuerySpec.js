describe('DIRECTIVE: GumgaQueries',function(){
  var scope;

  beforeEach(module('gumga.directives.query'));

  beforeEach(
    inject(
      function($rootScope,$compile){
        scope = $rootScope.$new();
        var template = angular.element('<gumga-queries></gumga-queries>');
        $compile(template)(scope);
      }
    )
  )


  it('should get the array that is on scope',function(){
    
  });
})
