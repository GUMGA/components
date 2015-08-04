describe("DIRECTIVE: GumgaForm",function(){
  var scope
  ,   controller
  ,   $timeout
      fields = [
    {
      field: 'name',
      type: 'text',
      validation:{
        required: true,
        "gumga-min-length": 5
      }
    },
    {
      field: 'age',
      type: 'number',
      validation:{
        "gumga-min-number": 0,
        "gumga-max-number": 10
      }
    },
    {
      field: 'daywasborn',
      type: 'date',
      validation:{
        required: true
      }
    }
  ];
  beforeEach(module('gumga.directives.form'));
  beforeEach(
    inject(
      function($rootScope,$compile,_$timeout_){
        $timeout = _$timeout_;
        scope = $rootScope.$new();
        scope.user = {};
        var template = fields.reduce(function(previous,next,index){
          var _aux = ' ';
          if(next.validation){
            for(var key in next.validation) if(next.validation.hasOwnProperty(key)){
              if (key == 'required'){
                _aux+= 'gumga-required '
              } else {
                _aux += key + '="' + next.validation[key] + '"';
              }
            }
          }
          return previous + '\t<input type="' + next.type + '" name="' + next.field  + '" ng-model="user.' + next.field + '"' + _aux + '/>\n'
        },'\n<form name="MyForm" novalidate gumga-form>\n');
        template += '</form>'
        $compile(angular.element(template))(scope);
        scope.$digest();
      }
    )
  )
  it('clearForm',function(){
    scope.MyForm.name.$setPristine();
    scope.MyForm.age.$setViewValue(11);
    scope.MyForm.daywasborn.$setViewValue(new Date('Thu, 01 Jan 1970'));
    scope.clearForm();
    expect(scope.MyForm.$error).toEqual({});
  })
})
