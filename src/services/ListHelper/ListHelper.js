(function(){

  function ListHelper(){
    return {
      'ensureDefaultValues': function(arr){
        return arr.map(function(item,$index){
          return {
            title : item.title,
            size: item.size || 'col-md-3',
            ordering: item.ordering || $index,
            content: item.content,
            sortable: (item.sortable === true || item.sortable === false? item.sortable : true),
            conditional: item.conditional || angular.noop
          }
        })
      },
      'loadDefaultColumns': function(firstObject){
        return Object.keys(firstObject).map(function(key,$index){
          return {
            title: key.toUpperCase(),
            size: 'col-md-3',
            ordering: ($index),
            content: '{{$value.' + key + '}}',
            sortable: true,
            conditional: angular.noop
          }
        })
      },
      'mountTable':function (configuration) {
        var message = "";
        message += '<table class="'+ configuration.class +'">\n';
        message += '\t<tr>\n';
        message = configuration.columns.reduce(function(prev, next){
          return prev+= '\t\t<td class="'+ next.size +'" ng-click="vm.sort()">' + next.title + '</td>\n';
        },message)
        message += '\t</tr>\n';
        message += '</table>\n';
        console.log(message);
      }
    }
  }

  angular.module('gumga.services.listhelper',[])
  .factory('GumgaListHelper',ListHelper);

})();
