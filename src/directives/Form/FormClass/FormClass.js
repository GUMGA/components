(function() {
  'use strict';

  FormClass.$inject = [];

  function FormClass(){

    FormClassController.$inject = ['$scope', '$element', '$attrs'];

    function FormClassController($scope, $element, $attrs){
      const isAttribute     = !!$attrs.gumgaFormClass;
      const classWhenValid  = !!$attrs.validGreen ? 'form-group has-success' : 'form-group';
      let name = (isAttribute) ? $attrs.gumgaFormClass : $attrs.name;
      if(!name) throw isAttribute ? 'É necessário passar o nome do input como parâmetro para a directive.' : 'É necessário o atributo name, com o valor respectivo ao nome do input.';
      $scope.$on('_name', (ev, data) => (formName = data))


      let template = `{'form-group': ${formName}.idInClient.$pristine || BrandForm.idInClient.$valid,'form-group has-error': BrandForm.idInClient.$invalid}`

    }

    let ddo = {
     restrict: 'AE',
     controller: FormClassController,
     controllerAs: 'ctrl',
     require: '^gumgaForm',
     scope: false
   }

    return ddo;
  }


  angular.module('gumga.directives.form.class',[])
  .directive('gumgaFormClass', FormClass);

}());
