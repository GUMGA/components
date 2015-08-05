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

  it('should create a new object called GumgaForm in the $scope',function(){
    expect(scope.GumgaForm).not.toBe(undefined);
  })

  it('should set the form valid',function(){
    scope.MyForm.name.$setPristine();
    scope.MyForm.age.$setViewValue(11);
    scope.MyForm.daywasborn.$setViewValue(new Date('Thu, 01 Jan 1970'));
    scope.GumgaForm.setFormValid();
    expect(scope.MyForm.$error).toEqual({});
  })

  it('should clean the form',function(){
    scope.MyForm.name.$setViewValue('Juquinha');
    scope.MyForm.age.$setViewValue(11);
    scope.MyForm.daywasborn.$setViewValue(new Date('Thu, 01 Jan 1970'));
    scope.GumgaForm.clearForm();
    scope.$digest();
    expect(scope.MyForm.name.$viewValue).toBeFalsy();
    expect(scope.MyForm.age.$viewValue).toBeFalsy();
    expect(scope.MyForm.daywasborn.$viewValue).toBeFalsy();
  })

  it('should set all the inputs to it\'s pristine mode',function(){
    scope.MyForm.name.$setViewValue('Juquinha');
    scope.MyForm.age.$setViewValue(11);
    scope.MyForm.daywasborn.$setViewValue(new Date('Thu, 01 Jan 1970'));
    expect(scope.MyForm.name.$pristine).toBeFalsy();
    expect(scope.MyForm.age.$pristine).toBeFalsy();
    expect(scope.MyForm.daywasborn.$pristine).toBeFalsy();
    scope.GumgaForm.setFormPristine();
    expect(scope.MyForm.name.$pristine).toBeTruthy();
    expect(scope.MyForm.age.$pristine).toBeTruthy();
    expect(scope.MyForm.daywasborn.$pristine).toBeTruthy();
  })

  it('Should get all the errors',function(){
    scope.MyForm.name.$setViewValue('Juquinha');
    scope.MyForm.age.$setViewValue(11);
    scope.MyForm.daywasborn.$setViewValue('');
    console.log(scope.MyForm.$error);
    console.log(scope.GumgaForm.getFormErrors());
  })

  it('Should get the default messages when i call the function',function(){
    var aux = scope.GumgaForm.getMessages('age');
    expect(aux.maxdate).toEqual("A data especificada ultrapassou o limite de: {1}.");


  })
})
