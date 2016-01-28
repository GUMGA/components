(function(){
    'use strict';

    Filter.$inject = ['GumgaSearchHelper'];
    function Filter(GumgaSearchHelper) {
        let template = `

        <div class="gumga-filter">
            <header>
                <div class="row">
                    <div class="col-md-6">
                        <h3>Busca avançada</h3>
                    </div>
                    <div class="col-md-6" style="padding-top: 8px">

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
            <div class=" form-inline">

                <div class="input-group" ng-repeat="query in queries">
                    <input type="text" ng-model="query.attr" uib-typeahead="attr as attr.name for attr in attributes | filter:$viewValue | limitTo:8" ng-style="labelStyle" class="form-control">
                    <div class="input-group-btn">
                        <div class="btn-group" uib-dropdown is-open="condition.isopen">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                {{query.cond.name }} <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem" ng-repeat="query.cond in conditions">
                                    <a href="#" ng-click="addCurrentCond(cond)">{{cond.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group" uib-dropdown is-open="panel.isopen">
                            <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">
                                Valor <span class="caret"></span>
                            </button>
                            <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
                                <li role="menuitem"><a href="#">Action</a></li>
                            </ul>
                        </div>
                        <button id="single-button" type="button" class="btn btn-default" ng-click="clearCurrentQuery()" ng-disabled="disabled">
                            <span class="glyphicon glyphicon-remove"></span>
                        </button>
                    </div>
                </div>
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
                hqlHolder: '=data'
            },
            link: ($scope, $element, $attrs, $ctrl, $transclude) => {
                
                $scope.entityToTranslate = attrs.translateEntity
                $scope.attributes        = [];
                $scope.query             = {};
                $scope.queires           = [];
                $scope.hqlOptions        = [];
                $scope.selectHql         = false;
                
                transcludeFn((clone) => {
                    [].slice.call(transcludeElement).forEach(value => {
                        if (value.nodeName === 'ADVANCED-SEARCH-FIELD') {
                            let element     = angular.element(value),
                                template    = element.html().trim().length === 0 ? '{{$value}}' : element.html()
                        }
                    })
                });
            }
        }

        angular.module('gumga.filter', [])
        .directive('gumgaFilter', Filter);
    }
})();