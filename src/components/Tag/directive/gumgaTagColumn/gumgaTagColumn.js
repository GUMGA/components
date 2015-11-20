'use strict';

gumgaTagColumn.$inject = [];

function gumgaTagColumn(){

  controller.$inject = ['$scope', '$element', '$attrs', '$compile'];

  const searchString  =`
        <div class="input-group">
          <input type="text" class="form-control input-inside-tag-column" />
          <span class="input-group-btn">
            <button class="btn btn-default btn-inside-tag-column" type="button"><span class="glyphicon glyphicon-search"></span></button>
          </span>
        </div>`;

  function controller($scope, $element, $attrs, $compile){
    let tagController   = $element.parent().controller('gumgaTag') || {};

    // O template de busca será compilado apenas se o atributo has-search estiver  no componente gumgaTagColumn.

    let template  =`
      <div class="col-sm-4 col-md-4">
        <div class="panel panel-default panel-from-tag-column">
          ${(!!$attrs.hasSearch) ? searchString : ' '}
          <div class="panel-body body-column">
            <gumga-unity-tag ng-repeat="tag in tags"> </gumga-unity-tag>
          </div>
        </div>
      </div>`;

    $element.append( $compile(angular.element(template))($scope));
  }

  return {
    restrict: 'E',
    controller,
    controllerAs: 'gumgaTagColumn',
    bindToController: true,
    scope: {
      ngModel: '='
    }
  }
}

angular.module('gumga.tag.column', [])
  .directive('gumgaTagColumn', gumgaTagColumn);
