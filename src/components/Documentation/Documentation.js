(function(){

  Documentation.$inject = ['$interpolate', '$uibModal']

  function Documentation($interpolate, $uibModal){

    controller.$inject =['$scope', '$element', '$attrs']

    function controller($scope, $element, $attrs) {
      let ctrl = this
      
    }

    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller
    }
  }

  angular.module('gumga.documentation', [])
    .directive('gumgaDocumentation', Documentation)
})()
