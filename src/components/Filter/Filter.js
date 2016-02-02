(function(){
    'use strict';

    Filter.$inject = ['HQLFactory','$compile'];
    function Filter(HQLFactory,$compile) {
        let template = `
        <div>
            <button class="btn btn-default" ng-click="filterToggle()">
                <span class="glyphicon glyphicon-filter"></span>
            </button>
        </div>
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

                <div style="display: inline-block" ng-repeat="query in queries">

                    <div class="input-group">
                        <div class="btn-group" uib-dropdown>
                            <input type="text" ng-model="query.attribute.label" class="form-control" uib-dropdown-toggle>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="attribute in attributes | filter: query.attribute">
                                    <a href="#" ng-click="setAttribute(attribute)">{{attribute.label}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="input-group-btn">
                            <div class="btn-group" uib-dropdown>
                                <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                    {{ query.condition.label || 'Condição' }} <span class="caret"></span>
                                </button>
                                <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                    <li role="menuitem" ng-repeat="condition in conditions">
                                        <a href="#" ng-click="setCondition(condition)">{{condition.label}}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="btn-group" uib-dropdown>
                                <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                    {{ query.value || 'Valor' }} <span class="caret"></span>
                                </button>
                                <div uib-dropdown-menu role="panel" class="panel panel-default" ng-click="$event.stopPropagation()" style="width: auto" aria-labelledby="single-button">
                                    <div class="panel-body" id="_panel"></div>
                                </div>
                            </div>
                            <button id="single-button" type="button" class="btn btn-default" ng-click="cleanQuery()" ng-disabled="disabled">
                                <span class="glyphicon glyphicon-remove"></span>
                            </button>
                        </div>
                    </div>
                
                </div>

                <div class="input-group">
                    <div class="btn-group" uib-dropdown is-open="true">
                        <input type="text" ng-model="query.attribute.label" class="form-control" uib-dropdown-toggle>
                        <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                            <li role="menuitem" ng-repeat="attribute in attributes | filter: query.attribute">
                                <a href="#" ng-click="setAttribute(attribute)">{{attribute.label}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="input-group-btn">
                        <div class="btn-group" uib-dropdown is-open="condition.isopen" ng-show="condition.show">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ query.condition.label || 'Condição' }} <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="condition in conditions">
                                    <a href="#" ng-click="setCondition(condition)">{{condition.label}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group" uib-dropdown is-open="panel.isopen" ng-show="panel.show">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ query.value || 'Valor' }} <span class="caret"></span>
                            </button>
                            <div uib-dropdown-menu role="panel" class="panel panel-default" ng-click="$event.stopPropagation()" style="width: auto" aria-labelledby="single-button">
                                <div class="panel-body" id="_panel"></div>
                            </div>
                        </div>
                        <button id="single-button" type="button" class="btn btn-default" ng-click="cleanQuery()" ng-disabled="disabled">
                            <span class="glyphicon glyphicon-remove"></span>
                        </button>
                    </div>
                </div>
                <button id="single-button" type="button" class="btn btn-default" ng-click="addQuery()" ng-disabled="disabled">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
                
            </div>
        </div>
        `;

        return {
            restrict: 'E',
            template: template,
            transclude: true,
            scope : {
                isOpen: '@'
            },
            link: ($scope, $element, $attrs, $ctrl, $transclude) => {
                
                $scope.filterToggle      = () => $scope.isOpen = !$scope.isOpen
                
                $scope.attributes        = [];
                $scope.condition         = {};
                $scope.conditions        = [];
                $scope.query             = {};
                $scope.queries           = [];
                $scope.hqlOptions        = [];
                $scope.panel             = {};
                $scope.selectHql         = false;
                
                $scope.dropStatus = function() {
                    $scope.condition.show   = false;
                    $scope.condition.isopen = false;
                    $scope.panel.show   = false;
                    $scope.panel.isopen = false;
                }
                $scope.dropStatus();

                
                $transclude((transcludeElement) => {
                    console.log(transcludeElement);
                    
                    [].slice.call(transcludeElement).forEach(value => {
                        if (value.nodeName === 'ADVANCED-SEARCH-FIELD') {
                            let attribute = {
                                label: value.getAttribute('label'),
                                type: value.getAttribute('type')
                            }
                            $scope.attributes.push(attribute);
                        }
                    })
                });
                
                $scope.setAttribute = function(attribute) {
                    $scope.query.attribute = attribute;
                    let hqlByType = HQLFactory.useType(attribute.type);
                    $scope.conditions = hqlByType.conditions;
                    $scope.condition.show   = !$scope.condition.show;
                    $scope.condition.isopen = !$scope.condition.isopen;
                    
                    let template = document.querySelector('#_panel');
                    $compile(angular.element(template).append(hqlByType.template))($scope);
                }
                $scope.setCondition = function(condition) {
                    $scope.query.condition = condition;
                    $scope.panel.show   = !$scope.panel.show;
                    $scope.panel.isopen = !$scope.panel.isopen;
                }
                $scope.cleanQuery = function() {
                    $scope.query = {};
                }
                $scope.addQuery = function() {
                    $scope.queries.push($scope.query);
                    $scope.dropStatus();
                    $scope.cleanQuery();
                    console.log($scope.queries);
                }
            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory'])
    .directive('gumgaFilter', Filter);
})();