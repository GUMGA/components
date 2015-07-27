(function(){
	'use strict';
	
	AdvancedLabel.$inject = [];
	function AdvancedLabel(){
		var template =
		'<div class="btn-group">' +
		'   <button class="btn btn-default btn-xs" id="btn{{attr}}" ng-click="orOrAnd(value)"><strong>{{attr}}</strong> {{hql}} <strong>{{value}}</strong></button>' +
		'   <button class="btn btn-default btn-xs" ng-click="emitDelete()" ng-if="getVisibility(value)"><span aria-hidden="true">&times;</span></button>' +
		'</div>';

		return {
			restrict: 'E',
			template: template,
			scope: {
				attr: '@',
				hql: '@',
				value: '=',
				index: '='
			},
			link: function(scope,$elm,$attrs){
				scope.bol = false;

				scope.orOrAnd = function(){

					if(typeof scope.value === 'string' && scope.value.toUpperCase() === 'OR' && !scope.hql){
						scope.value = 'AND';
					}   else  if(scope.value.toUpperCase() === 'AND' && !scope.hql){
						scope.value = 'OR';
					}
				};

				scope.emitDelete = function(){
					scope.$emit('deletepls',scope.index);
				};


				scope.getVisibility = function(val){
					return !(val == 'AND' || val == 'OR');
				}
			}
		};
	}
	angular.module('gumga.directives.search.advancedlabel',[])
	.directive('gumgaAdvancedLabel',AdvancedLabel)
})();