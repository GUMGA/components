(function(){
    'use strict'

    Filter.$inject = ['HQLFactory','$compile','$timeout']
    function Filter(HQLFactory,$compile, $timeout) {
        let template = `
        <div class="gumga-filter panel panel-default" ng-show="isOpen">
            <header class="panel-heading" style="padding: 8px 15px">
                <div class="row">
                    <div class="col-md-6">
                        <h4 style="margin: 8px 0">Busca avançada</h4>
                    </div>
                    <div class="col-md-6">

                        <div class="input-group" ng-init="saveFilterOpen = false">
                            <input type="text" class="form-control" aria-label="..." ng-show="saveFilterOpen">
                            <div class="input-group-btn">
                                <button class="btn btn-default" ng-show="saveFilterOpen" ng-click="saveFilterOpen = !saveFilterOpen">
                                    <i class="glyphicon glyphicon-floppy-saved"></i>
                                </button>
                                <button class="btn btn-default" ng-show="saveFilterOpen" ng-click="saveFilterOpen = !saveFilterOpen">
                                    <i class="glyphicon glyphicon-floppy-remove"></i>
                                </button>
                                <button class="btn btn-default pull-right" type="button" ng-show="!saveFilterOpen" ng-click="saveFilterOpen = !saveFilterOpen">
                                    <i class="glyphicon glyphicon-floppy-disk"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="form-inline panel-body">
                
                <div class="input-group" ng-repeat="($key, $value) in controlMap" style="margin-right: 1%" ng-show="$value.active">

                    <div class="input-group-btn">
                        <div class="btn-group" uib-dropdown ng-show="!$value.label" id="_btnAttribute{{$key}}">
                            <button type="button" class="btn btn-default" uib-dropdown-toggle >
                                <span id="_btn{{$key}}"> {{ $value.query.attribute.label || 'Atributo' }} </span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="attribute in attributes track by $index">
                                    <a ng-click="addAttribute($key, attribute)">{{attribute.label}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="btn-group hidden" uib-dropdown  id="_btnCondition{{$key}}" ng-show="!$value.label">
                            <button type="button" class="btn btn-default" uib-dropdown-toggle>
                                <span id="_conditionLabel{{$key}}">{{ $value.query.condition.label || 'Condição' }}</span>
                                
                            </button>

                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="condition in conditions">
                                    <a ng-click="addCondition($key, condition)">{{condition.label}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="btn-group hidden" uib-dropdown id="_btnValue{{$key}}" ng-show="!$value.label">
                            <button type="button" class="btn btn-default" uib-dropdown-toggle>
                                <span> {{ $value.query.value || 'Valor' }} </span>
                            </button>
                            <div uib-dropdown-menu role="panel" class="panel panel-default" style="width: auto" ng-click="$event.preventDefault()">
                                <div class="panel-body" id="_panel{{$key}}">
                                  
                                </div>
                            </div>
                        </div>

                        <div class="btn-group" ng-show="$value.label">
                          <button type="button" class="btn btn-default" ng-click="updateOperator($key)">
                            <span id="__operator{{$key}}"> {{$value.label}} </span>
                          </button>
                        </div>

                        <button type="button" class="btn btn-default" ng-click="removeQuery($index)" ng-show="!$value.label"> 
                            <span class="glyphicon glyphicon-remove"></span>
                        </button>

                    </div>

                </div>

                <button id="single-button" type="button" class="btn btn-default" ng-click="addQuery()">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        </div>`

        return {
            restrict: 'E',
            template: template,
            transclude: true,
            scope : {
                isOpen: '@'
            },
            link: ($scope, $element, $attrs, $ctrl, $transclude) => {
              const FIELD_ERR = `É necessário atribuir um valor ao atributo FIELD da tag ADVANCED-SEARCH-FIELD.`,
                    TYPE_ERR  = `O tipo "{1}" passado como parâmetro para o ADVANCED-SEARCH-FIELD não é suportado.`

              $scope.attributes             = []
              $scope.conditions             = []
              $scope.controlMap             = {}
              $scope.control                = {}
              $scope.addAttribute           = addAttribute
              $scope.addCondition           = addCondition
              $scope.addQuery               = addQuery
              $scope.updateOperator         = updateOperator
              $scope.lastAddedQueryIndex    = Infinity
              $scope.removeQuery            = removeQuery

              $transclude((transcludeElement) => {
                [].slice.call(transcludeElement).forEach((value, $index) => {
                  if(value.nodeName !== 'ADVANCED-SEARCH-FIELD') return

                  let field = value.getAttribute('field'),
                      type  = value.getAttribute('type'),
                      label = value.getAttribute('label')

                  if(!field) {
                    console.error(FIELD_ERR)
                    return
                  }

                  type  = type.toLowerCase().trim() || ''
                  label = label                     || field.charAt(0).toUpperCase() + field.slice(1) 

                  if(!HQLFactory.useType(type)){
                    console.error(TYPE_ERR.replace('{1}', type))
                    return
                  }

                  $scope.attributes.push({ field, type, label })
                })
              })

              let defaultAttribute  = angular.copy($scope.attributes[0]),
                  defaultCondition  = angular.copy(HQLFactory.useType($scope.attributes[0].type).defaultCondition)[0]

              $scope.controlMap['0'] = { query: { attribute: defaultAttribute, condition: defaultCondition, value: '' }, active: true }

              const getElm            = (key) => (angular.element(document.getElementById(key)))
              const openAttribute     = (index) => (getElm(`_btnAttribute${index}`)).addClass('open')
              const removeAttribute   = (index) => (getElm(`_btnAttribute${index}`)).removeClass('open')
              const showCondition     = (index) => (getElm(`_btnCondition${index}`).removeClass('hidden'))
              const openCondition     = (index) => (getElm(`_btnCondition${index}`).addClass('open'))
              const hasClassCondition = (index) => (getElm(`_btnCondition${index}`).hasClass('hidden'))
              const openValue         = (index) => (getElm(`_btnValue${index}`).addClass('open'))
              const showValue         = (index) => (getElm(`_btnValue${index}`).removeClass('hidden'))
              const isEven            = (n) => (n % 2 == 0)            
             
              $timeout(() => {
                showCondition(0)
                showValue(0)
                openValue(0)
                let hqlType = HQLFactory.useType($scope.controlMap['0'].query.attribute.type);
                $scope.conditions = hqlType.conditions
                $scope.lastAddedQueryIndex = 0
                replacePanelContent(0, hqlType.template)
              })
              
              function addAttribute(index, selectedAttribute){
                if(!$scope.controlMap[index].attribute)
                  $scope.controlMap[index].attribute = {}

                $scope.controlMap[index].attribute = selectedAttribute
                removeAttribute(index)
                getElm(`_btn${index}`).html(selectedAttribute.label)

                if(hasClassCondition(index, 'hidden')){
                  showCondition(index)
                } 
                openCondition(index)

                let hqlType = HQLFactory.useType(selectedAttribute.type);

                $scope.conditions = hqlType.conditions;

                replacePanelContent(index, hqlType.template)
              }

              function addCondition(index, selectedCondition){
                if(!$scope.controlMap[index].condition) $scope.controlMap[index].condition = {}

                $scope.controlMap[index].condition = selectedCondition

                getElm(`_conditionLabel${index}`).html(selectedCondition.label)
                getElm(`_btnCondition${index}`).removeClass('open')

                showValue(index)
                openValue(index)

              }

              function addQuery(){
                if(isEven($scope.lastAddedQueryIndex)){
                  $scope.lastAddedQueryIndex++
                  $scope.controlMap[$scope.lastAddedQueryIndex] = { query: { value: 'AND' }, label: 'E', active: true }
                }

                $scope.lastAddedQueryIndex++
                $scope.controlMap[$scope.lastAddedQueryIndex] = { query: { attribute: {}, condition: {}, value: '' }, active: true }
              }

              function removeQuery(key){
                if(key == 0 && $scope.lastAddedQueryIndex === 0){
                  $scope.controlMap[key] = { query: { attribute: {}, condition: {}, value: '' }, active: true }
                  getElm(`_btn${key}`).html('Atributo')
                  getElm(`_conditionLabel${key}`).html('Condição')
                  openAttribute(key)
                  return;
                }
                if(key == 0){
                  $scope.controlMap[key].active = false
                  $scope.controlMap[key +1].active = false
                  return
                }
                if(isEven(key)) {
                  $scope.controlMap[key].active = false
                  $scope.controlMap[key-1].active = false
                }
              }

              function updateOperator(key){
                if($scope.controlMap[key].query.value === 'AND'){
                  $scope.controlMap[key].query.value = 'OR'
                  $scope.controlMap[key].label = 'OU'
                } else {
                  $scope.controlMap[key].query.value = 'AND'
                  $scope.controlMap[key].label = 'E'
                }
                getElm(`__operator${key}`).html($scope.controlMap[key].label)
              }

              function replacePanelContent(key, template){
                getElm(`_panel${key}`).html(template)
              }

            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory'])
    .directive('gumgaFilterCore', Filter)
})()
