(function () {
  'use strict';

  List.$inject = [];

  function List(){
    /**
     * GUIDE:
     *
     * Atributo:
     *  1. Sort {Function} [Função que será chamada para fora da directive para fazer o sort]
     *  2. Class {String} [Classe que será colocada na table **BOOTSTRAP**]
     *  3. Data {Array} [Array que será mostrado na tabela]
     *  4. OnClick {Function} [Função que será executada quando o usuário clicar em um registro]
     *  5. OnSort {Function} [Função que será executada quando o sort for executado]
     *  6. OnDoubleClick {Function} [Função que será executada quando o usuário clicar duas vezes em um registro]
     *
     * Objeto:
     *  1. Selection {String} [Valor que irá dizer se a seleção é multipla ou única (multi|single)]
     *  2. ItensPerPage {Number} [Valor que irá dizer quantos itens serão selecionados por página] Obs: expõe variável no $scope.
     *  3. SortDefault {String} [Valor que irá dizer qual coluna será a que será ordenada por padrão]
     *  4. SelectedValues {Array} [Variável em que os elementos selecionados irão ficar]
     *  5. Columns {Array de objetos} [array que irá conter as configurações da coluna.]
     *  6. Conditional {Function} [Função que receberá o valor da linha como parâmetro e retornará um JSON para marcar as cores irão para o background]
     *
     * Objeto Column:
     * 1. Title {String} [Valor que será compilado no HTML no lugar do título da coluna]
     * 2. Size {String} [Valor que irá dizer o tamanho da coluna **BOOTSTRAP**]
     * 3. Ordering {Number} [Número que irá ditar para a tabela qual a ordem das colunas, onde 0 é o mais baixo.]
     * 4. Content {String} [Valor que será compilado no HTML no conteúdo da coluna ]
     * 5. Sortable {Boolean} [Valor que irá dizer se a coluna é possível fazer o sort ou não.
     * 6. Conditional {Function} [Função que receberá o valor da linha como parâmetro e retornará um JSON para marcar as cores irão para o background da coluna]
     */


    function ctrl($scope, $element, $attrs, $transclude){
      var vm = this;

      function verifyEmpty(value,_default){
        return (!$attrs.value ? _default : vm[value])
      }

      vm.config = {
        sort: verifyEmpty('sort',angular.noop)
      };

    };

    return {
      restrict: 'E',
      scope:{
        sort: '&?',
        class: '&?',
        data: '=',
        onClick: '&?',
        onDoubleClick: '&?',
        onSort: '&?'
      },
      controller: ctrl,
      controllerAs: 'vm',
      bindToController: true
    }
  }


  angular.module('gumga.directives.list',[])
  .directive('gumgaList',List);
})();
