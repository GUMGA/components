'use strict';

ListCreator.$inject = [];
//TODO: Otimizar estas funções de criação de HTML.
function ListCreator(){
  const itemsPerPage = `
    <div class="row">
      <div class="col-md-offset-9 col-md-2">
        <div class="text-right" style="line-height: 30px">
          <span gumga-translate-tag="gumgalist.itemsperpage"></span>
        </div>
      </div>
      <div class="col-md-1">
        <select class="form-control input-sm" ng-options="item for item in ctrl.config.itemsPerPage" ng-model="ctrl.selectedItemPerPage">
        </select>
      </div>
    </div>`;

  function formatTableHeader(sortField, title) {
    let templateWithSort = `
      <a ng-click="ctrl.doSort('${sortField}')" class="th-sort">
        ${title}
        <span ng-show="ctrl.activeSorted.column  == '${sortField}'" ng-class="ctrl.activeSorted.direction == 'asc' ? 'dropup' : ' ' ">
          <span class="caret"></span>
        </span>
      </a>`;
    return !!sortField ? templateWithSort : title;
  }

  function generateHeader(config) {
    if (config.headers) {
      return `
        <thead>
          <tr>
            ${generateHeaderColumns(config.columnsConfig)}
          </tr>
        </thead>
      `
    } else { return '' }
  }

  function generateHeaderColumns(columnsArray = [], hasCheckbox = true){
    return columnsArray.reduce((prev, next) => {
      return prev += `
        <th style="${next.style || ' '}" class="${next.size || ' '} ${next.customTitleClass || ' '}">
          <strong>
            ${formatTableHeader(next.sortField, next.title)}
          </strong>
        </th>`
    },' ')
  }

  function generateBody(columnsArray){
    return columnsArray.reduce((prev, next) => {
      return prev +=`
        <td class="${next.size}" ng-style="{'border-left': {{ ctrl.conditionalTableCell($value,'${next.name}') }} }"> ${next.content}</td>`;
    }, ' ')
  }

  function mountTable(config, className){
    if(config.checkbox){
      config.columnsConfig.unshift({
       title: `<input type="checkbox" ng-model="ctrl.checkAll" ng-change="ctrl.selectAll(ctrl.checkAll)" ng-if="'${config.selection}' === 'multi'"/>`,
       name:'$checkbox',
       content: '<input name="$checkbox" type="checkbox" ng-model="ctrl.selectedMap[$index].checkbox"/>',
       size:'col-md-1',
       conditional: angular.noop
     })
    }
    return `
      ${config.itemsPerPage.length > 0 ? itemsPerPage : ' '}
      <div class="table-responsive">
        <table class="${className}">
          <thead>
            <tr>
              ${generateHeader(config)}
            </tr>
          </thead>
          <tbody>
          <tr ng-style="{ 'border-left': {{ ctrl.conditional($value) }} }" ng-dblclick="ctrl.doubleClick($value)" ng-class="ctrl.selectedMap[$index].checkbox ? 'active active-list' : ''"
              ng-repeat="$value in ctrl.data track by $index" ng-click="ctrl.select($index,$event)">
              ${generateBody(config.columnsConfig)}
            </tr>
          </tbody>
        </table>
      </div>`;
  }


  return { mountTable };
}

angular.module('gumga.list.creator', [])
  .factory('listCreator', ListCreator);
