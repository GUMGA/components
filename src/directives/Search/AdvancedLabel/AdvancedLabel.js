(function(){
	'use strict';

	AdvancedLabel.$inject = [];
	function AdvancedLabel(){
		var template =
		'<div class="btn-group">' +
		'   <button class="btn btn-default btn-xs" ng-disabled="disabled" id="btn{{attr}}" ng-click="orOrAnd(value)"><strong>{{label}}</strong> {{hql}} <strong>{{value}}</strong></button>' +
		'   <button class="btn btn-default btn-xs" ng-disabled="disabled" ng-click="emitDelete()" ng-if="getVisibility(value)"><span aria-hidden="true">&times;</span></button>' +
		'</div>';

		return {
			restrict: 'E',
			template: template,
			scope: {
				attr: '@',
				label: '@translate',
				hql: '@',
				value: '=',
				index: '=',
				disabled: '='
			},
			link: function(scope,$elm,$attrs){
				if(!$attrs.disabled) scope.disabled = false;
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
