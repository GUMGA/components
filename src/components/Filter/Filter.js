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
      scope: {},
      link: ($scope, $element, $attrs, $ctrl, $transclude) => {
        $scope.possibleAdvancedFields = []

        $transclude((transcludeElement) => {
          [].slice.call(transcludeElement).forEach(value => {
            if(value && value.nodeName === 'ADVANCED-SEARCH-FIELD')
              $scope.possibleAdvancedFields.push(value.outerHTML)
          })

          let template  = `<gumga-filter-core ng-show="isOpen" is-open="true"> ${$scope.possibleAdvancedFields.reduce(((prev, next) => prev += next), '')}</gumga-filter-core>`,
              element   = angular.element(document.getElementById('replace'))
          
          element.replaceWith($compile(template)($scope))  
        })
      }
    }
  }
  angular.module('gumga.filter.core', [])
  .directive('gumgaFilter', Filter)
})()
