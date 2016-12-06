ToOneController.$inject = ['gumgaController','GumgaRest','GumgaBrowseRecords','$scope','$state', '$stateParams']
function ToOneController(gumgaController, GumgaRest, GumgaBrowseRecords, $scope, $state, $stateParams) {
  var BankService = new GumgaRest('http://localhost:8040/finance-api/api/individual');
  // console.log(IndividualService)
  gumgaController.createRestMethods($scope, BankService, 'bank');
  
  $scope.bank.methods.get(0)
    .on('getSuccess', function(response) {
      console.log(response)
    })
  $scope.fields = ['name','number']
  $scope.change = function() {
    console.log('bla')
  }
  // $scope.individual.methods.getId($stateParams.id)
  //   .on('getIdSuccess', function(response) {
  //     $scope.record = response
  //   })
}

angular
  .module('gumgaMany')
  .controller('ToOneController', ToOneController)