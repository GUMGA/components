(function(){
	'use strict';

	Breadcrumb.$inject = ['$rootScope'];
	/**
	 * @ngdoc directive
	 * @name gumga.core:gumgaBreadcrumb
	 * @restrict E
	 * @description O componente GumgaBreadcrumb serve para mostrar ao usuário a lista das páginas visitadas. Este componente atuamente
	 * funciona caso exista dependência do [ui-router](https://github.com/angular-ui/ui-router).
	 * 
	 * O componente GumgaBreadcrumb ouve ao evento `breadChanged`, que recebe os states que estão sendo visitados. Uma das implementações possíveis para esse
	 * evento breadChanged é a seguinte:
	 * <pre>
	 * $rootScope.breadcrumbs = [];
      $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        updateBreadcrumb(toState.name, toState.data.id);
      });
      function updateBreadcrumb(state, id) {
          function get(id) {
              for (var i = 0, len = $rootScope.breadcrumbs.length; i < len; i++) {
                  if ($rootScope.breadcrumbs[i].id === id) {
                      return i;
                  }
              }
          }
          if (id && get(id) >= 0) {
              $rootScope.breadcrumbs.splice(get(id), $rootScope.breadcrumbs.length - get(id), {state: state, id: id});
          } else {
              $rootScope.breadcrumbs.push({state: state, id: id});
          }
          !id ? $rootScope.breadcrumbs = [] : angular.noop;
          $rootScope.$broadcast('breadChanged');
      }
	 * </pre> 
	 * Este código foi colocado dentro do `run` do módulo principal da aplicação.
	 */

	function Breadcrumb($rootScope){
		var template = [
		'<ol class="breadcrumb">',
		'<li ng-repeat="bread in breadcrumbs" ><a ui-sref="{{::bread.state}}">{{::bread.state}}</a></li>',
		'</ol>'
		];
		return {
			restrict: 'E',
			template: template.join('\n'),
			replace: true,
			link: function($scope, $elm, $attrs){
				$scope.$on('breadChanged',function(){
					$scope.breadcrumbs = $rootScope.breadcrumbs.filter(function(e){
						return e.state.split('.').length >=2 ;
					});
				});
			}
		};
	}
	angular.module('gumga.directives.breadcrumb',[])
	.directive('gumgaBreadcrumb',Breadcrumb);
})();