(function(){
  //Description
  Search.$inject = ['$q','$timeout','$compile','$interpolate']

  function Search($q, $timeout, $compile, $interpolate){

    let template = `
      <div class="input-group">
        <input type="text" placeholder="Busque seus filtros salvos" class="form-control" ng-model="ctrl.searchField" ng-keyup="ctrl.doSearch(ctrl.searchField, $event, 'TYPEAHEAD')" uib-typeahead="item.description for item in ctrl.proxyFn($viewValue)" typeahead-on-select="ctrl.filterSelect($item, $model, $label, $event)" ng-show="ctrl.hasQuerySaved && openFilter"/>
        <input type="text" maxlength="{{inputMaxLength}}" class="form-control" ng-model="ctrl.searchField" ng-keyup="ctrl.doSearch(ctrl.searchField, $event)" ng-show="!ctrl.hasQuerySaved || !openFilter" />
        <span class="input-group-btn" uib-dropdown uib-keyboard-nav auto-close="outsideClick">
          <button class="btn btn-default" type="button" uib-dropdown-toggle>
            <span class="glyphicon glyphicon-chevron-down"><span>
          </button>
          <ul uib-dropdown-menu role="menu" aria-labelledby="single-button" class="dropdown-menu-search">
            <li role="menuitem" ng-repeat="(key, $value) in ctrl.mapFields">
              <a class="no-padding-search-fields">
                <label ng-click="$event.stopPropagation()">
                  <input type="checkbox" ng-model="$value.checkbox" />
                  <input type="radio" ng-model="$value.radio" />
                  <span><b>{{::$value.label}}</b></span>
                </label>
              </a>
            </li>
          </ul>
          <button class="btn btn-default" ng-click="openFilter = !openFilter">
            <span class="glyphicon glyphicon-filter"></span>
          </button>
          <button class="btn btn-primary" type="button" ng-click="ctrl.doSearch(ctrl.searchField)">
            <span> {{::ctrl.searchText}} </span>           
            <span class="glyphicon glyphicon-search rotate-search-glyph"></span>
          </button>
        </span>
      </div>
      <div class="row replace-filter">
        <div class="col-md-12">
          <div id="replaceFilter"></div>
        </div>
      </div>`

    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude){
      let ctrl = this

      const hasAttr             = string  => (!!$attrs[string]),
            FIELD_ERR           = 'É necessário um parâmetro field na tag search-field.[<search-field field="foo"></search-field>]',
            SEARCH_ERR          = 'É necessário passar uma função para o atributo "search". [search="foo(field, param)"]'

      ctrl.mapFields              = {}
      ctrl.possibleAdvancedFields = []

      if(!hasAttr('search')) console.error(SEARCH_ERR)

      $transclude((transcludeElement) => {
        let alreadySelected = false,
            parentContext   = $scope.$parent;

        [].slice.call(transcludeElement).forEach(value => {

          if(value && value.nodeName === 'ADVANCED-SEARCH-FIELD') ctrl.possibleAdvancedFields.push(value.outerHTML)
          if(!value || value.nodeName !== 'SEARCH-FIELD') return

          let element   = angular.element(value),
              field     = element.attr('field') ? element.attr('field') : '',
              checkbox  = !!$scope.$eval(element.attr('select')),
              radio     = !!$scope.$eval(element.attr('select')),
              label     = element.attr('label') ? $interpolate(element.attr('label'))(parentContext) : field.charAt(0).toUpperCase().concat(field.slice(1));

          if(!field)      console.error(FIELD_ERR)
          if(checkbox)    alreadySelected = true
          ctrl.mapFields[field] = { checkbox, label, field, radio}
        })

        if(!alreadySelected){
          for(var first in ctrl.mapFields) break
          if(first) ctrl.mapFields[first].checkbox = true
        }
       })

      ctrl.compileFilter      = compileFilter
      ctrl.doSearch           = doSearch
      ctrl.proxyFn            = proxyFn
      ctrl.filterSelect       = filterSelect
      ctrl.advancedSearch     = hasAttr('advancedSearch') ? ctrl.advancedSearch   : null
      ctrl.containerAdvanced  = hasAttr('containerAdvanced') ? ctrl.containerAdvanced : "replaceFilter"
      ctrl.savedFilters       = hasAttr('savedFilters')   ? ctrl.savedFilters     : angular.noop
      ctrl.searchText         = hasAttr('searchText')     ? $attrs['searchText']  : ' '
      ctrl.proxySearch        = (param) => ctrl.advancedSearch({ param })
      ctrl.hasQuerySaved      = !!$attrs.savedFilters
      ctrl.searchField        = $scope.$parent.searchField ? $scope.$parent.searchField : ''
      $scope.inputMaxLength   = hasAttr('inputMaxLength') ? $attrs['inputMaxLength'] : ''
      $scope.proxySave        = (query, name) => ctrl.saveQuery({ query, name })

      if(ctrl.advancedSearch) ctrl.compileFilter()

      function compileFilter(){
        let template  = `<gumga-filter-core ng-show="openFilter" is-open="true" search="ctrl.proxySearch(param)" 
${$attrs.saveQuery ? 'save-query="saveQuery(query, name)"' : ''}is-query="true">${ctrl.possibleAdvancedFields.reduce(((prev, next) => prev += next), '')}
</gumga-filter-core>`,

        element   = angular.element(document.getElementById(ctrl.containerAdvanced))
        element.replaceWith($compile(template)($scope))
      }

      function doSearch(param, event = { keyCode: 13 }, inputType){
        if(event.keyCode !== 13 || inputType == 'TYPEAHEAD') return;
        let field = Object
                    .keys(ctrl.mapFields)
                    .filter(value => !!ctrl.mapFields[value].checkbox)
                    .reduce((prev, next) => (prev += next.concat(',')), '')
                    .slice(0, -1)

        if(field.length === 0) return
        ctrl.search({ field, param })
      }

      $scope.$watch('openFilter', (open) => {
        if(typeof open !== 'undefined') $scope.$broadcast('openOrCloseFilter', open);
      })

      function proxyFn($value){
        return $q.when(ctrl.savedFilters({ page: location.hash }))
      }

      function filterSelect($item, $model, $label, $event){

        $timeout(() => ($scope.$broadcast('filter-items', $item)))
      }
    }

    return {
      restrict: 'E',
      scope: {
        search: '&',
        advancedSearch: '&?',
        containerAdvanced: '@?',
        savedFilters: '&?',
        saveQuery:'&?',
        inputMaxLength: '@?'
      },
      bindToController: true,
      transclude: true,
      controllerAs: 'ctrl',
      controller,
      template
    }
  }

  angular.module('gumga.query.directive', ['gumga.query.factory'])
    .directive('gumgaQuery', Search)

})()
