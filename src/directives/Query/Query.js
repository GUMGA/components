(function () {
  'use strict';
  Query.$inject = [];
  function Query(){
    var _template =
    '<div class="col-md-12" ng-show="hasQueries && $parent.searchQueries.length > 0">'+
    '   <label><small>{{::label}}</small></label>'+
    '   <div class="col-md-12">'+
    '   <div class="col-md-8"  style="padding-left: 0;padding-right: 0;">'+
    '   <gumga-advanced-label '+
    '         ng-repeat="query in $parent.searchQueries"'+
    '         attr="{{query.attribute.name}}"'+
    '         hql="{{query.hql.label}}"'+
    '         value="query.value"'+
    '         index="$index"'+
    '         disabled="true"'+
    '         style="margin-right: .5%">'+
    '   </gumga-advanced-label>'+
    '</div>'+
    ' <div class="col-md-4" style="padding-left: 0;padding-right: 0;">'+
    ' <div class="input-group input-group-sm" style="">'+
    '   <input type="text" ng-model="name" class="form-control" placeholder="{{placeholder}}" />'+
    '     <span class="input-group-btn">'+
    '       <button ng-disabled="(name.length < 1)" class="btn btn-primary" ng-click="saveQuery({query: $parent.searchQueries,name: name})" >'+
    '         <i class="glyphicon glyphicon-floppy-save"></i>'+
    '       </button>'+
    '     </span>'+
    ' </div>'+
    ' </div>'+
    '</div>';
    return {
      restrict: 'E',
      scope:{
        saveQuery: '&',
        placeholder: '@?'
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
