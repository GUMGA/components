(function () {
  'use strict';

  List.$inject = ['GumgaListHelper','$compile'];

  function List(GumgaListHelper,$compile){
    /**
    * GUIDE:
    *
    * Atributo:
    *  1. Sort {Function} [Função que será chamada para fora da directive para fazer o sort]
    *  2. Class {String} [Classe que será colocada na table **BOOTSTRAP** ***PARA MUDAR PRECISA TER A CLASSE TABLE***]
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
    * 5. Identifier {String} [Valor que servirá como identificador da coluna]
    * 6. Sortable {Boolean} [Valor que irá dizer se a coluna é possível fazer o sort ou não.
    * 7. Conditional {Function} [Função que receberá o valor da linha como parâmetro e retornará um JSON para marcar as cores irão para o background da coluna]
    */

    function ctrl($scope, $element, $attrs, $transclude){
      var selectedIndexes = [];
      var vm = this;
      var isHex = '/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/';
      vm.selectedItem = {};
      // Functions
      vm.sort = sort;
      vm.selectRow = selectRow;
      function verifyEmpty($v,other){return (!$attrs.$v ? other : vm[$v])};
      // Get configs
      vm.data = vm.data || [];
      vm.config = vm.config || {};
      vm.config.selection = (vm.config.selection || 'single');
      vm.config.itemsPerPage = (vm.config.itemsPerPage || 10);
      vm.config.sortDefault = (vm.config.sortDefault || 0);
      if(!vm.config.selectedValues){
        $scope.$parent.selectedValues = [];
        vm.config.selectedValues = $scope.$parent.selectedValues;
      } else { vm.config.selectedValues = [];}
      vm.config.conditional = (vm.config.conditional || angular.noop);
      vm.config.sort = verifyEmpty('sort',angular.noop);
      vm.config.class = verifyEmpty('class','table');
      vm.config.onClick = verifyEmpty('onClick',angular.noop);
      vm.config.onDoubleClick = verifyEmpty('onDoublelick',angular.noop);
      vm.config.onSort = verifyEmpty('onSort',angular.noop);
      if (vm.data && vm.data.length > 0) {
        vm.config.columns = (!!vm.config.columns) ?
          GumgaListHelper.ensureDefaultValues(vm.config.columns) : GumgaListHelper.loadDefaultColumns(vm.data[0]);
      }
      // Compile html
      $element.append($compile(GumgaListHelper.mountTable(vm.config))($scope));


      function selectRow($idx,$val){
        var isAlreadySelected = selectedIndexes.filter(function(val){return val == $idx}).length > 0;
        if(isAlreadySelected){
          var index;
          vm.config.selectedValues.forEach(function(val,indx){
            (angular.equals(val,$val)) ? index = indx : angular.noop;
          })
          vm.config.selectedValues.splice(index, 1);
          selectedIndexes.splice(selectedIndexes.indexOf($idx),1);
        } else {
          vm.config.selectedValues.push($val);
          selectedIndexes.push($idx);
        }
        $val.checked = !isAlreadySelected;
      }

      function sort(field){
        if(!vm.selectedItem.item || vm.selectedItem.item != field){
        }
        if(vm.selectedItem.direction == 'asc' && field == vm.selectedItem.item){
          vm.selectedItem.direction = 'desc';
          return 'glyphicon glyphicon-menu-down';
        }
        if(vm.selectedItem.direction == 'desc' && field == vm.selectedItem.item){
          vm.selectedItem.direction = 'asc';
          return 'glyphicon glyphicon-menu-up';
        }
      }
    };
    return {
      restrict: 'E',
      scope:{
        'sort': '&?',
        'class': '&?',
        'data': '=',
        'onClick': '&?',
        'onDoubleClick': '&?',
        'onSort': '&?',
        'config': '=configuration'
      },
      controller: ctrl,
      controllerAs: 'vm',
      bindToController: true
    }
  }
  angular.module('gumga.directives.list',['gumga.services.listhelper'])
  .directive('gumgaList',List);
})();
