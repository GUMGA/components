formController.$inject = ['gumgaController','$scope','$state', '$stateParams', '$http', '$timeout', 'UserService']
function formController(gumgaController, $scope, $state, $stateParams, $http, $timeout, UserService) {

  $timeout(function() {
    $http.get('http://192.168.25.26:8084/gileadeweb-api/api/pessoacadastro/1')
      .then(function(response) {
        $scope.pessoa = response
      })
  }, 2000)
  
  // gumgaController.createRestMethods($scope, UserService, 'user');
  // $scope.user.methods.getById(1)
  //   .on('getIdSuccess', function(response) {
  //     console.log(response);
  //     $scope.pessoa = response;
  //   });

  $scope.postPicture = function(image){
    return UserService.postImage('picture',image);
  };
  
  $scope.deletePicture = function(){
    UserService.deleteImage('picture',$scope.entity.picture.name)
      .then(function(data){
        if(data.data == 'OK'){
          $scope.entity.picture = {}
        }
      });
  };
}

angular
  .module('upload')
  .controller('formController', formController)