(function(){
    'use strict'

    Filter.$inject = ['HQLFactory','$compile','$timeout']
    function Filter(HQLFactory,$compile, $timeout) {
        let template = `
        <div class="gumga-filter panel panel-default" >
            <header class="panel-heading" style="padding: 5px 10px;">
                <div class="row">
                    <div class="col-md-8 col-xs-7">
                        <h5><strong>Busca avançada</strong></h5>
                    </div>
                    <div class="col-md-4 col-xs-5" ng-show="saveQuery">
                        <div class="input-group" >
                            <input type="text" ng-model="nameSearch" class="form-control" aria-label="..." id="_save" ng-show="saveFilterOpen" ng-keyup="saveSearch(nameSearch)" ng-blur="closeInput()">
                            <div class="input-group-btn">
                                <button class="btn btn-success" ng-show="saveFilterOpen" ng-click="saveSearch(nameSearch, $event)">
                                    <i class="glyphicon glyphicon-floppy-saved"></i>
                                </button>
                                <button class="btn btn-default pull-right" type="button" ng-hide="saveFilterOpen" ng-click="showInput()">
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
                                <li role="menuitem" ng-repeat="condition in conditions track by $index">
                                    <a ng-click="addCondition($key, condition)">{{condition.label}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="btn-group" id="_btnValue{{$key}}" ng-show="!$value.label">
                            <button type="button" class="btn btn-default" ng-click="togglePanelValue($key)">
                                <span id="_conditionLabel{{$key}}">{{ $value.query.value || 'valor' }}</span>
                            </button>
                            <div class="gumga-filter-panel" id="_panelValue{{$key}}"></div>
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
                search: '&',
                saveQuery: '&'
            },
            link: ($scope, $element, $attrs, $ctrl, $transclude) => {
              const FIELD_ERR   = `É necessário atribuir um valor ao atributo FIELD da tag ADVANCED-SEARCH-FIELD.`,
                    TYPE_ERR    = `O tipo "{1}" passado como parâmetro para o ADVANCED-SEARCH-FIELD não é suportado.`,
                    SEARCH_ERR  = `É necessário atribuir uma função para o atributo SEARCH. [search="foo()"]`

              $scope.attributes             = []
              $scope.conditions             = []
              $scope.controlMap             = {}
              $scope.control                = {}
              $scope.lastAddedQueryIndex    = Infinity
              
              $scope.addAttribute           = addAttribute
              $scope.addCondition           = addCondition
              $scope.addQuery               = addQuery
              $scope.closeInput             = closeInput
              $scope.removeQuery            = removeQuery
              $scope.togglePanelValue       = togglePanelValue
              $scope.closePanelValue        = closePanelValue
              $scope.closePanels            = closePanels
              $scope.showInput              = showInput 
              $scope.saveSearch             = saveSearch
              $scope.saveQuery              = $attrs.saveQuery  ?  $scope.saveQuery : null
              $scope.search                 = $attrs.search     ?     $scope.search : null
              $scope.updateOperator         = updateOperator

              if(!$scope.search) console.error(SEARCH_ERR)

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
                //   console.log(HQLFactory.useType(type));
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
              
              function togglePanelValue(index){
                  getElm(`_panelValue${index}`).toggleClass('show')
              }
              
              function closePanelValue(index){
                  getElm(`_panelValue${index}`).removeClass('show')
              }
              
              function closePanels() {
                  let panels = document.querySelectorAll('.gumga-filter-panel')
                  for (var i = 0; i < panels.length; i++) {
                      let panel = angular.element(panels[i])
                      if (panel.hasClass('show')) panel.removeClass('show')
                  }
              }
              
              document.addEventListener('click', (e) => {
                let outerClick    = true,
                    distanceNodes = e.path.length
                for (var i = 0; i < distanceNodes; i++) {
                    if (e.path[i].nodeName == 'GUMGA-FILTER-CORE') outerClick = false;
                }
                
                if (outerClick && $scope.$value) {
                    console.log($scope.$value.query)
                    $scope.closePanels()
                }
              });
                            
              function addAttribute(index, selectedAttribute){
                if(!$scope.controlMap[index].query.attribute)
                  $scope.controlMap[index].query.attribute = {}

                $scope.controlMap[index].query.attribute = selectedAttribute
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
                if(!$scope.controlMap[index].query.condition) $scope.controlMap[index].query.condition = {}

                $scope.controlMap[index].query.condition = selectedCondition

                getElm(`_conditionLabel${index}`).html(selectedCondition.label)
                getElm(`_btnCondition${index}`).removeClass('open')

                showValue(index)
                openValue(index)
                togglePanelValue(index)
              }
              
              function addValue(index, value){
                  getElm(`_value${index}`).html(value);
              }

              function addQuery(){
                if(isEven($scope.lastAddedQueryIndex)){
                  $scope.lastAddedQueryIndex++
                  $scope.controlMap[$scope.lastAddedQueryIndex] = { query: { value: 'AND' }, label: 'E', active: true }
                }

                $scope.lastAddedQueryIndex++
                $scope.controlMap[$scope.lastAddedQueryIndex] = { query: { attribute: {}, condition: {}, value: '' }, active: true }
              }

              function closeInput(){
                $timeout(() => {
                  $scope.saveFilterOpen = false
                }, 200)
              }

              function showInput(){
                $scope.saveFilterOpen = true
                $timeout(() => document.getElementById('_save').focus())
              }

              function saveSearch(name, event){
                let query = HQLFactory.createHql($scope.controlMap).aqo

                $scope.saveQuery({ query, name })
              }

              function firstOfMap(){
                let first;
                Object.keys($scope.controlMap).forEach(value => {
                  if(!first && $scope.controlMap[value].active){
                    first = value
                  }
                })
                return first
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

                if(!isEven(firstOfMap()))
                  $scope.controlMap[firstOfMap()].active = false

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
                $compile(getElm(`_panelValue${key}`).html(template).contents())($scope)
              }

              $scope.$watch('controlMap', (newVal, oldVal) => console.log(HQLFactory.createHql(newVal)), true)

            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory'])
    .directive('gumgaFilterCore', Filter)
})()
