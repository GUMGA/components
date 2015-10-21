describe('DIRECTIVE: GumgaListHelper',function(){
  var ListHelper = {}
  ,   config = {};

  beforeEach(module('gumga.services.listhelper'));

  beforeEach(
    inject(
      function(GumgaListHelper){
        ListHelper = GumgaListHelper;
      }
    )
  )
  it('should add $parent.$parent on the ng-click',function(){
    var _button = '<button type="button" ng-click="ok()">{{$value.name}}</button>'
    ,   _anchor = '<a ng-click="ok()" type="button">{{$value.name}}</a>'
    ,   randomContent = '{{$value.name}}';
    expect(ListHelper.contentWithoutParent(_button)).toEqual('<button type="button" ng-click="$parent.$parent.ok()">{{$value.name}}</button>');
    expect(ListHelper.contentWithoutParent(_anchor)).toEqual('<a ng-click="$parent.$parent.ok()" type="button">{{$value.name}}</a>');


  })



})
