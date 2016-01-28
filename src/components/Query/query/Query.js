
(function(){

  Search.$inject = []

  function Search(){
    let template = `
      <div class="input-group">
       <input type="text" class="form-control" ng-model="searchField" ng-keyup="ctrl.doSearch(searchField, $event)" />
       <span class="input-group-btn" uib-dropdown uib-keyboard-nav auto-close="outsideClick">
         <button class="btn btn-default" type="button" uib-dropdown-toggle>
          <span class="glyphicon glyphicon-chevron-down"><span>
         </button>
         <ul uib-dropdown-menu role="menu" aria-labelledby="single-button" class="dropdown-menu-search">
            <li role="menuitem" ng-repeat="(key, $value) in ctrl.mapFields">
               <a class="no-padding-search-fields">
                 <label ng-click="$event.stopPropagation();">
                   <input type="checkbox" ng-model="$value.checkbox" />
                   <span><b>{{$value.label}}</b></span>
                 </label>
               </a>
            </li>
          </ul>
          <button class="btn btn-default" type="button">
           <span class="glyphicon glyphicon-filter"><span>
          </button>
           <button class="btn btn-primary" type="button" ng-click="ctrl.doSearch(searchField)">
            <span> {{::ctrl.searchText}} </span>
            <span class="glyphicon glyphicon-search rotate-search-glyph"></span>
           </button>
         </span>
       </div>`

    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude){
      let ctrl = this
      const hasAttr             = string  => !!$attrs[string]


      ctrl.mapFields      = {}

      $transclude((transcludeElement) => {
        let alreadySelected = false;

        [].slice.call(transcludeElement).forEach(value => {
          if(value.nodeName !== 'SEARCH-FIELD') return

          let element   = angular.element(value),
              field     = element.attr('field'),
              checkbox  = !!$scope.$eval(element.attr('select')),
              label     = $scope.$parent.$eval(element.attr('label')) ? $scope.$parent.$eval(element.attr('label')) : element.attr('label')

          if(!field) console.error('É necessário um parâmetro field na tag search-field.[<search-field field="foo"></search-field>]')
          if(checkbox) alreadySelected = true

          ctrl.mapFields[field] = { checkbox, label, field }
        })
        if(!alreadySelected){
          for(var first in ctrl.mapFields) break
          ctrl.mapFields[first].checkbox = true
        }
       })

      ctrl.advancedSearch = hasAttr('advancedSearch') ? ctrl.advancedSearch   : angular.noop
      ctrl.savedFilters   = hasAttr('savedFilters')   ? ctrl.savedFilters     : angular.noop
      ctrl.searchText     = hasAttr('searchText')     ? $attrs['searchText']  : ' '
      ctrl.doSearch       = doSearch

      function doSearch(param, event = { keyCode: 13 }){
        if(event.keyCode !== 13) return
        let field =
          Object
            .keys(ctrl.mapFields)
            .filter(value => !!ctrl.mapFields[value].checkbox)
            .reduce((prev, next) => (prev += next.concat(',')), '')
            .slice(0, -1)

        if(field.length === 0) return

        ctrl.search({ field, param })
      }

      if(!hasAttr('search')) console.error('É necessário passar uma função para o atributo "search". [search="foo(field, param)"]')
    }

    return {
      restrict: 'E',
      scope: {
        search: '&',
        advancedSearch: '&?',
        savedFilters: '&?'
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
