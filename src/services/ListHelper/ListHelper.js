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
          name:'__checkbox',
          content: '<input name="__checkbox" type="checkbox" ng-model="$value.__checked"/>',
          sortField: null,
          style:'width: .5%; padding-bottom: 0',
          conditional: angular.noop
        };
      },
      'mountTable':function (configuration) {
        function returnFormattableGlyphicon(string){
          return '<span ng-show="vm.selectedItem == \'' + string +'\'" ng-class="vm.selectedItem == \'' + string +'\' ? (vm.selectedItemDir == \'asc\' ? \'dropup\' : \'\' ): \'\'"><span class="caret"></span></span>'
        }
        function returnFormattableTableHeader(bool,string,sf){
          if(bool){
            return '<a type="button" ng-click="vm.sortProxy(\''+ sf +'\',' + '\''.concat(sf).concat('\'') +')">' + string + returnFormattableGlyphicon(sf) + '</a></strong>';
          }
          return string;
        }
        function mountHeader(prev, next){
          return prev+= '\t\t<th style="' + next.style + '" class="'+ next.size +'" ><strong>' + returnFormattableTableHeader(!!next.sortField,next.title,next.sortField) + '</strong></th>\n';
        }
        function mountAllTableCell(prev,next){
          return prev += '<td ng-style="{borderLeft: {{::vm.conditionalTableCell($value,\''+ next.name +'\')}} }">' + next.content +'</td>';
        }

        if (configuration.checkbox) {
          configuration.columns.unshift(this.addCheckbox());
        }
        var message = '';
        configuration.columns = this.sortColumns(configuration.auxColumnsToSort, configuration.columns);
        if(configuration.itemsPerPage){
          message += '<div style="width: 4%"><select class="form-control input-sm" ng-options="item for item in vm.config.itemsPerPage" ng-model="vm.$parent.itemsPerPage"></select></div>';
        }
        message += '<div class="table-responsive">'
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
        message += '</div>'
        return message;
      }
    }
  }

  angular.module('gumga.services.listhelper',[])
  .factory('GumgaListHelper',ListHelper);

})();
