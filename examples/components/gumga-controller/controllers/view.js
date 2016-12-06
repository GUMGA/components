controller.$inject = ['gumgaController','GumgaRest','GumgaBrowseRecords','$scope','$state', '$stateParams']
function controller(gumgaController, GumgaRest, GumgaBrowseRecords, $scope, $state, $stateParams) {
  var IndividualService = new GumgaRest('http://192.168.25.194:8084/finance-api/api/individual');
  gumgaController.createRestMethods($scope, IndividualService, 'individual');
  
  $scope.individual.methods.getId($stateParams.id)
    .on('getIdSuccess', function(response) {
      $scope.record = response
    })
}

angular
  .module('gumgaController')
  .controller('viewController', controller)