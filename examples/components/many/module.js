angular
  .module('gumgaMany',[])
  .config(function($httpProvider, $stateProvider){
    $stateProvider
      .state('gumgaMany.toone', {
          url: '/to-one',
          // reloadOnSearch: false,
          templateUrl: 'components/many/view/to-one.html',
          controller: 'ToOneController'
      })
  })
  