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
			priority: 50,
			scope : {
				advanced: '&advancedMethod',
				normal: '&searchMethod',
				onSearch: '&',
				onAdvancedSearch: '&',
				getQueries: '&?'
			},
			link: function(scope,elm,attrs,controller,transcludeFn){
				scope.adv = false;
				scope.attributes = [];
				scope.normalFields = attrs.fields.split(',');
				scope.entityToTranslate = attrs.translateEntity;
				scope.$parent.searchQueries = [];
				scope.availableQueries = [];
				scope.saveQuery = false;
				if(attrs.getQueries){
					scope.saveQuery = true;
					try {
						scope.getQueries({page: location.hash})
						.then(function(data){
							scope.availableQueries = data;
						})
					} catch(e){
						throw	'The return from getQueries must be asynchronous';
					}
				}

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
									let attribute = {
										name: cloneEl.getAttribute('name'),
										type: cloneEl.getAttribute('type'),
										translate: cloneEl.getAttribute('translate') || cloneEl.getAttribute('name')
									}
									if(cloneEl.getAttribute('type').trim().toLowerCase() == 'array'){
										attribute.data = scope.$parent[cloneEl.getAttribute('data')] || [];
										attribute.arrayItemContent	= cloneEl.getAttribute('array-item-content');
									}
									scope.attributes.push(attribute);
							}
						});
					});
				};

				scope.$on('advanced',function(ev,data){
					scope.$parent.searchQueries = [];
					scope.$parent.searchQueries = data.source;
					scope.advanced({param: data});
					eventHandler.advanced();
        });

				scope.$on('normal',function(ev,data){
					scope.normal({field: data.field,param: data.param});
					eventHandler.search()
        });

				scope.getAttributes();
			}
		};
	}
	angular.module('gumga.directives.search.search',[])
	.directive('gumgaSearch',Search)
})();
