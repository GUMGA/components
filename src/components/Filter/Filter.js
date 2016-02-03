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

                <div class="input-group" ng-repeat="query in queries">
                    <div class="input-group-btn">
                        <div class="btn-group" uib-dropdown is-open="true" ng-show="true">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ query.attribute.label || 'Atributo' }} <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="attribute in attributes">
                                    <a href="#" ng-click="setAttribute(query, attribute)">{{attribute.label}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group" uib-dropdown is-open="true" ng-show="query.attribute.type">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ query.condition.label || 'Condição' }} <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="condition in conditions">
                                    <a href="#" ng-click="setCondition(query, condition)">{{condition.label}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group" uib-dropdown ng-show="query.attribute.type && query.condition">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ query.value || 'Valor' }} <span class="caret"></span>
                            </button>
                            <div uib-dropdown-menu role="panel" class="panel panel-default" ng-click="$event.stopPropagation()" style="width: auto" aria-labelledby="single-button">
                                <div class="panel-body" id="_panel"></div>
                            </div>
                        </div>
                        <button id="single-button" type="button" class="btn btn-default" ng-click="clearQuery(query)" ng-disabled="disabled">
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
                $scope.queries           = [{}];
                $scope.hqlOptions        = [];
                $scope.panel             = {};
                $scope.selectHql         = false;
                
                $scope.dropStatus = function() {
                    $scope.condition.show   = false;
                    $scope.condition.isopen = false;
                    $scope.panel.show       = false;
                    $scope.panel.isopen     = false;
                }
                
                $scope.dropStatus();

                
                $transclude((transcludeElement) => {
                    [].slice.call(transcludeElement).forEach(value => {
                      console.log(angular.element(value).contents());

                        if (value.nodeName === 'ADVANCED-SEARCH-FIELD') {
                            let attribute = {
                                label: value.getAttribute('label'),
                                type: value.getAttribute('type'),
                                field: value.getAttribute('field')
                            }
                            $scope.attributes.push(attribute);
                        }
                    })
                });
                $scope.clearAttribute = function(query) {
                    query.attribute = {};
                }
                $scope.setAttribute = function(query, attribute) {
                    query.attribute = attribute;
                    let hqlByType = HQLFactory.useType(attribute.type),
                        template = document.querySelector('#_panel');
                        
                    $scope.conditions       = hqlByType.conditions;
                    
                    $compile(angular.element(template).html(hqlByType.template))($scope);
                }
                $scope.setCondition = function(query, condition) {
                    query.condition = condition;
                }
                $scope.clearQuery = function(query) {
                    query = {};
                }
                $scope.addQuery = function() {
                    $scope.queries.push($scope.queries[$scope.queries.length]);
                }
            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory'])
    .directive('gumgaFilter', Filter);
})();