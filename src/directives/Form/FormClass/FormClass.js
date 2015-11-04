(function() {
  'use strict';

  FormClass.$inject = ['$compile'];

  function FormClass($compile) {

    function link($scope,$element,$attrs){
      if(!$attrs.gumgaFormClass) throw 'É necessário passar para a directive gumgaFormClass o nome do input com o qual ela está relacionada.'

      const isValidGreen = $element[0].outerHTML.split('\n')[0].indexOf('valid-green') != -1;

      let formName  = findParentRecursively('form',$element[0]).name,
          name      = $attrs.gumgaFormClass;

      function findParentRecursively(wanted, actual){
        if(actual.nodeName.toLowerCase() != wanted){
          return findParentRecursively(wanted, actual.parentNode);
        }
        return actual;
      }

      $scope
        .$watch(`${formName}.${name}.$invalid`, () => {
          try {
            if($scope[formName][name].$valid){
              $attrs.$set('class', isValidGreen ? 'form-group has-success' : 'form-group');
              return;
            }
            $attrs.$set('class', 'form-group has-error');
          } catch(e){
            console.error('O componente GumgaFormClass necessita que o nome passada como parâmetro seja igual ao nome do input.')
          }
        })

    }

    let ddo = {
      restrict: 'A',
      link,
      scope: false
    }

    return ddo;
  }

  angular.module('gumga.directives.form.class',[])
  .directive('gumgaFormClass', FormClass);

}());
