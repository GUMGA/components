describe('DIRECTIVE: GumgaQueries',function(){
  var scope
      queries =
      [
        {
          "attribute":{
            "name":"descricao",
            "type":"string"
          },
          "hql":{
            "after":"'",
            "before":"='",
            "hql":"eq",
            "label":"igual"
          },
          "value":"josualdo"
        }
      ];

  beforeEach(module('gumga.directives.queries'));

  beforeEach(
    inject(
      function($rootScope,$compile){
        scope = $rootScope.$new();
        scope.searchQueries = queries;
        var template = angular.element('<gumga-queries></gumga-queries>');
        $compile(template)(scope);
      }
    )
  )


  it('should get the array that is on scope',function(){
    expect(scope.hasQueries).toBeTruthy();
  });
})
