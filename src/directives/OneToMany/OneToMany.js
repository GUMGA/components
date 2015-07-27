(function(){
	'use strict';

	OneToMany.$inject = ['$modal'];
	function OneToMany($modal){
		var template = [
		'<div class="col-md-12" style="padding-left: 0;padding-right: 0">',
		'   <button type="button" class="btn btn-default" ng-click="newModal()">New</button>',
		'   <ul class="list-group">',
		'       <li ng-repeat="child in children" class="list-group-item">',
		'           {{::child[property]}}',
		'           <button type="button" class="btn btn-default pull-right btn-sm" ng-click="newModal(child)"><i class="glyphicon glyphicon-pencil"></i></button>',
		'           <button type="button" class="btn btn-danger pull-right btn-sm" ng-click="removeFromList(child)"><i class="glyphicon glyphicon-remove"></i></button>',
		'       <div class="clearfix"></div></li>',
		'   <ul>',
		'</div>',
		'<div class="clearfix"></div>'
		];

		return {
			restrict: 'E',
			template: template.join('\n'),
			scope: {
				children: '=',
				templateUrl: '@',
				property: '@displayableProperty',
				name: '@',
				controller: '@',
				onDelete: '&?',
				onValueVisualizationOpened: '&?',
				onValueVisualizationClosed: '&?'
			},
			link: function (scope,elm,attrs) {
				var eventHandler = {
					valueVisualizationOpened: (attrs.onValueVisualizationOpened ? scope.onValueVisualizationOpened :angular.noop),
					valueVisualizationClosed: (attrs.onValueVisualizationClosed ? scope.onValueVisualizationClosed :angular.noop),
					delete: (attrs.onDelete ? scope.onDelete : angular.noop)
				};
				scope.newModal = newModal;
				scope.removeFromList = removeFromList;
				scope.getFromModal = getFromModal;
				var name = attrs.name || 'New';
				if(!scope.children) throw 'You must provide a list to GumgaOneToMany';
				if(!scope.templateUrl) throw 'You must provide a templateUrl for the modal';
				if(!scope.property) throw 'You must provide a property to display in GumgaOneToMany';
				if(!scope.controller) throw 'You must provide a controller to the modal';
				function getFromModal(selected){
					eventHandler.valueVisualizationClosed();
					if(JSON.stringify(scope.etty) !== '{}'){
						scope.children.splice(scope.children.indexOf(scope.etty),1,selected);
					} else {
						scope.children.push(selected);
					}
				}
				function removeFromList(obj){
					eventHandler.delete({$value: obj});
					scope.children.splice(scope.children.indexOf(obj),1);
				}
				function newModal(obj){
					scope.etty = {};
					if(obj){
						scope.etty= obj;
					}
					eventHandler.valueVisualizationOpened();
					var modalInstance = $modal.open({
						templateUrl: scope.templateUrl,
						controller: scope.controller,
						resolve: {
							entity: function(){
								return scope.etty;
							},
							title: function(){
								return scope.name;
							}
						}
					});
					modalInstance.result.then(getFromModal);
				}


			}
		};
	}

	angular.module('gumga.directives.onetomany',[])
		.directive('gumgaOneToMany',OneToMany)


})();