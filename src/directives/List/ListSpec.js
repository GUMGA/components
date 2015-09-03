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
        scope.configz = {};
        scope.configz.columns = 'name,age,profession,hasDog';
        var element = angular.element('<gumga-list data="arrayList" configuration="configz" sort="sort(field,dir)"></gumga-list>');
        $compile(element)(scope);
        controller = element.controller('gumgaList');
        scope.sort = function(field,dir){};
        spyOn(scope,'sort');
      }
    )
  )
  describe('Passing data to the component:',function(){
    it('should get all the needed configuration',function(){
      expect(controller.config.selection).toEqual('single');
      expect(controller.config.sortDefault).toEqual(undefined);
      expect(controller.config.itemsPerPage).toEqual([10,20,30,40,50]);
      expect(controller.config.conditional).toEqual(angular.noop);
      expect(controller.config.sort).toEqual(angular.noop);
      expect(controller.config.onClick).toEqual(angular.noop);
      expect(controller.config.onDoubleClick).toEqual(angular.noop);
      expect(controller.config.onSort).toEqual(angular.noop);
      expect(controller.config.columns[0]).toEqual({
        content: '<input name="__checkbox" type="checkbox" ng-model="$value.__checked"/>',
        name: '__checkbox',
        size: 'col-md-1',
        sortField: null,
        title: '<label><input type="checkbox" ng-model="vm.checkAll" ng-change="vm.selectAll(vm.checkAll)"/><strong ><small>Selecionar Todos</small></strong></label>',
        conditional: angular.noop
      })
      expect(controller.config.columns[1]).toEqual({
        conditional: angular.noop,
        content: '{{$value.name}}',
        name: 'name',
        size: '',
        sortField: null,
        title: 'NAME'
      })
      expect(controller.config.columns[2]).toEqual({
        conditional: angular.noop,
        content: '{{$value.age}}',
        name: 'age',
        size: '',
        sortField: null,
        title: 'AGE'
      })
      expect(controller.config.columns[3]).toEqual({
        conditional: angular.noop,
        content: '{{$value.profession}}',
        name: 'profession',
        size: '',
        sortField: null,
        title: 'PROFESSION'
      })
      expect(controller.config.columns[4]).toEqual({
        conditional: angular.noop,
        content: '{{$value.hasDog}}',
        name: 'hasDog',
        size: '',
        sortField: null,
        title: 'HASDOG'
      })
    });
  })

  describe('Testing functions',function(){
    it('Should select every item',function(){
      scope.selectedValues.push({name: 'oi'});
      scope.selectedValues.push({name: 'io'});
      scope.selectedValues.push({name: 'oiio'});
      controller.selectedIndexes.push(0);
      controller.selectedIndexes.push(1);
      controller.selectedIndexes.push(2);
      controller.selectAll(false);
      expect(controller.selectedIndexes.length).toEqual(0);
      expect(scope.selectedValues.length).toEqual(0);
      controller.data.forEach(function(val){
        expect(val.__checked).toBeFalsy();
      })
    })

    it('Should call outer sort',function(){
      controller.sortProxy('name','asc');
      expect(scope.sort).toHaveBeenCalledWith('name','asc');
      controller.sortProxy('name','desc');
      expect(scope.sort).toHaveBeenCalledWith('name','desc');
    })

    it('Should select only one row at time',function(){
      controller.selectRow(0,controller.data[0],{target: {}});
      delete controller.data[0].__checked;
      expect(scope.selectedValues[0]).toEqual(controller.data[0]);
      expect(controller.selectedIndexes[0]).toEqual(0);
      controller.selectRow(1,controller.data[1],{target: {}});
      expect(controller.selectedIndexes[0]).toEqual(1);
      delete controller.data[1].__checked;
      expect(scope.selectedValues[0]).toEqual(controller.data[1]);
    })


    it('Should select more than one row at time',function(){
      controller.config.selection = 'multi';
      controller.selectRow(0,controller.data[0],{target: {}});
      controller.selectRow(1,controller.data[1],{target: {}});
      controller.selectRow(4,controller.data[4],{target: {}});
      expect(controller.selectedIndexes[0]).toEqual(0);
      expect(controller.selectedIndexes[1]).toEqual(1);
      expect(controller.selectedIndexes[2]).toEqual(4);
    })

  })


})
