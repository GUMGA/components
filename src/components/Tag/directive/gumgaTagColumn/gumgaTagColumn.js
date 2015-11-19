'use strict';

gumgaTagColumn.$inject = [];

function link($scope, $element, $attrs){
  let tagController = $element.parent().controller('gumgaTag');
}


function gumgaTagColumn(){
  return {
    restrict: 'E',
    link
  }
}

angular.module('gumga.tag.column', [])
  .directive('gumgaTagColumn', gumgaTagColumn);
