(function(){

  function ListHelper(){
    return {
      'ensureDefaultValues': function(arr){
        return arr.map(function(item,$index){
          return {
            title : item.title,
            size: item.size || '',
            ordering: (!!item.ordering || item.ordering == 0 ? item.ordering : $index),
            content: item.content,
            sortField: item.sortField || null,
            conditional: item.conditional || angular.noop
          }
        })
      },
      'loadDefaultColumns': function(firstObject){
        return Object.keys(firstObject).map(function(key,$index){
          return {
            title: key.toUpperCase(),
            size: '',
            ordering: ($index),
            content: '{{$value.' + key + '}}',
            sortField: null,
            conditional: angular.noop
          }
        })
      },
      'sortColumns': function(prev,next){
        if(prev.ordering < next.ordering)
        return -1;
        if(prev.ordering > next.ordering)
        return 1;
        return 0;
      },
      'mountTable':function (configuration) {

        function returnFormattableTd(bool,string,sf){
          if(bool)
            return '<button type="button" class=" btn btn-link" ng-click="vm.sort('+ '\''.concat(sf).concat('\'') +')">' + string +'<i ng-class></i>'+ '</button>';
          return string;
        }
        function mountTd(prev, next){
          next.sortField = 'field';
          return prev+= '\t\t<td class="'+ next.size +'" >' + returnFormattableTd(!!next.sortField,next.title,next.sortField) + '</td>\n';
        }
        configuration.columns.unshift({
          title: '',
          size: 'col-md-1',
          ordering: -1,
          content: '<input type="checkbox" ng-model="$value.checked" />',
          sortField: null,
          conditional: angular.noop
        });
        function returnAllTd(prev,next){
          return prev += '<td>' + next.content +'</td>';
        }
        var message = "";
        message += '<table class="'+ configuration.class +'">\n';
        message += '<thead>';
        message += '\t<tr>\n';
        message = configuration.columns.sort(this.sortColumns).reduce(mountTd.bind(this),message);
        message += '\t</tr>\n';
        message += '</thead>';
        message += '<tbody>';
        message += '<tr ng-repeat="$value in vm.data track by $index" ng-click="vm.selectRow($index,$value)" >';
        message += configuration.columns.reduce(returnAllTd,'');
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
