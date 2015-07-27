describe('DIRECTIVE: GumgaNormalSearch',function(){
  var scope;
  var isolatedScope;
  var template;
  beforeEach(module('gumga.directives.search.normalsearch'));

  beforeEach(inject(function($rootScope,$compile){
    scope = $rootScope.$new();
    scope.$parent.entityToTranslate = 'coisa';
    scope.$parent.normalFields = ['nome','tipo','nascimento'];
    var element =
    angular.element(
      '<gumga-normal-search>' +
      '</gumga-normal-search>');
    template = ($compile(element)(scope)).html();
  }));

  describe('Must get all the data needed and transform it',function(){
    it('Should get the right attributes from parent',function(){
      expect(scope.translate).toEqual('coisa');
      expect(scope.normalFields[0]).toEqual({name: 'Nome',value: 'nome'});
      expect(scope.normalFields[1]).toEqual({name: 'Tipo',value: 'tipo'});
      expect(scope.normalFields[2]).toEqual({name: 'Nascimento',value: 'nascimento'});
      expect(scope.models.nome).toBe(true);
      expect(scope.models.tipo).toBe(false);
      expect(scope.models.nascimento).toBe(false);
    })
  });

  describe('Must return the right values depending on the selectable values',function(){

    it('Should emit the right values with 1 model selected',function(){
      scope.models.nome = true;
      scope.models.tipo = false;
      scope.models.nascimento = false;
      spyOn(scope,'$emit');
      scope.doSearch('abacaxi');
      expect(scope.$emit).toHaveBeenCalledWith('normal',{field: 'nome',param: 'abacaxi'});
    });

    it('Should emit the right values with 2 model selected',function(){
      scope.models.nome = true;
      scope.models.tipo = true;
      scope.models.nascimento = false;
      spyOn(scope,'$emit');
      scope.doSearch('abacaxi');
      expect(scope.$emit).toHaveBeenCalledWith('normal',{field: 'nome,tipo',param: 'abacaxi'});
    });

    it('Should emit the right values with 3 model selected',function(){
      scope.models.nome = true;
      scope.models.tipo = true;
      scope.models.nascimento = true;
      spyOn(scope,'$emit');
      scope.doSearch('abacaxi');
      expect(scope.$emit).toHaveBeenCalledWith('normal',{field: 'nome,tipo,nascimento',param: 'abacaxi'});
    })

  })


})