(function () {
  'use strict';

  Query.$inject= [];
  function Query(){
    var _template =
    '<gumga-advanced-label ng-repeat="query in searchQueries"'+
    '                      attr="{{query.attribute.name}}"'+
    '                      hql="{{query.hql.label}}"'+
    '                      value="query.value"'+
    '                      index="$index"'+
    '                      disabled="true"'+
    '                      style="margin-right: 1%">'+
    '</gumga-advanced-label>';
    return {
      restrict: 'E',
      scope:false,
      template: _template,
      link: function (scope,elm,attrs) {
        scope.label = attrs.label || 'Busca ativa:';
        if(scope.searchQueries){
          scope.hasQueries = true;
        }
      }
    }
  }

  angular.module('gumga.directives.queries',[])
  .directive('gumgaQueries',Query);
})();
