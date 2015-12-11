(function () {
  'use strict';

  List.$inject = ['GumgaListHelper','$compile','$timeout'];

  function List(GumgaListHelper,$compile,$timeout){

    ctrl.$inject = ['$scope','$element', '$attrs'];

    function ctrl($scope, $element, $attrs){
      function verifyEmpty($v,other){return (!$attrs.$v ? other : vm[$v])};
      var vm = this;

      vm.selectedIndexes = []
      vm.selectedItem;
      vm.selectedItemDir;
      vm.$parent = $scope.$parent;


      vm.sortProxy = sortProxy;
      vm.selectRow = selectRow;
      vm.double = double;
      vm.conditional = cond;
      vm.conditionalTableCell = conditionalTableCell;
      vm.selectAll = selectAll;

      $scope.$parent.selectedValues = [];
      $scope.$parent.itemsPerPage;

      vm.page = $scope.$parent.itemsPerPage;
      vm.data = vm.data || [];
      vm.usingData = angular.copy(vm.data) || [];
      vm.config = vm.config || {}
      vm.usingData.forEach(function(val){val.__checked = false;});
      vm.config.selection = vm.config.selection || 'single';
      vm.config.sortDefault = vm.config.sortDefault;
      vm.config.itemsPerPage = vm.config.itemsPerPage || null;
      vm.config.columns = vm.config.columns || [];
      vm.config.columnsConfig = vm.config.columnsConfig || [];
      vm.config.conditional = vm.config.conditional || angular.noop;
      vm.config.sort = verifyEmpty('sort',angular.noop);
      vm.config.class = $attrs.class ? 'table ' + $attrs.class : 'table';
      vm.config.checkbox = vm.config.checkbox;
      vm.config.onClick = verifyEmpty('onClick',angular.noop);
      vm.config.onDoubleClick = verifyEmpty('onDoublelick',angular.noop);
      vm.config.onSort = verifyEmpty('onSort',angular.noop);
      if(vm.config.sortDefault)sortProxy(vm.config.sortDefault);

      if (vm.config.columns) {
        vm.config.columns = GumgaListHelper.ensureDefaultValues(vm.config.columns.split(','),vm.config.columnsConfig);
        vm.config.auxColumnsToSort = vm.config.columns;
      }

      $scope.$watch('vm.data', function() {
        if (vm.data && vm.data.length > 0) {
          if (!vm.config.columns) {
            vm.config.columns = GumgaListHelper.loadDefaultColumns(vm.data[0]);
            vm.config.auxColumnsToSort = vm.config.columns;
          }
        }
        copyData();
      }, true);

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
        if($attrs.onClick)vm.onClick({$value: ngRepeatValue});
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
          var auxiliarObject = angular.copy(ngRepeatValue);
          delete auxiliarObject.__checked;
          selectedValues.forEach(function(val,indx){
            if(angular.equals(val, auxiliarObject)){
              indexOfValueSelected = indx;
            }
          })
          selectedValues.splice(indexOfValueSelected, 1);
          vm.selectedIndexes.splice(vm.selectedIndexes.indexOf(ngRepeatIndex) ,1);
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
        if($attrs.onDoubleClick) vm.onDoubleClick({$value: value});
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
