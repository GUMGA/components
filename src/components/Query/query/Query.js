
(function(){

  Search.$inject = []

  function Search(){
    let template = `
    <div class="input-group">
       <input type="text" class="form-control" ng-model="searchField" ng-keyup="ctrl.doSearch(searchField, $event)" />
       <span class="input-group-btn">
         <button class="btn btn-default" type="button" uib-dropdown-toggle>
          <span class="glyphicon glyphicon-filter"><span>
         </button>
         <ul uib-dropdown-menu role="menu" aria-labelledby="single-button">
            <li role="menuitem"><a href="#">Action</a></li>
          </ul>
         <button class="btn btn-primary" type="button" ng-click="ctrl.doSearch(searchField, {})">
          <span> {{:: ctrl.searchText}} </span>
          <span class="glyphicon glyphicon-search rotate-search-glyph"></span>
         </button>
       </span>
    </div>`

    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude){
      let ctrl = this

      const hasAttr             = string  => !!$attrs[string]
      ctrl.mapFields      = {}
      ctrl.advancedSearch = hasAttr('advancedSearch') ? ctrl.advancedSearch   : angular.noop
      ctrl.savedFilters   = hasAttr('savedFilters')   ? ctrl.savedFilters     : angular.noop
      ctrl.searchText     = hasAttr('searchText')     ? $attrs['searchText']  : ' '

      if(!hasAttr('search')) console.error('É necessário passar uma função para o atributo "search". [search="foo(field, param)"]')



      $transclude((transcludeElement) => {
        [].slice.call(transcludeElement).forEach(value => {
          if(value.nodeName === 'SEARCH-FIELD'){
            let element   = angular.element(value),
                field     = element.attr('field'),
                checkbox  = !!$scope.$eval(element.attr('select')) ,
                template  = element.html().trim().length === 0 ? '{{$value}}' : element.html()

            if(!field) console.error('É necessário um parâmetro field na tag search-field.[<search-field field="foo"></search-field>]')
            ctrl.mapFields[field] = { checkbox, template, field }
          }

        })
      })
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
