(function(){
  'use strict'

  Filter.$inject = ['HQLFactory','$compile','$timeout']
  function Filter(HQLFactory,$compile, $timeout) {
    let template = `
    <div>
      <button class="btn btn-default" ng-click="isOpen = !isOpen ">
        <span class="glyphicon glyphicon-filter"></span>
      </button>
    </div>
    <div id="replace"></div>
    `

    return {
      restrict: 'E',
      template: template,
      transclude: true,
      scope: {
        search: '&',
        saveQuery: '&',
        containerId: '@?'
      },
      link: ($scope, $element, $attrs, $ctrl, $transclude) => {
        $scope.possibleAdvancedFields = []

        $scope.search       = $scope.search      || angular.noop
        $scope.saveQuery    = $scope.saveQuery   || angular.noop
        $scope.containerId  = $scope.containerId || "replace";

        $scope.proxySave    = (query) => {
          $scope.saveQuery({ query, name })
        }
        $scope.proxySearch  = (param)  =>{
           $scope.search({ param })
        }

        $transclude((transcludeElement) => {
          [].slice.call(transcludeElement).forEach(value => {
            if(value && value.nodeName === 'ADVANCED-SEARCH-FIELD')
              $scope.possibleAdvancedFields.push(value.outerHTML)
          })

          let template  = `<gumga-filter-core ng-show="isOpen" search="proxySearch(param)" ${$attrs.saveQuery ? 'save-query="saveQuery(query, name)"' : ''}>
                            ${$scope.possibleAdvancedFields.reduce(((prev, next) => prev += next), '')}
                          </gumga-filter-core>`,
              element   = angular.element(document.getElementById($scope.containerId))          

          element.replaceWith($compile(template)($scope))
        })
      }
    }
  }
  angular.module('gumga.filter.core', [])
  .directive('gumgaFilter', Filter)
})()
