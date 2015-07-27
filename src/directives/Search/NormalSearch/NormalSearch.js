(function(){
	'use strict';
	
	NormalSearch.$inject = [];
	function NormalSearch(){
		var template =
		'<div class="input-group">' +
		'   <input type="text" class="form-control" ng-model="searchField" placeholder="Search"/>' +
		'   <span class="input-group-btn">' +
		'       <button class="my-button btn-default" ng-click="showLittlePanel = !showLittlePanel"><span class="glyphicon glyphicon-chevron-down"></span></button>' +
		'       <button class="my-button btn-primary last" type="button" ng-disabled="!searchField" ng-click="doSearch(searchField)" >Search <span class="glyphicon glyphicon-search"></span></button>' +
		'   </span>' +
		'</div>' +
		'<div class="little-panel" ng-show="showLittlePanel">' +
		'   <div class="panel-body">' +
		'       <label ng-repeat="field in normalFields" style="display: block" ><input type="checkbox" ng-model="models[field.value]" style="margin-right: 1%" ><span>{{field.value}}</span></label>' +
		'   </div>' +
		'</div>';
		return {
			restrict: 'E',
			template: template,
			link: function(scope,elm,attrs){
				if(!scope.$parent.normalFields.length > 0 || !scope.$parent.entityToTranslate){
					throw 'Missing some parameters in GumgaSearch';
				}
				scope.models = {};
				scope.searchField = '';
				scope.translate = scope.$parent.entityToTranslate;
				scope.normalFields = scope.$parent.normalFields.map(function(elm,$index){
					scope.models[elm] = false;
					$index == 0 && (scope.models[elm] = true);
					return {
						name: elm.slice(0,1).toUpperCase() + elm.slice(1,elm.length).toLowerCase(),
						value: elm
					};
				});

				scope.models.returnString = function(){
					var txt = '';
					for(var key in this) if(this.hasOwnProperty(key) && key != 'returnString' && this[key]){
						txt += key + ',';
					}
					if(txt.length == 0){
						return scope.normalFields[0].value;
					}
					return txt.slice(0,-1);
				};

				elm.find('input')
				.bind('keypress',function(ev){
					if(ev.keyCode == 13 && scope.searchField.length > 0){
						scope.$emit('normal',{field: scope.models.returnString(),param:scope.searchField});
						if(scope.showLittlePanel){
							scope.showLittlePanel = !scope.showLittlePanel;
						}
					}
				});

				scope.doSearch = function(txt){
					scope.$emit('normal',{field: scope.models.returnString(),param:txt || ''});
					scope.showLittlePanel = !scope.showLittlePanel;
					scope.searchField = '';
				};

			}
		};
	}
	angular.module('gumga.directives.search.normalsearch',[])
	.directive('gumgaNormalSearch',NormalSearch)
})();