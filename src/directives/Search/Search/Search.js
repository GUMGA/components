(function(){
	'use strict';

	Search.$inject = [];
	function Search(){
		var template =
		'<div class="full-width-without-padding">' +
		'     <div ng-if="!adv">' +
		'         <gumga-normal-search></gumga-normal-search>' +
		'     </div>' +
		'     <div ng-if="adv">' +
		'         <gumga-advanced-search></gumga-advanced-search>' +
		'     </div>' +
		'</div>';
		return {
			restrict: 'E',
			template: template,
			transclude: true,
			scope : {
				advanced: '&advancedMethod',
				normal: '&searchMethod',
				onSearch: '&',
				onAdvancedSearch: '&'
			},
			link: function(scope,elm,attrs,controller,transcludeFn){
				scope.adv = false;
				scope.attributes = [];
				scope.normalFields = attrs.fields.split(',');
				scope.entityToTranslate = attrs.translateEntity;
				scope.searchQueries = []
				var eventHandler = {
					search: attrs.onSearch ? scope.onSearch : angular.noop,
					advanced: attrs.onAdvancedSearch ? scope.onAdvancedSearch : angular.noop
				}
				if(attrs.advanced === "true"){
					scope.adv = true;
				}

				scope.getAttributes = function (){
					transcludeFn(function(clone){
						angular.forEach(clone,function(cloneEl){
							if(cloneEl.nodeName == 'ADVANCED-FIELD'){
								scope.attributes.push({
									name: cloneEl.getAttribute('name'),
									type: cloneEl.getAttribute('type')
								});
							}
						});
					});
				};

				scope.$on('advanced',function(ev,data){
					scope.searchQueries = [];
					scope.searchQueries = data.source;
					scope.advanced({param: data});
					eventHandler.search();
	              //ev.stopPropagation() || angular.noop;
	            });

				scope.$on('normal',function(ev,data){
					scope.normal({field: data.field,param: data.param});
					eventHandler.advanced()
	              //ev.stopPropagation() || angular.noop;
	            });

				scope.getAttributes();
			}
		};
	}
	angular.module('gumga.directives.search.search',[])
	.directive('gumgaSearch',Search)
})();
