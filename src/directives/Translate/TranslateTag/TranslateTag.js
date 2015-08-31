(function(){
  'use strict';
  TranslateTag.$inject = ['TranslateHelper','$compile'];
  function TranslateTag(TranslateHelper,$compile){
    var child;
    return {
      restrict: 'A',
      link: function(scope,elm,attrs){
        if(!attrs.gumgaTranslateTag) throw 'You must pass a valid value to gumgaTranslateTag';
        if(TranslateHelper.returnTranslation(attrs.gumgaTranslateTag)){
          if(elm[0].childNodes.length > 0){
            scope.child = elm[0].childNodes[0];
            elm[0].innerHTML =  TranslateHelper.returnTranslation(attrs.gumgaTranslateTag);
            elm.append($compile(scope.child)(scope));
          } else {
            elm[0].innerHTML = TranslateHelper.returnTranslation(attrs.gumgaTranslateTag);
          }
        }
      }

    };
  }

  angular.module('gumga.directives.translate.translatetag',['gumga.directives.translate.translatehelper'])
  .directive('gumgaTranslateTag',TranslateTag);
})();
