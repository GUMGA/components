'use strict';

gumgaUnityTag.$inject= ['$templateCache','$compile','$rootScope', '$timeout'];

function gumgaUnityTag($templateCache, $compile, $rootScope, $timeout){

  function link($scope, $element, $attrs, $controller){
    $attrs.$set('draggable', true);

    const templateString  =`
    <script type="text/ng-template" id="${format($scope.name).concat('.html')}">
      <form gumga-form novalidate name="Popover">
        ${generateAttributes($scope.attributes)}
        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-default btn-sm pull-right" type="button" ng-click="updateTag(data)"><i class="glyphicon glyphicon-ok"></i></button>
            <button class="btn btn-default btn-sm pull-right" type="button"><i class="glyphicon glyphicon-remove"></i></button>
          </div>
        </div>
      </form>
    <script>`;


    function generateAttributes(arr){true
      return arr.reduce((p, n, i) => {
        return p+=`
        \t<div class="form-group">
        \t\t<label>${n.definition.name}</label>
        \t\t<input type="text" ng-model="attributes[${i}].value" name="${format(n.definition.name)}" class="form-control" gumga-required/>
        \t</div>`
      },' ')
    }

    function format(str){
      return str.replace(/[^a-zA-Z ]/g, '').replace(/\s/g,'');
    }
    function setActive(name){
      if(!!name && $controller.getActive() != $scope.name) {
        $controller.cleanPopovers();
        $controller.setActive(name);
        console.log($controller.getActive());
      };
    }

    function popoverHide(element){
      $element.find('div').remove();
    }

    function updateTag(data = {}){
      updateTooltip();
      $controller.setActive();
      $controller.cleanPopovers();
    }

    function updateTooltip(){
      $scope.tooltip  = $scope.attributes.reduce((p, n) => p += `\n\n\n [${n.definition.name}  ${n.value ? ': ' + n.value : ''}]`, ` `);
    }

    $controller.on($scope.name, () => {
      $scope.setActive($scope.name);
    })



    $scope.format       = format;
    $scope.popoverHide  = popoverHide;
    $scope.setActive    = setActive;
    $scope.updateTag    = updateTag;
    $scope.parentColumn = $controller.id;
    $scope.templateUrl  = $scope.format($scope.name).concat('.html');

    updateTooltip();

    $element.append($compile(angular.element(templateString))($scope));
  }
  return {
    restrict: 'E',
    link,
    scope: {
      name: '@',
      attributes: '='
    },
    require: '^gumgaTagColumn',
    template:`
    <style>
      div.bottom.fade.popover.in {
        min-width: 150%;
      }

    </style>
    <span class="label label-primary unity-tag" style="margin-top: 2%;margin-bottom: 2%;display: inline-block;"
          uib-tooltip="{{tooltip}}" ng-mousedown="popoverHide(this)" ng-mouseup="setActive(parentColumn == 'right' ? name : '')" tooltip-placement="bottom"
          uib-popover-template="templateUrl" popover-placement="bottom" popover-trigger="click"
          popover-enable="parentColumn === 'right'" popover-is-open>
            {{name}} <strong>({{attributes.length}})</strong>
    </span>`
  }
}

angular.module('gumga.tag.unity', [])
.directive('gumgaUnityTag', gumgaUnityTag)
