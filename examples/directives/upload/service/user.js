UserService.$inject = ['GumgaRest']
function UserService(GumgaRest) {
  // var Service = new GumgaRest('http://192.168.25.200/security-api/api/user');
  var Service = new GumgaRest('http://192.168.25.26:8084/gileadeweb-api/api/pessoacadastro/1');

  Service.postImage = function (id, image) {
    var fd = new FormData();
    fd.append("picture", image);
    return $http.post(url + '/picture/', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
  }
  return Service;
}

angular
  .module('upload')
  .service('UserService', UserService)