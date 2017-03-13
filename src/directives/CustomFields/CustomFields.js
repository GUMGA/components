(function(){
  'use strict';

  CustomFields.$inject = [];
  function CustomFields(){
    return{
      restrict: 'E',
      scope: {
        fields: '=',
        useLabels: '?='
      },
      bindToController: true,
      controller: ['$scope','$element','$attrs', '$http', '$compile','$filter', function($scope, $element, $attrs, $http, $compile, $filter) {
        let ctrl = this;
        ctrl.open = function() {
          ctrl.isDatePickerOpen = !ctrl.isDatePickerOpen
        }
        setTimeout(function() {
          if (!ctrl.fields) throw 'O componente gumgaCustomFields requer o escopo populado com os fields para geração do template.'

          angular.forEach(ctrl.fields.gumgaCustomFields, (v) => {
            if (
              angular.isString(v.field.options) &&
              v.field.type == 'SELECTION' &&
              v.field.options.charAt(0) == '['
            ) {
              v.field.selection = JSON.parse(v.field.options)
            } else if (
              angular.isString(v.field.options) &&
              v.field.type == 'SELECTION' &&
              v.field.options.charAt(0) != '['
            ) {
              $http.get(v.field.options).then((response) => {
                v.field.selection = response.data[v.field.optionsCollection]
                v.field.selection.forEach(
                  b => b[v.field.optionValueField] = b[v.field.optionValueField].toString()
                )
              }, (error) => {
                console.error(error);
              });
            }
            if (v.field.type == 'DATE') {
              v.dateValue = new Date(v.dateValue)
              $scope.$apply()
            }
          })
        }, 500)

        let template = `
        <div class="row" ng-if="f.field.active" ng-repeat="f in ctrl.fields.gumgaCustomFields">
          <div class="col-md-12">
            <label ng-bind="f.field.name" ng-if="!ctrl.useLabels" gumga-translate-tag="f.field.translateKey"></label>
            <label ng-if="ctrl.useLabels">{{f.field.translateKey}}</label>
            <div ng-switch="f.field.type" class="form-group">
              <div ng-switch-when="TEXT">
                <input type="text" ng-model="f.textValue" class="form-control" />
              </div>
              <div ng-switch-when="NUMBER">
                <input type="number" ng-model="f.numberValue" class="form-control" />
              </div>
              <div ng-switch-when="DATE">
                <p class="input-group">
                  <input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="f.dateValue" is-open="ctrl.isDatePickerOpen"/>
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-default" ng-click="ctrl.open()">
                      <i class="glyphicon glyphicon-calendar"></i>
                    </button>
                  </span>
                </p>
              </div>
              <div ng-switch-when="SELECTION">
                <select ng-options="opt[f.field.optionValueField] as opt[f.field.optionLabelField] for opt in f.field.selection" ng-model="f.textValue" class="form-control"></select>
              </div>
              <div ng-switch-when="LOGIC">
                <button type="button" class="btn" ng-class="{'btn-success': f.logicValue, 'btn-default': !f.logicValue}" ng-model="f.logicValue" uib-btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">
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
