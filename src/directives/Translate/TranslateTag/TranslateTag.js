(function(){
  'use strict';
  TranslateTag.$inject = ['TranslateHelper','$compile', '$timeout'];
  function TranslateTag(TranslateHelper,$compile, $timeout){
    var child;
    return {
      restrict: 'A',
      link: function(scope,elm,attrs){
        if (!attrs.gumgaTranslateTag) throw 'You must pass a valid value to gumgaTranslateTag';
        $timeout(() => {
          var translation = TranslateHelper.returnTranslation(attrs.gumgaTranslateTag) || attrs.gumgaTranslateTag;
          if (elm[0].childNodes.length > 0 && elm[0].childNodes[0].nodeName != '#text') {
            scope.child = elm[0].childNodes[0];
            elm[0].innerHTML =  translation;
            elm.append($compile(scope.child)(scope));
          } else {
            elm[0].innerHTML = translation || elm[0].innerHTML;
          }
        });

      }
    };
  }

  angular.module('gumga.directives.translate.translatetag',['gumga.directives.translate.translatehelper'])
  .directive('gumgaTranslateTag',TranslateTag);
})();
