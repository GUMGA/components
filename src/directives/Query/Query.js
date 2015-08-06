(function () {
  'use strict';

  Query.$inject = [];
  function Query() {
      return {
        restrict: 'E',
        scope:false,
        link: function (scope,elm,attrs) {
            if(scope.queries){
              console.log(searchQueries);
            }
        }
      }
  }

  angular.module('gumga.directives.query',[])
  .directive('gumgaQueries',Query);

})();
