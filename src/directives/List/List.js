(function () {
  'use strict';

  List.$inject = ['GumgaListHelper','$compile','$timeout'];

  function List(GumgaListHelper,$compile,$timeout){
    /**
    * @ngdoc directive
    * @name gumga.core:gumgaList
    * @restrict E
    * @description
    * 	A directive gumgaList foi desenvolvida para substituir a antiga gumgaTable. Ela é mais configurável que a antiga table, e traz um meio mais fácil de configurar.
    *  	O componente possui dois tipos de configuração: diretamente no html e através de um objeto javascript.
    *
    * 	# Configuração da table através de um Objeto Javascript
    *
    *		Para aplicar a configuração na table, existem os seguintes atributos:
    *
    * | Param | Type  | Default | Details |
    * |-------|-------|---------|----------------|
    * |selection|String| single | Valor que será utilizado para definir como será a seleção da tabela. Possíveis valores: <label class="label type-hint type-hint-string">[multi / single]</label> |
    * |itemsPerPage|Array| [10,20,30,40,50] | Valor que será utilizado para definir o número de registros selecionado pelo usuário. O valor escolhido será exposto no $scope através da variável itemsPerPage |
    * |sortDefault | String | | Valor que será utilizado para definir qual o campo padrão de ordenação. Este valor será o identificador da coluna.
    * |columns |String| | Valor que irá definir quais as colunas e a ordenação delas. O formato deve estar no seguinte padrão: <label class="label type-hint type-hint-string">[column1,column2,...,columnN]</label>
    * |conditional | Function | angular.noop | Valor que será utilizado para fazer a formatação condicional do registro. A função deve retornar um objeto que contém a classe e a comparação utilizada <label class="label type-hint type-hint-string">[function(value){ return {'2px solid red': value.age < 18} }]</label>
    * |columnsConfig |Array |[]| Array que será utilizado para configurar as colunas que foram definidas no atributo columns.
    *
    * # Configuração da coluna através de um Objeto Javascript
    *	Para configurar as colunas, dentro do atributo columnsConfig, são criados objetos que poderão ter as seguintes configurações:
    *
    * | Param | Type  | Default | Details |
    * |-------|-------|---------|----------------|
    * |name | String |  | Valor que será utilizado para identificar a coluna. Este name deve ser o mesmo que está no atributo 'columns',
    * |title|String| NOME_DA_COLUNA.toUpperCase() | Valor que será renderizado no título da coluna.
    * |size|String| 'col-md-3' | Tamanho da coluna baseado nos valores do bootstrap. Exemplo: ** col-md-x **
    * |content |String|{{$value.NOME_DA_COLUNA}} | Valor que será renderizado no conteúdo da coluna.
    * |sortField |String | | String que será  usada para fazer a ordenação, e que irá como parâmetro na função de ordenação..
    * |conditional | Function | angular.noop | Valor que será utilizado para fazer a formatação condicional do registro. A função deve retornar um objeto que contém a classe e a comparação utilizada <label class="label type-hint type-hint-string">[function(value){ return {'2px solid red': value.age < 18} }]</label>
    *
    *
    *	  @param {Function} sort Parâmetro que contém uma função que será chamada para que o desenvolvedor possa fazer a ordenação dos registros.
    *	  @param {String} class Parâmetro para aplicar na table uma classe específica.
    *	  @param {Array} data Parâmetro que irá conter os dados que serão mostrados na tabela.
    *	  @param {Function} onClick Função que será executada quando o usuário clicar em um registro
    *	  @param {Function} onSort Função que será executada quando a ordenação for realizada
    *	  @param {Function} onDoubleClick Função que será executada quando o usuário clicar duas vezes em um registro.
    */


    function ctrl($scope, $element, $attrs, $transclude){
      function verifyEmpty($v,other){return (!$attrs.$v ? other : vm[$v])};
      var vm = this;
      // Valores utilizados pela aplicação
      vm.selectedIndexes = []
      vm.selectedItem;
      vm.selectedItemDir;
      vm.$parent = $scope.$parent;

      // Funções utilizadas
      vm.sortProxy = sortProxy;
      vm.selectRow = selectRow;
      vm.double = double;''
      vm.conditional = cond;
      vm.conditionalTableCell = conditionalTableCell;
      vm.selectAll = selectAll;
      // Valores que serão expostos no $scope
      $scope.$parent.selectedValues = [];
      $scope.$parent.itemsPerPage;
      // Número de itens na página
      vm.page = $scope.$parent.itemsPerPage;
      vm.data = vm.data || [];
      vm.usingData = angular.copy(vm.data) || [];
      vm.config = vm.config || {}
      vm.usingData.forEach(function(val){val.__checked = false;});
      vm.config.selection = vm.config.selection || 'single';
      vm.config.sortDefault = vm.config.sortDefault;
      vm.config.itemsPerPage = vm.config.itemsPerPage || [10,20,30,40,50];
      vm.config.columnsConfig = vm.config.columnsConfig || [];
      vm.config.conditional = vm.config.conditional || angular.noop;
      vm.config.sort = verifyEmpty('sort',angular.noop);
      vm.config.class = $attrs.class ? 'table ' + $attrs.class : 'table';
      vm.config.onClick = verifyEmpty('onClick',angular.noop);
      vm.config.onDoubleClick = verifyEmpty('onDoublelick',angular.noop);
      vm.config.onSort = verifyEmpty('onSort',angular.noop);
      if(vm.config.sortDefault)sortProxy(vm.config.sortDefault);

      if (vm.config.columns) {
        vm.config.columns = GumgaListHelper.ensureDefaultValues(vm.config.columns.split(','),vm.config.columnsConfig);
        vm.config.auxColumnsToSort = vm.config.columns;
      }
      $scope.$watch('vm.data', function() {
        if (vm.data.length > 0) {
          if (!vm.config.columns) {
            vm.config.columns = GumgaListHelper.loadDefaultColumns(vm.data[0]);
            vm.config.auxColumnsToSort = vm.config.columns;
          }
          copyData();
        }
      });
      function copyData() {
        $timeout(function() {
          vm.usingData = angular.copy(vm.data);
        });
      }
      $element.append($compile(GumgaListHelper.mountTable(vm.config))($scope));

      function selectAll(checkboxBoolean){
        cleanArrays();
        vm.usingData.forEach(function(data,index){
          data.__checked = checkboxBoolean;
          if(checkboxBoolean)pushToArrays(data,index);
        })
      }

      function findInOriginalArray(val){
        var copyWithoutCheckedAttributes = angular.copy(val);
        delete copyWithoutCheckedAttributes.__checked;
        return vm.data.filter(function(originalRegistry){
          return angular.equals(originalRegistry,copyWithoutCheckedAttributes);
        })[0];
      }
      function cleanArrays(){
        $scope.$parent.selectedValues = [];
        vm.selectedIndexes = [];
      }
      function pushToArrays(val,index){
        vm.selectedIndexes.push(index);
        $scope.$parent.selectedValues.push(findInOriginalArray(val));
      }
      function setEveryCheckedToBoolean(bool){
        vm.usingData.forEach(function(elm){
          elm.__checked = bool;
        })
      }
      function cleanValueAndArrays(clause,value){
        if(clause){
          setEveryCheckedToBoolean(false);
          cleanArrays();
        }
        if(value) value = false;
      }


      function selectRow(ngRepeatIndex,ngRepeatValue,$event){
        if($event.target.type == 'button' || $event.target.tagName == 'A'){
          $event.stopPropagation();
          return null;
        }
        var selectedValues = $scope.$parent.selectedValues;
        cleanValueAndArrays(vm.checkAll,vm.checkAll);
        if($attrs.onClick)vm.onClick({value: ngRepeatValue});
        if(vm.config.selection == 'single'){
          if(ngRepeatValue.__checked){
            ngRepeatValue.__checked = false;
            cleanArrays();
          } else {
            cleanValueAndArrays(vm.selectedIndexes.length > 0)
            pushToArrays(ngRepeatValue,ngRepeatIndex);
            ngRepeatValue.__checked = true;
          }
        } else {
          ngRepeatValue.__checked = vm.selectedIndexes.filter(function(val){return val == ngRepeatIndex}).length < 1;
          if((ngRepeatValue.__checked) || vm.selectedIndexes.length == 0 ){
            pushToArrays(ngRepeatValue,ngRepeatIndex);
            return 0;
          }
          var indexOfValueSelected;
          selectedValues.forEach(function(val,indx){
            if(angular.equals(val,ngRepeatValue)) indexOfValueSelected = indx;
          })
          selectedValues.splice(indexOfValueSelected, 1);
          vm.selectedIndexes.splice(vm.selectedIndexes.indexOf(ngRepeatIndex),1);
        }
      }

      function sortProxy(field){
        if($attrs.onSort) vm.onSort({field: vm.selectedItem, dir: vm.selectedItemDir});
        if(!$attrs.sort) throw 'You have to pass a sort function to GumgaList [sort="sort(field,dir)"]';
        vm.selectedItem = field;
        vm.selectedItemDir == 'asc' ? vm.selectedItemDir = 'desc' : vm.selectedItemDir = 'asc';
        vm.sort({field: vm.selectedItem, dir: vm.selectedItemDir});
      }

      function double(value){
        if($attrs.onDoubleClick) vm.onDoubleClick({value: value});
      }

      function conditionalTableCell(value,ordering){
        var columnToGetTheConditional = vm.config.columns.filter(function(val){return val.name == ordering});
        if(columnToGetTheConditional[0]){
          var obj = columnToGetTheConditional[0].conditional(value)
          ,   trueValue, falseValue;
          for(var key in obj){
            if(obj[key] === true){
              trueValue = key;
            } else {
              falseValue = key;
            }
          }
          return '\"'.concat(trueValue).concat('\"');
        }
        return '\'\'';
      };

      function cond(value){
        var obj = vm.config.conditional(value),trueValue
        ,   falseValue;
        for(var key in obj){
          obj[key] === true ?trueValue = key : falseValue = key;
        }
        if(trueValue){
          return '\"'.concat(trueValue).concat('\"');
        }
        return '\'\'';
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
