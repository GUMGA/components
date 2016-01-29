(function(){
    'use strict';

    Filter.$inject = ['HQLFactory'];
    function Filter(HQLFactory) {
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


                <div class="input-group">
                    <input type="text" ng-model="currentQuery.attr" uib-typeahead="attr as attr.name for attr in attributes | filter:$viewValue | limitTo:8" ng-keyUp="setLabelStyle()" ng-style="labelStyle" class="form-control">
                    <div class="input-group-btn">
                        <div class="btn-group" uib-dropdown is-open="currentCondition.isopen">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ currentQuery.cond.name || 'Condição' }} <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="cond in conditions">
                                    <a href="#" ng-click="addCurrentCond(cond)">{{cond.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group" uib-dropdown is-open="currentPanel.isopen">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{ currentQuery.value || 'Valor' }} <span class="caret"></span>
                            </button>
                            <div uib-dropdown-menu role="panel" class="panel panel-default" ng-click="$event.stopPropagation()" style="width: 500px;" aria-labelledby="single-button">
                                <div class="panel-body">
                                    <div class="row">
                                        <form action="" class="form-inline">
                                            <div class="form-group col-md-6">
                                                <input type="text" class="form-control input-block-level"/>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <input type="text" class="form-control btn-block"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="single-button" type="button" class="btn btn-default" ng-click="clearCurrentQuery()" ng-disabled="disabled">
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
                
                console.log(HQLFactory);
                
                $scope.filterToggle      = () => $scope.isOpen = !$scope.isOpen
                
                $scope.currentCondition
                $scope.entityToTranslate = $attrs.translateEntity
                $scope.attributes        = [];
                $scope.query             = {};
                $scope.queires           = [];
                $scope.hqlOptions        = [];
                $scope.selectHql         = false;
                
                $transclude((transcludeElement) => {
                    console.log(transcludeElement);
                    
                    [].slice.call(transcludeElement).forEach(value => {
                        if (value.nodeName === 'ADVANCED-SEARCH-FIELD') {
                            let element     = angular.element(value),
                                template    = element.html().trim().length === 0 ? '{{$value}}' : element.html()
                        }
                    })
                });
            }
        }
    }
    angular.module('gumga.filter.directive', ['gumga.query.factory'])
    .directive('gumgaFilter', Filter);
})();