controller.$inject = ['$scope']
function controller($scope) {
  $scope.foo = function() {
    console.log('foo')
  }
  $scope.dis = function() {
    console.log('dis')
  }
}

angular
  .module('gumgaAlert')
  .controller('viewController', controller)