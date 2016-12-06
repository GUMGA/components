angular
  .module('gumgaController',[])
  .config(function($httpProvider, $stateProvider){
    $stateProvider
      .state('gumgaController.list', {
          url: '/list',
          // reloadOnSearch: false,
          templateUrl: 'components/gumga-controller/views/list.html',
          controller: 'listController'
      })
      .state('gumgaController.view', {
          url: '/view/:id',
          templateUrl: 'components/gumga-controller/views/view.html',
          controller: 'viewController'
      })
  })
  