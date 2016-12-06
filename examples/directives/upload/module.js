angular
  .module('upload',[])
  .config(function($httpProvider, $stateProvider){
    $stateProvider
      .state('upload.form', {
          url: '/form',
          templateUrl: 'directives/upload/view/form.html',
          controller: 'formController'
      })
  })
  