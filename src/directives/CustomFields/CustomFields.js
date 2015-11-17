(function(){
  'use strict';

  CustomFields.$inject = [];
  function CustomFields(){
    return{
      restrict: 'E',
      scope: {
        fields: '='
      },
      bindToController: true,
      controller: ['$scope','$element','$attrs', '$http', '$compile', function($scope, $element, $attrs, $http, $compile) {
        let ctrl = this;
        if (!ctrl.fields) throw 'O componente gumgaCustomFields requer o escopo populado com os fields para geração do template.';

        angular.forEach(ctrl.fields.gumgaCustomFields, (v) => {
          if (angular.isString(v.field.options) && v.field.type == 'SELECTION' && v.field.options.charAt(0) == '[') {
            v.field.selection = JSON.parse(v.field.options);
          } else {
              $http.get(v.field.options).then((response) => {
                v.field.selection = response.data[v.field.optionsCollection];
                v.field.selection.forEach((b) => b[v.field.optionValueField] = b[v.field.optionValueField].toString());
              }, (error) => {
                console.error(error);
              });
          }
        });

        let template = `
        <div class="row" ng-if="f.field.active" ng-repeat="f in ctrl.fields.gumgaCustomFields">
          <div class="col-md-12">
           <label ng-bind="f.field.name" gumga-translate-tag="f.field.translateKey"></label>
           <div ng-switch="f.field.type" class="form-group">
             <div ng-switch-when="TEXT">
               <input type="text" ng-model="f.textValue" class="form-control" />
             </div>
             <div ng-switch-when="NUMBER">
               <input type="number" ng-model="f.numberValue" class="form-control" />
             </div>
             <div ng-switch-when="DATE">
               <input type="text" ng-model="f.dateValue" class="form-control" datepicker-popup="fullDate" is-open="opened" ng-click="opened = !opened" />
             </div>
             <div ng-switch-when="SELECTION">
               <select ng-options="opt[f.field.optionValueField] as opt[f.field.optionLabelField] for opt in f.field.selection" ng-model="f.textValue" class="form-control"></select>
             </div>
             <div ng-switch-when="LOGIC">
               <button type="button" class="btn" ng-class="{'btn-success': f.logicValue, 'btn-default': !f.logicValue}" ng-model="f.logicValue" btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">
                 {{(f.logicValue) ? "On" : "Off" }}
               </button>
             </div>
           </div>
         </div>
        </div>
        `;
        $element.append($compile(template)($scope));
      }],
      controllerAs: 'ctrl',
    }
  }

  angular.module('gumga.directives.customfields', [])
  .directive('gumgaCustomFields', CustomFields);

})();
