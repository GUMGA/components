(function () {
  'use strict';

  Query.$inject= [];
  function Query(){
    var _template =
    '<div class="col-md-12" ng-show="scope.searchQueries.length > 0">'+
    '   <label><small>{{::label}}</small></label>'+
    '<div class="col-md-12">'+
    '<gumga-advanced-label ng-repeat="query in searchQueries"'+
    '                      attr="{{query.attribute.name}}"'+
    '                      hql="{{query.hql.label}}"'+
    '                      value="query.value"'+
    '                      index="$index"'+
    '                      disabled="true"'+
    '                      style="margin-right: .5%">'+
    '</gumga-advanced-label>'+
    ' <button class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-floppy-save"></i></button>'+
    ' </div>'+
    '</div>';
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

  angular.module('gumga.directives.queries',['gumga.directives.search.advancedlabel'])
  .directive('gumgaQueries',Query);
})();
