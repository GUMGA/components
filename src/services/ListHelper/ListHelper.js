(function(){

  function ListHelper(){
    return {
      'aux': [],
      'returnColumnConfig': function(item,config){
        var itemConfig = config.filter(function(val){ return val.name.toLowerCase().trim() == item.toLowerCase().trim()})[0] || {};
        return {
          title: itemConfig.title || item.toUpperCase(),
          size: itemConfig.size || '',
          name: itemConfig.name || item,
          content: this.contentWithoutParent(itemConfig.content,item),
          sortField: itemConfig.sortField || null,
          conditional: itemConfig.conditional || angular.noop
        }
      },
      'contentWithoutParent':function(content,item){
        if(content && content.indexOf('type="button"') != -1 && content.indexOf('ng-click="') != -1){
          return content.replace(/ng-click="/gi,'ng-click="$parent.$parent.');;
        }
        if(content){
          return content;
        }
        return '{{$value.'+item+'}}';
      },
      'ensureDefaultValues': function(arr,config){
        var self = this;
        return arr.map(function(item,$index){
          return self.returnColumnConfig(item,config);
        })
      },
      'loadDefaultColumns': function(firstObject){
        return Object.keys(firstObject).map(function(key,$index){
          if(key != '__checked'){
            return {
              title: key.toUpperCase(),
              size: '',
              name: 'key',
              content: '{{$value.' + key + '}}',
              sortField: null,
              conditional: angular.noop
            }
          }
        })
      },
      'sortColumns': function(aux,columns){
        return columns.sort(function(value1,value2){
          (aux.indexOf(value1.name) - aux.indexOf(value2.name))
        })
      },
      'addCheckbox': function(){
        return {
          title: '<label><input type="checkbox" ng-model="vm.checkAll" ng-change="vm.selectAll(vm.checkAll)"/></label>',
          size: 'col-md-1',
          name:'__checkbox',
          content: '<input name="__checkbox" type="checkbox" ng-model="$value.__checked"/>',
          sortField: null,
          conditional: angular.noop
        };
      },
      'mountTable':function (configuration) {
        function returnFormattableGlyphicon(string){
          return '<i ng-class="vm.selectedItem == \'' + string +'\' ? (vm.selectedItemDir == \'asc\' ? \'glyphicon glyphicon-menu-up\' : \'glyphicon glyphicon-menu-down\' ): \'\'"></i>';
        }
        function returnFormattableTableHeader(bool,string,sf){
          if(bool){
            return '<button type="button" class=" btn btn-link" ng-click="vm.sortProxy(\''+ sf +'\',' + '\''.concat(sf).concat('\'') +')">' + string + returnFormattableGlyphicon(sf) + '</button>';
          }
          return string;
        }
        function mountHeader(prev, next){
          return prev+= '\t\t<td class="'+ next.size +'" >' + returnFormattableTableHeader(!!next.sortField,next.title,next.sortField) + '</td>\n';
        }
        function mountAllTableCell(prev,next){
          return prev += '<td ng-style="{borderLeft: {{::vm.conditionalTableCell($value,\''+ next.name +'\')}} }">' + next.content +'</td>';
        }

        configuration.columns.unshift(this.addCheckbox());
        configuration.columns = this.sortColumns(configuration.auxColumnsToSort, configuration.columns);
        var message = '';
        if(configuration.itemsPerPage){
          message = '<select ng-options="item for item in vm.config.itemsPerPage" ng-model="vm.$parent.itemsPerPage"></select>';
        }
        message += '<table class="'+ configuration.class +'">\n';
        message += '<thead>';
        message += '\t<tr>\n';
        message = configuration.columns.reduce(mountHeader.bind(this),message);
        message += '\t</tr>\n';
        message += '</thead>';
        message += '<tbody>';
        message += '<tr ng-style="{borderLeft: {{::vm.conditional($value)}} }"  ng-dblclick="vm.double($value)" ng-class="$value.__checked ? \'active\' : \'\'" ng-repeat="$value in vm.usingData track by $index" ng-click="vm.selectRow($index,$value,$event)" >';
        message += configuration.columns.reduce(mountAllTableCell,'');
        message += '</tr>';
        message += '</tbody>';
        message += '</table>\n';
        return message;
      }
    }
  }

  angular.module('gumga.services.listhelper',[])
  .factory('GumgaListHelper',ListHelper);

})();
