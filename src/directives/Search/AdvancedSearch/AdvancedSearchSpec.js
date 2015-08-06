describe('DIRECTIVE: GumgaAdvancedSearch',function(){
  var scope;
  var isolatedScope;
  var template;
  var rootScope;
  var GumgaSearchHelper = {
    getTypeListOfHQLPossibilities: function(type){
      return GumgaSearchHelper.types[type].HQLPossibilities;
    },
    translateArrayToHQL: function(array){
      return array
      .map(function(element) {
        var text = (
          (angular.isDefined(element.attribute) ? 'obj.' + element.attribute.name : '!')
          + '' +
          (angular.isDefined(element.hql) ? element.hql.before : ' !')
          + '' +
          element.value
          + (angular.isDefined(element.hql) ? element.hql.after : ' !') );

        if(text.indexOf('!') != -1){
          return text.replace(/!/g,'');
        }
        return text;
      }).join("");
    },
    types: {
      "string": {
        "HQLPossibilities": [
        {hql: "eq", label: "igual"},
        {hql: "ne", label: "diferente de"},
        {ĥql: "contains", label: "contém"},
        {hql: "not_contains", label: "não contém"},
        {hql: "starts_with", label: "começa com"},
        {hql: "ends_with", label: "termina com"},
        {hql: "ge", label: "maior igual"},
        {hql: "le", label: "menor igual"}],
        "validation": function (string) {
          return string.length > 0 && angular.isString(string);
        }
      }
    }
  };


  beforeEach(module('gumga.directives.search.advancedsearch'));
  beforeEach(inject(function($rootScope,$compile,_$document_){
    rootScope = $rootScope;
    scope = $rootScope.$new();
    scope.$parent.entityToTranslate = 'coisa';
    scope.$parent.normalFields = ['nome','tipo','nascimento'];
    scope.$parent.attributes = [{name: 'nome', type: 'string'}, {name: 'tipo', type: 'boolean'}, {name: 'nascimento', type: 'date'}];
    var element =
    angular.element(
      '<gumga-advanced-search></gumga-advanced-search> ');
    var template = ($compile(element)(scope)).html();

  }));

  it('Should initialize the values',function(){
    expect(scope.isPanelOpen).toBe(false);
    expect(scope.selectHQL).toBe(false);
    expect(scope.attributes.length).toBeGreaterThan(0);
    expect(scope.hqlOpts.length).toEqual(0);
    expect(scope.queries.length).toEqual(0);

  });

  it('Should clean the query and set selectAttribute to true',function(){
    spyOn(scope, 'isPanelOpen');
    scope.queries = [ 'Maria', 'João'];
    scope.query = {nome: 'Juca' };

    scope.isPanelOpen = false;

    scope.$digest();

    expect(scope.queries.length).toEqual(0);
    expect(scope.query).toEqual({});

  });

  it('Should clean the query and all the queries',function(){
    spyOn(scope, 'isPanelOpen');
    scope.isPanelOpen = true;

    scope.$digest();

    expect(scope.selectAttribute).toBeTruthy();
    expect(scope.query).toEqual({});
  });

  it('Should remove an element from array if \'deletepls\' was emitted',function(){
    scope.queries = [ 'Maria', 'João'];
    rootScope.$broadcast('deletepls','Maria');
    expect(scope.queries.length).toEqual(1);

  });

  describe('When i call AttributeHasChanged',function(){
    it('Should get the correct options',function(){
      var attribute = {name: 'nome', type: 'string'};
      scope.query = {};
      scope.attributeHasChanged(attribute);
      expect(scope.query.attribute).toEqual({name: 'nome', type: 'string'});
      expect(scope.typeInput).toEqual('text');
      scope.hqlOpts = GumgaSearchHelper.getTypeListOfHQLPossibilities('string');
      expect(scope.hqlOpts.length).toEqual(8);
      expect(scope.selectHQL).toBe(true);
    });
  });

  describe('When i call handleHqlOption',function(){
    it('Should fill scope.query.hql with the incoming value',function(){
      scope.query = {};
      scope.handleHqlOption( {hql: "eq", label: "igual"});
      expect(scope.query.hql).toEqual({hql: "eq", label: "igual"});
      expect(scope.selectHQl).toBeFalsy();
    })
  });

  describe('When i call addQuery',function(){
    it('Should push a query if the array is empty',function(){
      scope.queries = [];
      scope.query = {attribute:{name: "nome",type:"string"},hql:{hql: "eq", label: "igual"},value: "José"};
      scope.addQuery();
      expect(scope.queries.length).toEqual(1);
      expect(scope.typeInput).toBe('text');
      expect(scope.query).toEqual({});
    })
  });


  describe('When i call showArray',function(){
    it('Should emit advanced',function(){
      spyOn(scope, '$emit');
      var arr_ = [
      {
        attribute: {
          name: 'descricao',
          type: 'string'
        },
        hql: {
          after: "'",
          before: "='",
          hql: "eq",
          label: "igual"
        },
        value: "josualdo"
      }
      ];
      scope.showArray(arr_);
      expect(scope.$emit).toHaveBeenCalledWith('advanced', {hql:GumgaSearchHelper.translateArrayToHQL(arr_),source: arr_});
      console.log(JSON.stringify(arr_));
      expect(scope.isPanelOpen).toBe(false);
    })
  });

  describe('When i call doSearch',function(){
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
})
