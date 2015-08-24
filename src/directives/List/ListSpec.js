describe('DIRECTIVE: GumgaList',function () {
  var scope
  ,   controller
  ,   columns
  ,   isHex = '/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/';
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
        columns = Object.keys(scope.arrayList[0]).map(function(key,$index){
          return {
            title: key.toUpperCase(),
            size: 'col-md-3',
            ordering:($index),
            content: '{{$value.'+key+'}}',
            sortable: null,
            conditional: angular.noop
          }
        })
        scope.configz = {};
        scope.configz.columns = [{
            title: 'Idade do Usuário',
            size: 'col-md-3',
            ordering: 1,
            content: '{{$value.age | lowercase}}',
            conditional: function($value){
              return {
                '#ff0000': $value.age < 18,
                '#009e2f': $value.age >=18
              }
            }},
          {
            title: 'Nome do Usuário',
            content: '{{$value.name}}',
            ordering: 0,
            sortField: 'name'
          }];
        var element = angular.element('<gumga-list data="arrayList" configuration="configz"</gumga-list>');
        $compile(element)(scope);
        controller = element.controller('gumgaList');
      }
    )
  )
  describe('Passing data to the component:',function(){
    it('should get all the needed configuration',function(){
      expect(controller.config.selection).toEqual('single');
      expect(controller.config.itemsPerPage).toEqual(10);
      expect(controller.config.sortDefault).toEqual(0);
      expect(controller.config.selectedValues).toEqual([]);
      expect(controller.config.conditional).toEqual(angular.noop);
      expect(controller.config.sort).toEqual(angular.noop);
      expect(controller.config.class).toEqual('table');
      expect(controller.config.onClick).toEqual(angular.noop);
      expect(controller.config.onDoubleClick).toEqual(angular.noop);
      expect(controller.config.onSort).toEqual(angular.noop);
      expect(JSON.stringify(controller.config.columns[2])).toEqual(JSON.stringify({title: 'Idade do Usuário',size: 'col-md-3',ordering: 1, content: '{{$value.age | lowercase}}',sortField: null,
        conditional: function($value){
          return {
            '#ff0000': $value.age < 18,
            '#009e2f': $value.age >=18
          }
        }
      }));
      expect(JSON.stringify(controller.config.columns[1])).toEqual(JSON.stringify({
        title: 'Nome do Usuário',
        size: '',
        ordering: 0,
        content: '{{$value.name}}',
        sortField: 'name',
        conditional: angular.noop
      }))
    });
  })

  describe('Testing functions',function(){
    it('should change the array when i click on a registry',function(){
      controller.selectRow(0,scope.arrayList[20]);
      controller.selectRow(1,scope.arrayList[11]);
      controller.selectRow(2,scope.arrayList[7]);
      controller.selectRow(3,scope.arrayList[3]);
      expect(scope.selectedValues[0]).toEqual(scope.arrayList[20]);
      expect(scope.selectedValues[1]).toEqual(scope.arrayList[11]);
      expect(scope.selectedValues[2]).toEqual(scope.arrayList[7]);
      expect(scope.selectedValues[3]).toEqual(scope.arrayList[3]);
      controller.selectRow(0,scope.arrayList[20]);
      expect(scope.selectedValues.length).toEqual(3);
      expect(scope.selectedValues[0]).toEqual(scope.arrayList[11]);
      expect(scope.selectedValues[1]).toEqual(scope.arrayList[7]);
      expect(scope.selectedValues[2]).toEqual(scope.arrayList[3]);
    })
  })
})
