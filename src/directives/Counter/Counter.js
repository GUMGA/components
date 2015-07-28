// define = Require.js
(function(){
  'use strict';

    Counter.$inject = ['$compile'];
      /**
       * @ngdoc directive
       * @name gumga.core:gumgaCounter
       * @element input[type="text"]
       * @description O componente gumgaCounter mostra, embaixo do input no qual ela foi colocada, um contador de caracteres indicando se os caracteres
       * passaram do limite ou não. 
       * 
       * Caso um valor seja passado para a directive, ela atualizará o contador baseado nesse número. Caso não, ela pegará o valor
       * passado para a directive {@link gumga.core:gumgaMaxLengthText}
       * 
       * @example
       *  Um exemplo da directive gumgaCounter funcionando pode ser encontrado [aqui](http://embed.plnkr.co/6xJuUuiI456kqbXN3Q6f/).
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
