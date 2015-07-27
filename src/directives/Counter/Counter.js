// define = Require.js
(function(){
  'use strict';

    Counter.$inject = ['$compile'];
      /**
       * @ngdoc directive
       * @name gumga.core:GumgaCounter
       * @element input
       * @description O componente GumgaCounter permite o desenvolvedor escolher a quantidade de caracteres permitida,
       * e adiciona um contador de caracteres em baixo da input.
       * @example
       * <pre>
       * <input name="example" ng-model="example" gumga-counter="15" />
       * </pre>
      */

      function Counter($compile){
            return{
                restrict: 'A',
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
