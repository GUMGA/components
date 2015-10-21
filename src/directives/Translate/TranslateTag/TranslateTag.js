(function(){
  'use strict';
  TranslateTag.$inject = ['TranslateHelper','$compile'];
  function TranslateTag(TranslateHelper,$compile){
    var child;
    return {
      restrict: 'A',
      link: function(scope,elm,attrs){
        if (!attrs.gumgaTranslateTag) throw 'You must pass a valid value to gumgaTranslateTag';
        var translation;
        if (attrs.gumgaTranslateTag.indexOf(',') != -1) {
          var translate = attrs.gumgaTranslateTag.split(',');
          translation = TranslateHelper.returnTranslationFrom(translate[1], translate[0]);
        } else {
          translation = TranslateHelper.returnTranslation(attrs.gumgaTranslateTag);
        }
        if (translation) {
          if (elm[0].childNodes.length > 0) {
            scope.child = elm[0].childNodes[0];
            elm[0].innerHTML =  translation;
            elm.append($compile(scope.child)(scope));
          } else {
            elm[0].innerHTML = translation;
          }
        }
      }

    };
  }

  angular.module('gumga.directives.translate.translatetag',['gumga.directives.translate.translatehelper'])
  .directive('gumgaTranslateTag',TranslateTag);
})();
