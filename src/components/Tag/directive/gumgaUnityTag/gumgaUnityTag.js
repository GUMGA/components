'use strict';

gumgaUnityTag.$inject= [];

function gumgaUnityTag(){

  function link($scope, $element, $attrs){
    $attrs.$set('draggable', true);
    $element[0].addEventListener('dragstart', handleDragStart, false);

    function handleDragStart(e){
      console.log('deu drag');
    }
  }

  return {
    restrict: 'E',
    link,
    require: '^gumgaTagColumn',
    template: '<span class="label label-primary unity-tag" >pimba na gorduchinhas</span>'
  }
}


angular.module('gumga.tag.unity', [])
  .directive('gumgaUnityTag', gumgaUnityTag)
