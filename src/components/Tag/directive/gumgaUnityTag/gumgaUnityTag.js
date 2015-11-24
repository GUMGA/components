'use strict';

gumgaUnityTag.$inject= ['$templateCache'];

function gumgaUnityTag($templateCache){

  function link($scope, $element, $attrs){
    $attrs.$set('draggable', true);

    $scope.$on(`${$scope.name}-drop`, (ev, data) => {
      $scope.generateAndAttach($scope.name, $scope.attributes);
    })

    function generateAndAttach(name, attrs){
      $scope.isOpen = true;
    }

    function popoverHide(element){
      $element.find('div').remove();
    }

    $scope.tooltip = $scope.attributes.reduce((previous, next) => {
      return previous += `\n [${next.definition.name} : ${next.value || 'Sem valor '}]`;
    }, `${$scope.attributes.length} atributos: \n`);

    $scope.updatedName        = $scope.name.replace(/\s/g, '');
    $scope.templateHtml       = `${$scope.updatedName}Template.html`
    $scope.generateAndAttach  = generateAndAttach;
    $scope.isOpen             = false;
    $scope.popoverHide        = popoverHide;
    let generatedTemplate = $scope.attributes.reduce((previous, next) => {
      return previous += `
        <div gumga-form-class="${next.definition.name.normalize()}">
          <label>${next.definition.name}</label>
          <input type="text" ng-model="data[${next.definition.name.normalize()}]" class="form-control" name="${next.definition.name.normalize()}" required/>
        </div>
      `
    }, '<form gumga-form name="Form" ng-controller="PopoverController">\n <div class="col-md-12">').concat('</div>\n</form>');
    $templateCache.put($scope.templateHtml, generatedTemplate);
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
    <label uib-popover-template="templateHtml" popover-is-open="isOpen" popover-placement="bottom">
      <span class="label label-primary unity-tag" style="margin-top: 2%;display: inline-block;"
            uib-tooltip="{{tooltip}}" ng-mousedown="popoverHide(this)" tooltip-placement="right">
        {{name}} <strong>({{attributes.length}})</strong>
      </span>
    <label/>
    `
  }
}


angular.module('gumga.tag.unity', [])
.directive('gumgaUnityTag', gumgaUnityTag)
