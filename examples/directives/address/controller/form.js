formController.$inject = ['gumgaController','$scope','$state', '$stateParams', '$http', '$timeout', 'UserService']
function formController(gumgaController, $scope, $state, $stateParams, $http, $timeout, UserService) {
  $scope.pessoa = {
    data: {
      endereco: {}
    }
  }
  console.log($scope.pessoa)
}

angular
  .module('address')
  .controller('formController', formController)