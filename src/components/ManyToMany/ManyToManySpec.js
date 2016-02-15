describe('DIRECTIVE: ManyToMany',function () {
  var scope
  ,   controller
  ,   $compile
  ,   simple = angular.element(`<gumga-many-to-many left-search="getData(value)" right-list="selectedItems" rigth-search-field="name">
                 <left-field>{{$value.name}}</left-field>
                 <right-field>{{$value.name}}</right-field>
                 </gumga-many-to-many>`)
  ,   simpleWithoutLeftAndRight = angular.element(`<gumga-many-to-many rigth-search-field="name">
                <left-field>{{$value.name}}</left-field>
                <right-field>{{$value.name}}</right-field>
                </gumga-many-to-many>`)
  ,   simpleWithMessages = angular.element(`<gumga-many-to-many left-search="getData(value)" right-list="selectedItems"
                                            text-heading-left="Itens disponiveis"
                                            text-heading-right="Itens selecionados"
                                            text-moveall-left="Mover todos para direita"
                                            text-moveall-right="Mover todos para esquerda"
                                            rigth-search-field="name">
                                            <left-field>{{$value.name}}</left-field>
                                            <right-field>{{$value.name}}</right-field>
                                            </gumga-many-to-many>`);

  const errorMessages = {
    noLeftSearch : 'You need to enter the parameter left-search.',
    noRightList  : 'You need to enter the parameter right-list.'

  };

  beforeEach(module('gumga.manytomany'));

  beforeEach(
    inject(
      function($rootScope,_$compile_){
        $compile  = _$compile_;
         let arrayData = [{
           "id": 2,
           "oi": null,
           "name": "Banco ABC Brasil S.A.",
           "number": "246"
         },
         {
           "id": 3,
           "oi": null,
           "name": "Banco ABN AMRO S.A.",
           "number": "075"
         },
         {
           "id": 4,
           "oi": null,
           "name": "Banco Alfa S.A.",
           "number": "025"
         },
         {
           "id": 5,
           "oi": null,
           "name": "Banco Alvorada S.A.",
           "number": "641"
         }];

         scope = $rootScope.$new();
         scope.getData = function(param){
           return arrayData.filter(function(obj){
             return obj.name.toLowerCase().indexOf(param.toLowerCase()) > -1;
           });
         }
        scope.selectedItems = [];
      }
    )
  )

  describe('Testing behavior',function(){
      it('Should receive a filtered array',function(){
        $compile(simple)(scope);
        controller = simple.controller('gumgaManyToMany');
        scope.$apply();
        expect(controller.leftList.length).toEqual(4);
        expect(controller.leftList[0].name).toEqual('Banco ABC Brasil S.A.');
      })

      it('Should add and remove item on the right',function(){
        controller.filterLeft('');
        scope.$apply();
        controller.removeOrAdd(controller.leftList, controller.rightList, controller.leftList[1], 1);
        expect(controller.rightList.length).toEqual(1);
        expect(controller.leftList.length).toEqual(3);
        controller.removeOrAdd(controller.rightList, controller.leftList, controller.rightList[0], 0);
        expect(controller.leftList.length).toEqual(4);
        expect(controller.rightList.length).toEqual(0);
      })

      it('should be when not inform message',function(){
        expect(controller.textHeadingLeft).toEqual('Available');
        expect(controller.textHeadingRight).toEqual('Selected');
        expect(controller.textMoveallLeft).toEqual('Move all items');
        expect(controller.textMoveallRight).toEqual('Move all items');
      });

  })

  describe('Testing erros',function(){
    it('Should console noLeftSearch and noRightList',function(){
      spyOn(console, 'error');
      expect(() => $compile(simpleWithoutLeftAndRight)(scope)).not.toThrow();
      expect(console.error).toHaveBeenCalledWith(errorMessages.noLeftSearch);
      expect(console.error).toHaveBeenCalledWith(errorMessages.noRightList);
    })
  })

  describe('Testing messages',function(){
    it('should be when inform message',function(){
      $compile(simpleWithMessages)(scope);
      controller = simpleWithMessages.controller('gumgaManyToMany');
      expect(controller.textHeadingLeft).toEqual('Itens disponiveis');
      expect(controller.textHeadingRight).toEqual('Itens selecionados');
      expect(controller.textMoveallLeft).toEqual('Mover todos para direita');
      expect(controller.textMoveallRight).toEqual('Mover todos para esquerda');
    })
  })
})
