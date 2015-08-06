(function () {
  'use strict';

  Query.$inject = [];
  function Query() {
      return {
        restrict: 'E',
        scope:false,
        link: function (scope,elm,attrs) {
            if(scope.searchQueries){
              scope.hasQueries = true;
            }
        }
      }
  }

  angular.module('gumga.directives.query',[])
  .directive('gumgaQueries',Query);

})();
