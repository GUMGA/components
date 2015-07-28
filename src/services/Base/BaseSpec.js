describe("SERVICE: GumgaBase", function () {
  var $httpBackend
  ,   GumgaBase
  ,   httpResponse
  ,   httpIdResponse
  ,   httpNewResponse
  ,   array
  ,   baseUrl = 'http://www.gumga.com.br/api'
  ,   flush = function(){
        $httpBackend.flush();
      };




  beforeEach(module('gumga.services.base'));
  beforeEach(inject(function(_$httpBackend_,_GumgaBase_){
    $httpBackend = _$httpBackend_;
    GumgaBase = _GumgaBase_;

    function getData(number){
      var names = ['João','Juca','Marcos','José','Amarildo','Wladnelson','Jefferson','Maria','Jacinto','Júlia','Carla','Maria Cláudia'];
      var surnames = ['Santana','Silva','Miranda','Souza','Santos','Pereira','Oliveira','Lima','Araújo','Ribeiro','Mendes','Barros','Pinto'];
      var professions = ['Padeiro','Açougueiro','Vendedor de coco','Carpinteiro','Professor de Tecnologia da Informação','Vagabundo','Programador','Analsita de Testes', 'Analista de Aviões de Papel','Manufaturador de Aviões de Papel','Campeão do Gumga Ball','Jogador de Futebol']
      var _data = [];
      function isEven(number){ return number % 2 == 0}
      for(var i = 0; i < number;i++){
        _data.push({
          name: names[Math.floor(Math.random()*names.length)] + ' ' + surnames[Math.floor(Math.random()*surnames.length)],
          age: Math.floor(Math.random()*50),
          profession: professions[Math.floor(Math.random()*professions.length)],
          hasDog: isEven(Math.floor(Math.random()*4))
        })
      }
      return _data;
    }

    function getOne() {
      return getData(25)[Math.floor(Math.random()*25)];
    }

    httpResponse = {pageSize: 10,count: 25,start: 0,values: getData(25)};
    httpIdResponse = {pageSize: 10, count: 1, start: 0,values: getOne()};
    httpNewResponse = {name: null, age: null, profession: null, hasDog: false}
    $httpBackend.when('GET','http://www.gumga.com.br/api').respond(httpResponse);
    $httpBackend.when('GET','http://www.gumga.com.br/api/2').respond(httpIdResponse);
    $httpBackend.when('GET','http://www.gumga.com.br/api/new').respond(httpNewResponse);
    $httpBackend.when('DELETE','http://www.gumga.com.br/api/2').respond('Entity deleted successfully');
    $httpBackend.when('POST','http://www.gumga.com.br/api').respond('Entity saved successfully');
    $httpBackend.when('PUT','http://www.gumga.com.br/api/0').respond('Entity updated successfully');
    $httpBackend.when('POST','http://www.gumga.com.br/api/image/').respond('KSODMAISDJAOA');
    $httpBackend.when('DELETE','http://www.gumga.com.br/api/image/KSODMAISDJAOA').respond('Image deleted successfully');
  }))

  it('Should call GumgaBase.get(), execute a get and return the right value',function () {
    var aux = GumgaBase.get(baseUrl);
    flush();
    expect(aux.$$state.value.data).toEqual(httpResponse);
  })
  it('Should call GumgaBase.getById(), execute a get and return the right value',function () {
    var aux = GumgaBase.getById(baseUrl,2);
    flush();
    expect(aux.$$state.value.data).toEqual(httpIdResponse);
  })
  it("Should call GumgaBase.getNew(), execute a get and return the right value", function () {
    var aux = GumgaBase.getNew(baseUrl);
    flush();
    expect(aux.$$state.value.data).toEqual(httpNewResponse);
  });
  it("Should call GumgaBase.deleteAll(), execute a delete and return the right value", function () {
    var aux = GumgaBase.deleteAll(baseUrl,[{id:2}]);
    flush();
    expect(aux.$$state.value[0].data).toEqual('Entity deleted successfully');
  });
  it("Should call GumgaBase.save(), execute a save and return the right value", function () {
    var aux = GumgaBase.save(baseUrl,{name: 'Juca'});
    flush();
    expect(aux.$$state.value.data).toEqual('Entity saved successfully');
  });
  it("Should call GumgaBase.update(), execute a update and return the right value", function () {
    var aux = GumgaBase.update(baseUrl,{id: 0, name: 'Juca'});
    flush();
    expect(aux.$$state.value.data).toEqual('Entity updated successfully');
  });
  it("Should call GumgaBase.del(), execute a delete and return the right value", function () {
    var aux = GumgaBase.del(baseUrl,{id: 2});
    flush();
    expect(aux.$$state.value.data).toEqual('Entity deleted successfully');
  });
  it("Should call GumgaBase.postImage(), execute a post and return the right value", function () {
    var aux = GumgaBase.postImage(baseUrl,'image','1H1UHHUSD1UH2UH1U2H3');
    flush();
    expect(aux.$$state.value.data).toEqual('KSODMAISDJAOA');
  });
  it("Should call GumgaBase.deleteImage(), execute a delete and return the right value", function () {
    var aux = GumgaBase.deleteImage(baseUrl,'image','KSODMAISDJAOA');
    flush();
    expect(aux.$$state.value.data).toEqual('Image deleted successfully');
  });
});
