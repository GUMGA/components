(function(){
  'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:gumgaTable
   * @restrict E
   * @description O componente **GumgaTable** serve para expor dados em forma de tabela.
   * O componente expõe no $scope.selectedEntities um array contendo os objetos das linhas selecionadas para que o desenvolvedor possa usa-los em ações.
   *
   * @example
   * Um exemplo da directive gumgaTable funcionando pode ser encontrado [aqui](http://embed.plnkr.co/SALkp5bKRZ1aywsrpmEX).
   *  <pre>
   *    <gumga-table values="list" columns="name,age"></gumga-table>
   *    <script>
   *    $scope.list = [{name: 'Guilherme', age: 28},{name: 'Igor', age: 19}];
   *    </script>
   *  </pre>
   *
   * @param {String} values Atributo obrigatório. Deve ser o nome do array exposto no $scope para popular a tabela.
   * @param {String} columns Atributo obrigatório. As propriedades do objeto que serão apresentados como colunas na tabela,
   * @param {String} size Possuem 3 opções de tamanhos, **large**, **medium** e **small**, que respectivamente ocupam, todo o espaço da row, dois terços e
   * um terço. O valor padrão é large.
   * @param {String} translate-entity Nome da entidade.
   * @param {Array} pages Deve conter os valores para apresentar opções de registros por página.
   * @param {String} table-class Possuem 3 opções, **bordered**, **striped** e **condensed**, que respectivamente, adiciona bordas a tabela,
   * alterna cores das linhas e diminui o espaçamento interno das linhas e colunas. O valor padrão é bordered.
   * o componente seguirá a ordem de colunas adicionada ao atributo.
   * @param {Boolean} multi-selection É true por padrão, determina a possibilidade da seleção de várias entidades ou apenas
   * uma por vez.
   * @param {Function} sort-function Nome da função atribuida ao $scope para manipular a ordenação, a função recebe dois
   * parâmetros, **field** e **way** que serão, a coluna e a direção da ordenação respectivamente, existem duas direções,
   * **asc** ou **desc**.
   * @param {String} sort-default Deve conter a **coluna** e a **direção** separados por virgula, será a ordenação padrão na primeira exibição da tabela.
   * @param {Expression} row-class Deve conter uma expressão condicional para marcar determinadas linhas correspondentes como
   * verdadeiras perante a expressão.
   * @param {Function} onSelect Nome da função que será executada ao evento click.
   * @param {Function} onSort Nome da função que será executada ao evento de sort.
   */
   Table.$inject = ['GumgaUtils', '$compile','$rootScope','$state','GumgaKeyboard','$timeout'];
   function Table(GumgaUtils, $compile,$rootScope,$state,GumgaKeyboard,$timeout) {
    return {
      restrict: 'E',
      scope: {
        multi: '=?multiSelection',
        list: '=values',
        pages: '=pages',
        sort: '&?sortFunction',
        rowClass: '=?',
        onSelect: '&?',
        onSort: '&?'
      },
      link: LinkFn,
      transclude: true
    };

    function LinkFn(scope, elm, attrs, ctrl, transcludeFn) {
      var eventHandler = {
        select: (attrs.onSelect ? scope.onSelect : angular.noop),
        sort: (attrs.onSort ? scope.onSort: angular.noop)
      };

      scope.$on('_clean',function(){
       scope.cleanSearch();
     });

      var ColumnObject = {};
      scope.indexes = [];
      scope.trs = [];
      scope.$parent.selectedEntities = [];
      scope.objectColumn = [];
      scope.conditionalColumns = [];
      var rawTableConfig = {
        multi: scope.multi,
        list: [],
        pages: scope.pages || [10, 25, 50],
        sortFn: attrs.sort? scope.sort : angular.noop,
        sortDf: !!attrs.sortDefault? attrs.sortDefault.split(',') : false,
        size: attrs.size || 'large',
        class: attrs.tableClass || 'bordered',
        columns: attrs.columns.split(','),
        headings: [],
        translate: attrs.translateEntity,
      };
      var itemsPerPage = window.sessionStorage.getItem('itemsPerPage') || rawTableConfig.pages[0];
      scope.itemsPerPage = itemsPerPage;
      scope.$parent.itemsPerPage = itemsPerPage;

      scope.$watch('list', function () {
        if (scope.list) {
          scope.$parent.selectedEntities = [];
          scope.tableconfig.list = scope.list;
          scope.indexes = [];

        }
      });

      setColumnConfig(rawTableConfig);

      function setColumnConfig(rawConfig) {
        rawConfig.columns.forEach(function (elm) {
          var obj = {
            label: GumgaUtils.camelCase(elm),
            field: elm
          };
          rawConfig.headings.push({label: obj.label, way: null});
          rawConfig.columns.splice(rawConfig.columns.indexOf(elm), 1, obj);
        });

        transcludeFn(function (clone) {
          angular.forEach(clone, function (cloneEl) {
            if (cloneEl.nodeName != "#text") {
              switch (cloneEl.nodeName) {
                case 'GUMGA-BOOLEAN-MASK':
                rawConfig.columns.forEach(function (obj) {
                  if (obj.field == cloneEl.getAttribute('column')) {
                    $.extend(obj, {
                      trueValue: cloneEl.getAttribute('boolean-true'),
                      falseValue: cloneEl.getAttribute('boolean-false')
                    });
                  }
                });
                break;
                case 'BUTTONS-COLUMN':
                scope.buttonElements = cloneEl.children;
                rawConfig.headings.push({label: ' ', way: null});
                break;
                case 'EXTRA-COLUMN':
                scope.extraElements = cloneEl.children;
                rawConfig.headings.push({label: ' ', way: null});
                break;
                case 'OBJECT-COLUMN':
                scope.objectColumn.push({column: cloneEl.getAttribute('column'),value: cloneEl.getAttribute('property')});
                break;
                case 'COLUMN-CLASS':
                scope.conditionalColumns.push({column: cloneEl.getAttribute('column'),conditional: cloneEl.getAttribute('conditional-class')});
                break;

              }
            }
          });
});
scope.tableconfig = rawConfig;
generateTable(scope.tableconfig);
}
function getConditions(){
  var conditionText = attrs.rowClass || '';
  return conditionText.replace(/{/,'').replace(/}/,'').split(',');
}
function generateTable(config) {
  var template = [];
  if (scope.pages) {
    var pagination =
    '<select ng-model="itemsPerPage" ng-change="changeItemsPerPage(itemsPerPage)">' +
    '<option ng-repeat="p in pages" value="{{ p }}" ng-selected="p == itemsPerPage">{{ p }}</option>' +
    '</select>';
    template.push(pagination);
  }
  switch (config.size) {
    case 'large':
    template.push(
      '<div class="full-width-without-padding" style="margin-top: 1%">' +
      '<button class="btn btn-default btn-xs" style="margin-bottom: 0.25%" ng-click="selectAll()">Selecionar todos</button>' +
      '<button class="btn btn-default btn-xs" style="margin-bottom: 0.25%;margin-left:0.25%" ng-click="cleanSearch()"> Limpar pesquisa</button>' +
      '<table class="table table-' + config.class + ' ">');
    break;
    case 'medium':
    template.push(
      '<div class="col-md-8" style="padding-left:0;padding-right: 0;">' +
      '<table class="table table-' + config.class + '">');
    break;
    case 'small':
    template.push(
      '<div class="col-md-4" style="padding-left:0;padding-right: 0;">' +
      '<table class="table table-' + config.class + '">');
    break;
  }
  template.push('<thead>');
  template.push('<tr>');
  if (attrs.sortFunction) {
    template.push(' <td ng-repeat="head in tableconfig.headings track by $index" ng-click="head.label !== \' \' ? sortAux(head) : \'\'"');
    template.push('     ng-class="head.label != \' \' ? \'clickable-td\' : \' \' ">');
    template.push('         <small>{{::head.label}}<i ng-class="(head.way != null && head.label !== \' \') ? (head.way === true ? \'glyphicon glyphicon-menu-up\' : \'glyphicon glyphicon-menu-down\') : \'\'"></i></small></td>');
  } else {
    template.push('<td ng-repeat="head in tableconfig.headings track by $index">{{::head.label}}');
  }
  template.push(' </td>');
  template.push('</tr>');
  template.push('</thead>');
  template.push('<tbody>');
  if (config.multi === false) {
    template.push('<tr style="{{::getClassFromConditionalRow(entity)}}" ng-class="returnClass($index)" ng-repeat="entity in tableconfig.list" class="used" ng-click="handleSingle(entity,$index)" ng-dblclick="goToEdit(entity.id)">' + generateTableCell(config) + '</tr>');
  } else {
    template.push('<tr style="{{::getClassFromConditionalRow(entity)}}" ng-class="returnClass($index)" ng-repeat="entity in tableconfig.list" class="used" ng-click="handleMultiple(entity,$index)" ng-dblclick="goToEdit(entity.id)" >' + generateTableCell(config) + '</tr>');
  }
  template.push('</tbody>');
  template.push('</table></div>');
  elm.append($compile(template.join('\n'))(scope));

}
var selected = false;

scope.goToEdit = function(index){
  $state.go(scope.tableconfig.translate + '.' + 'edit',{id: index});
};
scope.changeItemsPerPage = function(itemsPerPage){
  window.sessionStorage.setItem('itemsPerPage', itemsPerPage);
  scope.$parent.itemsPerPage = itemsPerPage;
};
scope.selectAll = function(){
  if(!selected){
    for(var i = 0, len = scope.tableconfig.list.length;i < len;i++){
      scope.indexes.push(i);
    }
    scope.$parent.selectedEntities = scope.tableconfig.list;
  } else {
    scope.indexes = [];
    scope.$parent.selectedEntities = [];
  }
  selected = !selected;
};


scope.cleanSearch = function(){
  $rootScope.$broadcast('normal',{field:scope.tableconfig.columns[1],param: ''});
  scope.tableconfig.headings.forEach(function(elm){
    elm.way = null;
  })
};

scope.getClassFromConditionalRow = function (entity){
  var HelperObject = {};
  var conditionsFromTag = getConditions();
  conditionsFromTag.forEach(function(elm){
    HelperObject[elm.split(':')[0]] = eval(elm.split(':')[1]);
  });
  for(var key in HelperObject) if(HelperObject.hasOwnProperty(key) && HelperObject[key] === true){
    return 'border-left: 3px solid ' + key.trim();
  }
  return '';
};

function checkObject(field){
  for(var i = 0; i < scope.objectColumn.length;i++){
    if(scope.objectColumn[i].column === field){
      return '{{::entity.'+  scope.objectColumn[i].value +'}}';
    }
  }
  return -1;
}

function getClassFromConditionalCell(column,entity){
  scope.conditionalColumns.forEach(function(elm){
    if(elm.column.toLowerCase().trim() === column.toLowerCase().trim()){
      ColumnObject[elm.column] = {};
      elm.conditional.replace(/{/,'').replace(/}/,'').split(',')
      .forEach(function(arg){
        var x = arg.split(':');
        ColumnObject[elm.column][x[0].trim().replace(/"/g,'')] = x[1].trim();
      })
    }
  });
}


scope.getStyleFromCell = function(entity,column){
  if(ColumnObject[column.trim().toLowerCase()]){
    var auxObj = ColumnObject[column.trim().toLowerCase()];
    for(var key in auxObj) if(auxObj.hasOwnProperty(key) && eval(auxObj[key]) === true){
      return 'border-left: 3px solid ' + key.trim();
    }
  }
};

function generateTableCell(config) {
  var template = [];
  config.columns.forEach(function (elm) {
    getClassFromConditionalCell(elm.field);
    if (elm.trueValue) {
      template.push('<td style="{{::getStyleFromCell(entity,\' '+ elm.field + ' \')}}">{{::entity.' + elm.field + ' === true? \'' + elm.trueValue + '\' : \'' + elm.falseValue + '\'}}</td>');
    } else if(checkObject(elm.field) != -1){
      template.push('<td style="{{::getStyleFromCell(entity,\' '+ elm.field + ' \')}}">' + checkObject(elm.field) +' </td>');
    } else {
      template.push('<td style="{{::getStyleFromCell(entity,\' '+ elm.field + ' \')}}">{{::entity.'+ elm.field + '}} </td>');
    }
  });
  if (scope.buttonElements) {
    template.push('<td style="{{::getStyleFromCell(entity,\' '+ elm.field + ' \')}}">' + getSpecial(scope.buttonElements) + '</td>');
  }
  if (scope.extraElements) {
    template.push('<td style="{{::getStyleFromCell(entity,\' '+ elm.field + ' \')}}">' + getSpecial(scope.extraElements) + '</td>');
  }
  return template.join(' ');
}


function getSpecial(array) {
  var txt = [];
  angular.forEach(array, function (elm) {
    txt.push(elm.outerHTML);
  });
  return txt.join(' ');
}

            // Negação dupla transforma em boolean
            if (!!rawTableConfig.sortDf) {
              // Se houver o atributo sort-default monta o objeto e dispara o evento
              var objSortDefault = {
                field: rawTableConfig.sortDf[0],
                way: rawTableConfig.sortDf[1]
              };
              eventHandler.sort({field: objSortDefault.field});
              scope.sort(objSortDefault);
            }

            scope.sortAux = function (obj) {
                //Quando ele clica, ele verifica se já existe alguma coluna com sort, se já existir, retorna ela para null
                scope.tableconfig.headings.forEach(function (key) {
                  if (key != obj) {
                    if (key.way === true || key.way === false) {
                      key.way = null;
                    }
                  }
                });
                // Pega o index do objeto
                var index = scope.tableconfig.headings.indexOf(obj);
                //Seta o sort dele pra false ou true
                obj.way = !obj.way;
                //Remove da lista anterior o antigo e coloca o novo
                scope.tableconfig.headings.splice(index, 1, obj);
                var aux;
                // Se for true, é ascendente
                if (obj.way === true) {
                  aux = 'asc';
                } else {
                  aux = 'desc';
                }
                // Dispara o evento
                eventHandler.sort({field: obj.label.toLowerCase()});
                scope.sort({field: obj.label.toLowerCase(), way: aux});
              };

              scope.handleMultiple = function (entity, index) {
                if (GumgaUtils.areNotEqualInArray(scope.indexes, index) || scope.indexes.length < 1) {
                  scope.indexes.push(index);
                  scope.$parent.selectedEntities.push(entity);
                } else {
                  scope.indexes.splice(scope.indexes.indexOf(index), 1);
                  scope.$parent.selectedEntities.splice(scope.$parent.selectedEntities.indexOf(entity), 1);
                }
                eventHandler.select({selected: scope.$parent.selectedEntities});
              };

              scope.handleSingle = function (entity, index) {
                if (scope.indexes.length >= 1) {
                  scope.indexes = [];
                  scope.$parent.selectedEntities = [];
                }
                scope.selectedIndex = index;
                scope.indexes.push(index);
                scope.$parent.selectedEntities.push(entity);
                eventHandler.select({selected: scope.$parent.selectedEntities});
              };

              scope.returnClass = function (index) {
                if (!GumgaUtils.areNotEqualInArray(scope.indexes, index)) {
                  return 'info';
                }
                return '';
              };
            }
          }

          angular.module('gumga.directives.table',[])
          .directive('gumgaTable',Table);
        })();
