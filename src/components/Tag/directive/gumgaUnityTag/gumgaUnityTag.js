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
    <button class="btn btn-primary btn-sm pull-right" type="button" ng-disabled="Popover.$invalid" ng-click="updateTag(data)"><i class="glyphicon glyphicon-ok"></i></button>
    <button class="btn btn-default btn-sm pull-right close-popover" type="button" ng-click="closePopover()"><i class="glyphicon glyphicon-remove"></i></button>
    </div>
    </div>
    </form>
    <script>`;


    function generateAttributes(arr = []){
      return arr.reduce((p, n, i) => {
        return p+=`
        \t<div class="form-group">
        \t\t<label>${n.name}</label>
        \t\t<input type="text" ng-model="attributes[${i}].value" name="${format(n.name)}" class="form-control" required/>
        \t</div>`
      },' ')
    }

    function closePopover(){
      $controller.setActive();
      $controller.cleanPopovers();
      if(!$scope.hasValues()){
        $controller.removeMe($scope.name);
      }
    }

    function format(str){
      return str.replace(/[^a-zA-Z ]/g, '').replace(/\s/g,'');
    }

    function setActive(name){
      $controller.cleanPopovers();
      $controller.setActive(name);
      $scope.oldAttributes =  angular.copy($scope.attributes);
    }

    function tooltipRemove(element){
      $element.find('div').remove();
    }

    function updateTag(data = {}){
      $controller.setActive();
      $controller.cleanPopovers();
      updateTooltip($scope.attributes);

    }

    function updateTooltip(arr = []){
      $scope.tooltip  = arr.reduce((p, n) => p += `\n\n\n [${n.name}  ${n.value ? ': ' + n.value : ''}]`, ` `);
    }

    function getActive(){
      return $controller.getActive() === $scope.name ? 'true' : '';
    }

    function hasValues(){
      $scope.attributes = $scope.attributes || [];
      return $scope.attributes.filter(attribute => {
        return !!attribute.value;
      }).length > 0;
    }

    $controller.on($scope.name, () => {
      $controller.cleanPopovers() ;
      $scope.setActive($scope.name, 'dropped');
    })

    $scope.hasValues      = hasValues;
    $scope.getActive      = getActive;
    $scope.closePopover   = closePopover;
    $scope.format         = format;
    $scope.tooltipRemove  = tooltipRemove;
    $scope.setActive      = setActive;
    $scope.updateTag      = updateTag;
    $scope.parentColumn   = $controller.id;
    $scope.templateUrl    = $scope.format($scope.name).concat('.html');

    $element.append($compile(angular.element(templateString))($scope));
    updateTooltip($scope.attributes);

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
    tooltip="{{tooltip}}" ng-mousedown="tooltipRemove(this)" ng-mouseup="setActive(name,'click')" tooltip-placement="bottom"
    popover-template="templateUrl" popover-placement="bottom" popover-trigger="click"
    popover-enable="parentColumn === 'right'" popover-is-open="getActive()">
    {{name}} <strong>({{attributes.length}})</strong>
    </span>`
  }
}

angular.module('gumga.tag.unity', [])
.directive('gumgaUnityTag', gumgaUnityTag)
