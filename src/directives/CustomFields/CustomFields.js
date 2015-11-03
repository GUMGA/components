(function(){
  'use strict';

  CustomFields.$inject = ['$compile'];
  function CustomFields($compile){
    return{
      restrict: 'E',
      scope: {
        fields: '='
      },
      transclude: true,
      bindToController: true,
      controller: ['$scope','$element','$attrs', function($scope, $element, $attrs) {
        let ctrl = this;
        if (!ctrl.fields) throw 'O componente gumgaCustomFields requer o escopo populado com os fields para geração do template.';
        let template = [
          '<div class="row" ng-repeat="f in ctrl.fields.gumgaCustomFields">'
        , ' <div class="col-md-12">'
        , '   <label ng-bind="f.field.name" gumga-translate-tag="f.field.translateKey"></label>'
        , '   <div ng-switch="f.field.type" class="form-group">'
        , '     <div ng-switch-when="TEXT">'
        , '       <input type="text" ng-model="f.textValue" class="form-control" />'
        , '     </div>'
        , '     <div ng-switch-when="NUMBER">'
        , '       <input type="number" ng-model="f.numberValue" class="form-control" />'
        , '     </div>'
        , '     <div ng-switch-when="DATE">'
        , '       <input type="text" ng-model="f.dateValue" class="form-control" datepicker-popup="fullDate" is-open="opened" ng-click="opened= !opened" />'
        , '     </div>'
        , '     <div ng-switch-when="LOGIC">'
        , '       <button type="button" class="btn btn-primary" ng-model="cf.logicValue" btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">'
        , '         {{(cf.logicValue) ? "On" : "Off" }}'
        , '       </button>'
        , '     </div>'
        , '   </div>'
        , ' </div>'
        , '</div>'
        ];
        $element.append($compile(template.join('\n'))($scope));
      }],
      controllerAs: 'ctrl',
    }
  }

  angular.module('gumga.directives.customfields', [])
  .directive('gumgaCustomFields', CustomFields);

})();
