(function(){

  Include.$inject = ['$http', '$templateCache', '$compile', '$timeout']

  function Include($http, $templateCache, $compile, $timeout){

    return {
      restrict: 'EA',
      scope: false,
      compile(){
        return {
          pre: function(scope, elm, attrs) {
            if (!attrs.gumgaInclude) throw 'Você deve passar uma URL.'
            $http.get(attrs.gumgaInclude, {
                cache: $templateCache
              })
              .success(function(data) {
                $timeout(function() {
                  $compile(elm.html(data).contents())(scope);
                });
              })
              .error(function(err) {
                throw err;
              })
          }
        }
      }
    }
  }

  angular.module('gumga.include', [])
    .directive('gumgaInclude', Include)
})()
