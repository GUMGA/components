listController.$inject = ['gumgaController','GumgaRest','GumgaBrowseRecords','$scope','$state', '$stateParams']
function listController(gumgaController, GumgaRest, GumgaBrowseRecords, $scope, $state, $stateParams) {
  var IndividualService = new GumgaRest('http://192.168.25.194:8084/finance-api/api/individual');
  
  gumgaController.createRestMethods($scope, IndividualService, 'individual');
  // $scope.page = $stateParams.page || 1
  // $scope.page = GumgaBrowseRecords.getPage()
  // console.log(GumgaBrowseRecords.getPage());
  // $scope.individual.methods.get(GumgaBrowseRecords.getPage());
  $scope.individual.methods.get();
  
  $scope.pageChanged = function() {
    $scope.individual.methods.get($scope.page);
    // console.log('change ',$scope.page)
    // $scope.individual.methods.get($scope.page)
    // GumgaBrowseRecords.setPage($scope.page)
  }
  
  $scope.tableConfig = {
    columns: 'name, view',
    checkbox: true,
    maxHeight: '250px',
    selection: "multi",
    columnsConfig: [
      {
        name: 'name',
        title: 'Name',
        content: '{{$value.name}}',
        sortField: 'name'
      },
      {
        name: 'view',
        title: ' ',
        content: '<span class="pull-right"><a uib-tooltip="View" class="btn btn-primary btn-sm" ui-sref="gumgaController.view({id: $value.id })"><i class="glyphicon glyphicon-eye-open"></i></a></span>'
      }
    ]
  }
}

angular
  .module('gumgaController')
  .controller('listController', listController)