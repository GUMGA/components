(function(){
  'use strict';

  Counter.$inject = ['$compile'];
  function Counter($compile){
    return{
      restrict: 'A',
      require: ['^form','ngModel'],
      link: function (scope, elem, attrs) {
        scope._max = parseInt(attrs.gumgaMaxLengthText);
        if (!isNaN(parseInt(attrs.gumgaCounter))) {
          scope._max = parseInt(attrs.gumgaCounter);
        }
        var template = '<p class="{{_max <= teste.length ? \'text-danger\' : \'text-muted\'}}">{{_max <= '+ attrs.ngModel +'.length ? "Você passou o limite de '+scope._max+' caracteres" : _max - '+ attrs.ngModel +'.length + " caracteres restantes" }}</p>';
        elem.after($compile(template)(scope));
      }
    };
  }

  angular.module('gumga.directives.counter', [])
  .directive('gumgaCounter', Counter);

})();
