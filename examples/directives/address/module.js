angular
  .module('address',[])
  .config(function($httpProvider, $stateProvider){
    $stateProvider
      .state('address.form', {
          url: '/form',
          templateUrl: 'directives/address/view/form.html',
          controller: 'formController'
      })
  })
  