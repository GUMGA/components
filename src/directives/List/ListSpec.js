describe('DIRECTIVE: GumgaList',function () {
  var scope
  ,   controller;

  beforeEach(module('gumga.directives.list'));

  beforeEach(
    inject(
      function($rootScope,$compile){
        function getData(number){
          var names = ['João','Juca','Marcos','José','Amarildo','Wladnelson','Jefferson','Maria','Jacinto','Júlia','Carla','Maria Cláudia'];
          var surnames = ['Santana','Silva','Miranda','Souza','Santos','Pereira','Oliveira','Lima','Araújo','Ribeiro','Mendes','Barros','Pinto'];
          var professions = ['Padeiro','Açougueiro','Vendedor de coco','Carpinteiro','Professor de Tecnologia da Informação','Desempregado','Programador','Analsita de Testes', 'Analista de Aviões de Papel','Manufaturador de Aviões de Papel','Campeão do minicurso de Android','Jogador de Futebol']
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

        scope = $rootScope.$new();
        scope.arrayList = getData(100);
        var element = angular.element('<gumga-list></gumga-list>');
        $compile(element)(scope);
        controller = element.controller('gumgaList');
      }
    )
  )

  describe('Getting the right configs',function(){
    it('get the attribute configs ',function(){

    })
  })
})
