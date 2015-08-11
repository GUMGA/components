(function () {
  'use strict';

  Query.$inject= [];
  function Query(){
    var _template =
    '<div class="col-md-12" ng-show="hasQueries && $parent.searchQueries.length > 0">'+
    '   <label><small>{{::label}}</small></label>'+
    '<div class="col-md-12">'+
    '<gumga-advanced-label ng-repeat="query in $parent.searchQueries"'+
    '                      attr="{{query.attribute.name}}"'+
    '                      hql="{{query.hql.label}}"'+
    '                      value="query.value"'+
    '                      index="$index"'+
    '                      disabled="true"'+
    '                      style="margin-right: .5%">'+
    '</gumga-advanced-label>'+
    '<div class="form-inline">'+
    ' <div class="input-group">'+
    '   <input type="text" class="form-control" placeholder="{{::inputPlaceholder}}"/>'+
    '   <span class="input-group-btn">'+
    '    <button class="btn btn-primary" ng-click="saveQuery({query: $parent.searchQueries})"><i class="glyphicon glyphicon-floppy-save"></i></button>'
    '   </span>'
    ' </div>'+
    '</div>'+
    ' </div>'+
    '</div>';
    return {
      restrict: 'E',
      scope:{
        saveQuery: '&',
        inputPlaceholder: '@?'
      },
      template: _template,
      link: function (scope,elm,attrs) {
        scope.label = attrs.label || 'Busca ativa:';

        if(scope.$parent.searchQueries){
          scope.hasQueries = true;
        }
      }
    }
  }

  angular.module('gumga.directives.queries',['gumga.directives.search.advancedlabel'])
  .directive('gumgaQueries',Query);
})();
