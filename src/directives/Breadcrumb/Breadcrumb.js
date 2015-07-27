(function(){
	'use strict';

	Breadcrumb.$inject = ['$rootScope'];
	/**
	 * @ngdoc directive
	 * @name gumga.core:GumgaBreadcrumb
	 * @deprecated this is not working properly
	 * @restrict EA
	 * @element ANY
	 * @scope false
	 * @description O componente GumgaAlert serve para criar notificações Growl-style, e possui quatro tipos
	 * de alertas: Danger, Success, Warning, Info.
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
	/**
	 * TODO: Talvez transformar isso em uma factory ou um provider.
	 */
	angular.module('gumga.directives.breadcrumb',[])
	.directive('gumgaBreadcrumb',Breadcrumb);
})();