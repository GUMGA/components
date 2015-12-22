describe('DIRECTIVE: GumgaSearch',function(){
  var scope;
  var isolatedScope;
  var template;
  beforeEach(module('gumga.directives.search.search'));

  beforeEach(inject(function($rootScope,$compile){
    scope = $rootScope.$new();

    scope.doSearch = function(field,param){
      /*                     g(field,param);*/
    };

    scope.doAdvancedSearch = function(param){
      /*                     g(param);*/
    };

    var element =
    angular.element(
      '<gumga-search advanced="true" advanced-method="doAdvancedSearch(param)" search-method="doSearch(field,param)" fields="nome,tipo,nascimento" translate-entity="coisa">' +
      '   <advanced-field name="nome" type="string"></advanced-field>' +
      '   <advanced-field name="tipo" type="boolean"></advanced-field>' +
      '   <advanced-field name="nascimento" type="date"></advanced-field>' +
      '</gumga-search>');
    template = ($compile(element)(scope)).html();
    isolatedScope = element.isolateScope();

  }));


  describe('Must get everything that is needed!',function(){
    it('Should have the right attributes in array',function(){
      expect(isolatedScope.attributes[0].name).toBe('nome');
      expect(isolatedScope.attributes[1].name).toBe('tipo');
      expect(isolatedScope.attributes[2].name).toBe('nascimento');
    });

    it('Should get all normalFields',function(){
      expect(isolatedScope.normalFields[0]).toEqual('nome');
      expect(isolatedScope.normalFields[1]).toEqual('tipo');
      expect(isolatedScope.normalFields[2]).toEqual('nascimento');
    });

    it('Should get the right entity',function(){
      expect(isolatedScope.entityToTranslate).toEqual('coisa');
    });

    it('Should be advanced',function(){
      expect(isolatedScope.adv).toBe(true);
    })
  });

  describe('Must call the functions based on events',function(){
    it('Should call searchMethod on normal event',function(){
      spyOn(isolatedScope,'normal');
      scope.$broadcast('normal',{field: 'nome',param:'teste'});
      expect(isolatedScope.normal).toHaveBeenCalledWith({field: 'nome',param: 'teste'});
    });

    it('Should call advancedMethod on advanced event',function(){
      spyOn(isolatedScope,'advanced');
      scope.$broadcast('advanced','teste');
      expect(isolatedScope.advanced).toHaveBeenCalledWith({param: 'teste'});
    })
  });

  describe('Must call outer functions when inner functions are called',function(){
    it('Should call doSearch when searchMethod is called',function(){
      spyOn(scope,'doSearch');
      isolatedScope.normal({field: 'nome',param:'teste'});
      expect(scope.doSearch).toHaveBeenCalledWith('nome','teste');
    });

    it('Should call doAdvancedSearch when advancedMethod is called',function(){
      spyOn(scope,'doAdvancedSearch');
      isolatedScope.advanced({param:'teste'});
      expect(scope.doAdvancedSearch).toHaveBeenCalledWith('teste');
    })
  })


})