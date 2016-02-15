(function(){
    'use strict'

    Filter.$inject = ['HQLFactory','$compile','$timeout', '$interpolate', 'QueryModelFactory']
    function Filter(HQLFactory,$compile, $timeout, $interpolate, QueryModelFactory) {
        let template = `
        <div class="gumga-filter panel panel-default" >
            <header class="panel-heading" style="padding: 5px 10px;">
                <div class="row">
                    <div class="col-md-8 col-xs-7">
                        <h5><strong>Busca avançada</strong></h5>
                    </div>
                    <div class="col-md-4 col-xs-5" ng-show="saveQuery">
                        <div class="input-group" >
                            <input type="text" ng-model="nameSearch" class="form-control" id="_save" ng-show="saveFilterOpen" ng-keyup="saveSearch(nameSearch)" ng-blur="closeInput()">
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
                        <div class="btn-group" uib-dropdown ng-show="!$value.query.label" is-open="$value.isUPDATING_ATTRIBUTE()">
                            <button type="button" style="z-index: 0" class="btn btn-default" uib-dropdown-toggle ng-click="toggleUpdatingAttribute(this)">
                                <span> {{ $value.query.attribute.label || 'Atributo' }} </span>
                            </button>
                            <ul uib-dropdown-menu style="z-index: 3000" role="menu">
                                <li style="z-index: 3000;" role="menuitem" ng-repeat="attribute in _attributes track by $index">
                                    <a ng-click="addAttribute(attribute, this.$parent, $key)">{{attribute.label}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="btn-group" uib-dropdown is-open="$value.isUPDATING_CONDITION()" ng-show="!$value.query.label">
                            <button type="button" class="btn btn-default" uib-dropdown-toggle ng-click="toggleUpdatingCondition(this)">
                                <span>{{ $value.query.condition.label || 'Condição' }}</span>
                            </button>

                            <ul uib-dropdown-menu role="menu">
                                <li role="menuitem" ng-repeat="condition in conditions track by $index">
                                    <a ng-click="addCondition(condition, this.$parent, $key)">{{condition.label}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="btn-group" id="_btnValue{{$key}}" ng-show="!$value.query.label">
                            <button type="button" class="btn btn-default" ng-click="toggleUpdatingValue(this, $key)" ng-disabled="!($value.isEVERYTHING_NEEDED() || !$value.isATTRIBUTE_AND_CONDITION())">
                                <span id="_conditionLabel{{$key}}">{{ $value.query.value ? $value.query.value.push ?  $value.query.value.join(', ') : $value.query.value : 'valor' }} </span>
                            </button>
                            <div class="gumga-filter-panel" id="_panelValue{{$key}}">
                            </div>

                        </div>

                        <div class="btn-group" ng-show="$value.query.label">
                          <button type="button" class="btn btn-default" ng-click="updateOperator(this)">
                            <span> {{$value.query.label}} </span>
                          </button>

                        </div>
                        <button type="button" style="z-index: 0" class="btn btn-default" ng-click="removeQuery(this)" ng-show="!$value.query.label" ng-disabled="!$value.isEVERYTHING_NEEDED()">
                            <span class="glyphicon glyphicon-remove"></span>
                        </button>

                    </div>

                </div>

                <button id="single-button" type="button" class="btn btn-default" ng-click="addQuery()" ng-disabled="isAnyQueryNotOk()">
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
              const outerScope  = $scope.$parent.$parent
              const FIELD_ERR   = `É necessário atribuir um valor ao atributo FIELD da tag ADVANCED-SEARCH-FIELD.`,
                    TYPE_ERR    = `O tipo "{1}" passado como parâmetro para o ADVANCED-SEARCH-FIELD não é suportado.`,
                    NOTYPE_ERR  = `É necessário atribuir um valor ao atributo TYPE da tag ADVANCED-SEARCH-FIELD.`,
                    SEARCH_ERR  = `É necessário atribuir uma função para o atributo SEARCH. [search="foo()"]`

              $scope._attributes            = []
              $scope.conditions             = []
              $scope.controlMap             = {}
              $scope.control                = {}
              $scope.lastAddedQueryIndex    = Infinity
              $scope.updatingHql            = Infinity
              $scope.addCondition           = addCondition
              $scope.addQuery               = addQuery
              // $scope.closeInput             = closeInput
              $scope.removeQuery            = removeQuery
              // $scope.togglePanelValue       = togglePanelValue
              // $scope.closePanelValue        = closePanelValue
              // $scope.closePanels            = closePanels
              // $scope.showInput              = showInput
              $scope.saveSearch             = saveSearch
              $scope.saveQuery              = $attrs.saveQuery  ?  $scope.$parent.proxySave : null
              $scope.updateOperator         = updateOperator
              // $scope.toggleEnum             = toggleEnum


              if(!$attrs.search) console.error(SEARCH_ERR)

              $transclude((transcludeElement) => {
                let parentContext = $scope.$parent.$parent;

                [].slice.call(transcludeElement).forEach((value, $index) => {
                  if(value.nodeName !== 'ADVANCED-SEARCH-FIELD') return
                  if(!value.getAttribute('field')) return console.error(FIELD_ERR)

                  let field           = value.getAttribute('field'),
                      type            = value.getAttribute('type'),
                      label           = value.getAttribute('label') ?  $interpolate(value.getAttribute('label'))(parentContext) : field.charAt(0).toUpperCase().concat(field.slice(1)),
                      extraProperties = {}

                  if(!type) return console.error(NOTYPE_ERR)

                  type            = type.toLowerCase().trim() || ''
                  label           = label                     || field.charAt(0).toUpperCase() + field.slice(1)
                  extraProperties = getExtraProperties(value)

                  if(!HQLFactory.useType(type)) return console.error(TYPE_ERR.replace('{1}', type))

                  $scope._attributes.push({ field, type, label, extraProperties })
                })
              })

              if(!$scope._attributes[0]) return;

              const getElm = string => angular.element(document.getElementById(string))


              let defaultAttribute  = angular.copy($scope._attributes[0]),
                  defaultCondition  = angular.copy(HQLFactory.useType(defaultAttribute.type).defaultCondition)[0]

              $scope.controlMap['0'] = QueryModelFactory.create({ attribute: defaultAttribute, condition: defaultCondition, value: '' })
              $scope.controlMap['1'] = QueryModelFactory.create({ value: 'AND', label: 'E' })
              $scope.controlMap['2'] = QueryModelFactory.create({ attribute: defaultAttribute, condition: defaultCondition, value: '' })

              $scope.addAttribute             = addAttribute
              $scope.toggleUpdatingAttribute  = toggleUpdatingAttribute

              $scope.addCondition             = addCondition
              $scope.toggleUpdatingCondition  = toggleUpdatingCondition

              $scope.toggleUpdatingValue      = toggleUpdatingValue

              $scope.isAnyQueryNotOk          = isAnyQueryNotOk

            function addAttribute(selectedAttribute, scope, key){
              scope.$value.query.attribute = selectedAttribute
              scope.conditions =  HQLFactory.useType(selectedAttribute.type).conditions

              scope.$value.removeState('UPDATING_ATTRIBUTE').removeState('NOTHING').addState('ONLY_ATTRIBUTE')

              $timeout(() => scope.$value.addState('UPDATING_CONDITION'))
            }

            function toggleUpdatingAttribute(scope){
              scope.$value.isUPDATING_ATTRIBUTE() ?
                  scope.$value.removeState('UPDATING_ATTRIBUTE')
                : scope.$value.addState('UPDATING_ATTRIBUTE')
            }

            function addCondition(selectedCondition, scope, key){
              scope.$value.query.condition = selectedCondition
              scope.$value.removeState('UPDATING_CONDITION')
              $timeout(() => {
                scope.$value.removeState('ONLY_ATTRIBUTE').addState('ATTRIBUTE_AND_CONDITION').addState('UPDATING_VALUE')
                let elm = getElm(`_panelValue${key}`)
                getElm(`_panelValue${key}`).addClass('show')
                $compile(elm.html(HQLFactory.useType(scope.$value.query.attribute.type).template).contents())(scope)
              })
            }

            function toggleUpdatingCondition(scope){
              scope.$value.isUPDATING_CONDITION() ?
                  scope.$value.removeState('UPDATING_CONDITION')
                : scope.$value.addState('UPDATING_CONDITION')
            }

            function toggleUpdatingValue(scope, key) {
              scope.$value.isUPDATING_VALUE() ?
                  (scope.$value.removeState('UPDATING_VALUE'), getElm(`_panelValue${key}`).addClass('show'))
                : (scope.$value.addState('UPDATING_VALUE'), getElm(`_panelValue${key}`).addClass('show'))
            }

            function isAnyQueryNotOk(){
              return Object.keys($scope.controlMap).filter((intern) => $scope.controlMap[intern].isEVERYTHING_NEEDED()).length == 0;
            }

            function toggleEnum(event, key, field) {
              event.stopPropagation()

              let elm = getElm(`_panelValue${key}`).scope();
              if (!Array.isArray(elm.$value.query.value)) elm.$value.query.value = [];
              var index = elm.$value.query.value.indexOf(field)
              if (index > -1) {
                elm.$value.query.value.splice(index, 1)
              } else {
                elm.$value.query.value.push(field)
              }
            }

            function getExtraProperties(value) {
              let properties;
              switch (value.getAttribute('type')) {
                case 'boolean': {
                  properties = { trueLabel: value.getAttribute('true-label'), falseLabel: value.getAttribute('false-label') }
                  break;
                }
                case 'select': {
                  properties = { data: outerScope[value.getAttribute('data')]  }
                  break;
                }
                case 'enum' : {
                  properties = { data: outerScope[value.getAttribute('data')] }
                }
              }
              return properties;
            }


              function addValue(index, value){
                  getElm(`_value${index}`).html(value);
              }

              function addQuery(){
                if(isEven($scope.lastAddedQueryIndex)){
                  $scope.lastAddedQueryIndex++
                  $scope.controlMap[$scope.lastAddedQueryIndex] = new Query({ query: { value: 'AND' }, label: 'E', active: true })
                }

                $scope.lastAddedQueryIndex++
                $scope.controlMap[$scope.lastAddedQueryIndex] = { query: { attribute: {}, condition: {}, value: '' }, active: true }

                $timeout(()=> hideValue($scope.lastAddedQueryIndex))
                $scope.closePanels();
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
                Object.keys($scope.controlMap).forEach((value, $index) => {
                  if($scope.controlMap[value].active === true && (first === undefined)){
                    first = $index
                  }
                })
                return first
              }

              function isThereAnyMoreThanFirstOfMap(){
                return Object.keys($scope.controlMap).filter($value => (parseInt($value) > firstOfMap())).length > 0;
              }

              function removeQuery(scope){
                if(!scope.$$prevSibling.$key && !scope.$$nextSibling){
                  scope.$value.query =  { attribute: {}, condition: {}, value: '' }
                  scope.$value.activeStates = 0;
                  $timeout(() => scope.$value.addState('UPDATING_ATTRIBUTE'))
                  return
                }
                if(!scope.$$prevSibling.$key && scope.$$nextSibling){
                  scope.$value.active = false
                  scope.$$nextSibling.$value.active = false
                  $timeout(()=> (scope.$$nextSibling.$destroy(), scope.$destroy()))
                  return
                }
                if(scope.$$prevSibling.$key) {
                  scope.$value.active = false
                  scope.$$prevSibling.$value.active = false
                  $timeout(()=> (scope.$$prevSibling.$destroy(), scope.$destroy()))
                }
              }

              function updateOperator(scope){
                if(scope.$value.query.value === 'AND'){
                  scope.$value.query.value = 'OR'
                  scope.$value.query.label = 'OU'
                } else {
                  scope.$value.query.value = 'AND'
                  scope.$value.query.label = 'E'
                }
                $scope.search({ param: HQLFactory.createHql($scope.controlMap) });
              }

              function replacePanelContent(key, template){
                let elm = getElm(`_panelValue${key}`)
                $compile(elm.html(template).contents())(elm.scope())
              }

              function togglePanelValue(index){
                if($scope.updatingHql != index){
                  $scope.updatingHql = index
                }

                getElm(`_panelValue${index}`).toggleClass('show')
              }

              function closePanelValue(index){
                getElm(`_panelValue${index}`).removeClass('show')
              }

              function closePanels(){
                let panels = document.querySelectorAll('.gumga-filter-panel')
                for (var i = 0; i < panels.length; i++) {
                  let panel = angular.element(panels[i])
                  if (panel.hasClass('show'))
                    panel.removeClass('show')
                }
              }


              document.addEventListener('click', (e) => {
                let outerClick    = true,
                    distanceNodes = e.path.length

                for (var i = 0; i < distanceNodes; i++) {
                  if (e.path[i].nodeName == 'GUMGA-FILTER-CORE')
                    outerClick = false;
                }

                let updatingValue = Object.keys($scope.controlMap).filter((intern) => $scope.controlMap[intern].isUPDATING_VALUE())[0],
                    validator = HQLFactory.validator($scope.controlMap[updatingValue].query.attribute.type)

                if (outerClick && validator($scope.controlMap[updatingValue].query.value))  {
                  $scope.$apply()
                  let scopeBeingUpdated = getElm(`_panelValue${updatingValue}`).scope()

                  scopeBeingUpdated.$value.removeState('UPDATING_VALUE').removeState('ATTRIBUTE_AND_CONDITION').addState('EVERYTHING_NEEDED')

                  getElm(`_panelValue${updatingValue}`).removeClass('show')
                  console.log($scope.controlMap);
                  $scope.search({ param: HQLFactory.createHql($scope.controlMap)});
                }
              });
            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory','gumga.filter.querymodel'])
    .directive('gumgaFilterCore', Filter)
})()
