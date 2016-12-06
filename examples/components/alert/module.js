angular
  .module('gumgaAlert',[])
  .config(function($httpProvider, $stateProvider){
    $stateProvider
      .state('gumgaAlert.view', {
          url: '/view',
          templateUrl: 'components/alert/view/view.html',
          controller: 'viewController'
      })
  })
  