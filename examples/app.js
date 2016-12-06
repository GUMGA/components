angular
  .module('examples',['gumga.core','ui.router','components','directives'])
  .config(function($httpProvider, $stateProvider){
    $httpProvider.defaults.headers.common['gumgaToken'] = 'eternobatista'
    
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'home.html'
      })
      .state('gumgaController', {
          url: '/gumga-controller',
          templateUrl: 'components/gumga-controller/views/index.html'
      })
      .state('gumgaMany', {
          url: '/many',
          templateUrl: 'components/many/view/index.html'
      })
      .state('gumgaAlert', {
          url: '/alert',
          templateUrl: 'components/alert/view/index.html'
      })
      .state('upload', {
          url: '/upload',
          templateUrl: 'directives/upload/view/index.html'
      })
      .state('address', {
          url: '/address',
          templateUrl: 'directives/address/view/index.html'
      })
  })
