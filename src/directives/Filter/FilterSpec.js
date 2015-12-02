describe('DIRECTIVE: GumgaFilter',function(){
  let scope;
  let isolatedScope;
  let template;
  let rootScope;

  beforeEach(module('gumga.directives.search.searchhelper'));
  beforeEach(module('gumga.directives.filter'));
  beforeEach(inject(($rootScope,$compile,_$document_) => {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    let element =
    angular.element(
      '<gumga-filter fields="name,idade,active" search="search()" on-search="onSearch()">'+
      '<advanced-field name="nome" type="string"></advanced-field>'+
      '<advanced-field name="idade" type="string"></advanced-field>'+
      '<advanced-field name="ativo" type="boolean"></advanced-field>'+
      '</gumga-filter> ');
    $compile(element)(scope);
    isolatedScope = element.isolateScope();
  }));
  it('Should initialize the values', () => {
    expect(isolatedScope.selectHQL).toBe(false);
    expect(isolatedScope.attributes.length).toBeGreaterThan(0);
    expect(isolatedScope.hqlOpts.length).toEqual(0);
    expect(isolatedScope.queries.length).toEqual(0);
  });

  it('Should add query', () => {
    isolatedScope.addQuery({"value":"Gui","attribute":{"name":"nome","type":"string","$$hashKey":"object:7"},"hql":{"hql":"eq","label":"igual","before":"='","after":"'","$$hashKey":"object:18"}});
    expect(isolatedScope.queries.length).toEqual(0);
  });
})
