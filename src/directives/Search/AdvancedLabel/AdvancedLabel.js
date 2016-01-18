(function(){
	'use strict';

	AdvancedLabel.$inject = [];
	function AdvancedLabel(){
		var template =
		'<div class="btn-group">' +
		'   <button class="btn btn-default btn-xs" ng-disabled="disabled" id="btn{{attr}}" ng-click="orOrAnd(value)"><strong ng-show="attr" gumga-translate-tag="{{label.concat(\'.\').concat(attr)}}"></strong> {{hql}} <strong>{{value}}</strong></button>' +
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
					if(typeof scope.value === 'string' && scope.value.toUpperCase() === 'OU' && !scope.hql){
						scope.value = 'E';
					}   else  if(scope.value.toUpperCase() === 'E' && !scope.hql){
						scope.value = 'OU';
					}
				};

				scope.emitDelete = function(){
					scope.$emit('deletepls',scope.index);
				};


				scope.getVisibility = function(val){
					return !(val == 'E' || val == 'OU');
				}
			}
		};
	}
	angular.module('gumga.directives.search.advancedlabel',[])
	.directive('gumgaAdvancedLabel',AdvancedLabel)
})();
