describe('DIRECTIVE: GumgaAdvancedLabel',function(){
  var scope;
  var isolatedScope;
  beforeEach(module('gumga.directives.search.advancedlabel'));

  describe('Case 01: Has every value',function(){
    beforeEach(inject(function($rootScope,$compile){
      scope = $rootScope.$new();
      scope.value = 'marcos';
      scope.index = 0;
      var element =
      angular.element('<gumga-advanced-label attr="{{\'Igor\'}}" hql="{{\'equals\'}}" value="value" index="index"></gumga-advanced-label>');
      var template = ($compile(element)(scope)).html();
      isolatedScope = element.isolateScope();
    }));

    it('Should get all attributes ',function(){
      expect(isolatedScope.attr).toBe('Igor');
      expect(isolatedScope.hql).toBe('equals');
      expect(isolatedScope.value).toBe('marcos');
      expect(isolatedScope.index).toBe(0);
    });

    it('Should not change the value',function(){
      isolatedScope.orOrAnd();
      expect(isolatedScope.value).toBe('marcos');
    })
  });

  describe('Case 02: Is OR/AND',function(){
    beforeEach(inject(function($rootScope,$compile){
      scope = $rootScope.$new();
      scope.value = 'AND';
      scope.index = 0;
      var element =
      angular.element('<gumga-advanced-label value="value" index="index"></gumga-advanced-label>');
      var template = ($compile(element)(scope)).html();
      isolatedScope = element.isolateScope();
    }));

    it('Should get the right value',function(){
      expect(isolatedScope.value).toBe('AND');
      expect(isolatedScope.index).toBe(0);
    });

    it('Should change the value',function(){
      isolatedScope.orOrAnd();
      expect(isolatedScope.value).toBe('AND');
    });

    it('Should emit deletepls',function(){
      spyOn(isolatedScope, "$emit");
      isolatedScope.emitDelete();
      expect(isolatedScope.$emit).toHaveBeenCalledWith("deletepls",scope.index);
    })
  });
})
