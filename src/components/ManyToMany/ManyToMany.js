(function(){
	'use strict';

  ManyToMany.$inject = ['$q','$compile','$timeout','$modal']

  function ManyToMany($q, $compile, $timeout, $modal){

    let template =  `<div class="row">
                    		<div class="col-md-12">
                    				<div class="col-md-6 col-xs-6">
															<label ng-hide="ctrl.leftList.length > 0">Lista vazia</label>
                    					<label ng-if="ctrl.leftList.length > 0">Mostrando {{ctrl.leftList.length}} {{ctrl.leftList.length == 1 ? 'item' : 'itens'}}</label>
															<div ng-class="leftsearch && ctrl.leftList.length == 0 && ctrl.authorizeAdd ? 'input-group' : ''">
                    						<input class="form-control input-sm" placeholder="Filtrar campos" ng-change="ctrl.filterLeft(leftsearch)" ng-model="leftsearch"/>
																<div ng-click="ctrl.addNew(leftsearch)" ng-show="leftsearch && ctrl.leftList.length == 0 && ctrl.authorizeAdd" class="input-group-addon hover"><i class="glyphicon glyphicon-plus"></i></div>
															</div>
                    					<div class="line-break"></div>
                    					<div class="panel panel-default">
                    						<div class="panel-heading heading-sm">{{ctrl.textHeadingLeft}}</div>
                                <ul class="list-group" style="height: 293px;overflow: auto;">
                                  <li class="list-group-item heading-sm hover" ng-repeat="$value in ctrl.leftList track by $index" ng-click="ctrl.removeOrAdd(ctrl.leftList, ctrl.rightList, $value)">
                                      <span name="fieldleft"></span>
                                  </li>
                                </ul>
																<div class="panel-footer hover" style="text-align: center;" ng-click="ctrl.moveAllItems(ctrl.leftList, ctrl.rightList, 'right')">
																		{{ctrl.textMoveallLeft}}
																		<span class="glyphicon glyphicon-arrow-right"></span>
															  </div>
															 </div>
                           </div>
                           <div class="col-md-6 col-xs-6">
													 	 <label ng-hide="ctrl.rightList.length > 0">Lista vazia</label>
														 <label ng-if="ctrl.rightList.length > 0">Mostrando {{ctrl.rightList.length}} {{ctrl.rightList.length == 1 ? 'item' : 'itens'}}</label>
                          	 <input class="form-control input-sm" ng-disabled="!ctrl.rightSearchField" placeholder="Filtrar campos" ng-change="ctrl.filterRight(rightsearch)" ng-model="rightsearch"/>
                             <div class="line-break"></div>
                             <div class="panel panel-default">
                               <div class="panel-heading heading-sm">{{ctrl.textHeadingRight}}</div>
															 <ul class="list-group" style="height: 293px;overflow: auto;">
																 <li class="list-group-item heading-sm hover" ng-repeat="$value in ctrl.rightAux track by $index" ng-click="ctrl.removeOrAdd(ctrl.rightList, ctrl.leftList, $value)">
																		 <span name="fieldrigth">{{$value}}</span>
																 </li>
															 </ul>
															 <div class="panel-footer hover" style="text-align: center;" ng-click="ctrl.moveAllItems(ctrl.rightList, ctrl.leftList, 'left')"><span class="glyphicon glyphicon-arrow-left"></span> {{ctrl.textMoveallRight}}</div>
                             </div>
                           </div>
                        </div>
                    </div>`
    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude){
        let ctrl = this;
        ctrl.fields = {};
				if (!$attrs.authorizeAdd) ctrl.authorizeAdd = true;
				ctrl.textHeadingLeft = $attrs.textHeadingLeft || 'Available';
				ctrl.textHeadingRight = $attrs.textHeadingRight || 'Selected';
				ctrl.textMoveallLeft = $attrs.textMoveallLeft || 'Move all items';
				ctrl.textMoveallRight = $attrs.textMoveallRight || 'Move all items';
				ctrl.rightList = ctrl.rightList || [];
				ctrl.rightAux = angular.copy(ctrl.rightList);
				ctrl.leftList = ctrl.leftList || [];
				ctrl.rightSearchField = $attrs.rigthSearchField || null;
				let eventHandler = {
					listChange: ($attrs.onListChange? ctrl.onListChange : angular.noop),
					newValueAdded: ($attrs.onNewValueAdded ? ctrl.onNewValueAdded : angular.noop),
					valueVisualizationOpened: ($attrs.onValueVisualizationOpened ? ctrl.onValueVisualizationOpened :angular.noop),
					valueVisualizationClosed: ($attrs.onValueVisualizationClosed ? ctrl.onValueVisualizationClosed :angular.noop)
				};

        ctrl.filterLeft = function(q){
          $q.when(ctrl.leftSearch({value:q}))
            .then(function(data){
              	ctrl.leftList = angular.copy(data);
								ctrl.removeDuplicates();
								replaceLabels();
						})
        }

				ctrl.filterRight = function(param){
					if(ctrl.rightSearchField) ctrl.rightAux = ctrl.rightList.filter(obj => obj[ctrl.rightSearchField].toLowerCase().indexOf(param.toLowerCase()) > -1);
					ctrl.removeDuplicates();
					replaceLabels();
				}

				ctrl.moveAllItems = function(fromList, toList, position){
					if(position == "left") ctrl.leftList = toList.concat(fromList);
					if(position == "right") ctrl.rightList = toList.concat(fromList);
					fromList.splice(0, fromList.length);
					ctrl.rightAux = angular.copy(ctrl.rightList);
					ctrl.removeDuplicates();
					replaceLabels();
					$scope.rightsearch = '';
					$scope.leftsearch = '';
				}

        function replaceLabels(){
					let replaceLeft = '<span name="fieldleft"><span >'.concat(ctrl.fields.left).concat('</span><i ng-click="ctrl.openModal($event, $value)" class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
					let replaceRigth = '<span name="fieldrigth"><span>'.concat(ctrl.fields.right).concat('</span><i ng-click="ctrl.openModal($event, $value)" class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
					$timeout(()=> {
						[].slice.call(document.getElementsByName('fieldleft')).forEach((label, index) => {
							angular.element(label).replaceWith($compile(replaceLeft)(angular.element(label).scope()));
						});
						[].slice.call(document.getElementsByName('fieldrigth')).forEach((div, index) => {
							angular.element(div).replaceWith($compile(replaceRigth)(angular.element(div).scope()));
						});
					})
        }

        ctrl.openModal = function(event, obj){
						event.stopImmediatePropagation();
						ctrl.template =
						'<div class="modal-body">\n';
						for (var key in obj) if (obj.hasOwnProperty(key) && key != '$$hashKey' && key != 'oi' && key != 'version') {
							ctrl.template += '   <div class="form-group">\n';
							ctrl.template += '       <label><small>'+ key +'</small></label>\n';
							ctrl.template += '       <input type="text" ng-model="$value.' + key +'" disabled class="form-control"/>\n';
							ctrl.template += '   </div>\n';
						}
						ctrl.template += '   <div class="modal-footer">\n';
						ctrl.template += '       <button type="button" class="btn btn-warning" ng-click="back()">Back</button>\n';
						ctrl.template += '   </div>\n';
						ctrl.template += '</div>\n';

						eventHandler.valueVisualizationOpened();
						var mi = $modal.open({
							template: ctrl.template,
							size: 'sm',
							controller: ['$scope', '$value', '$modalInstance', function($scope,$value,$modalInstance){
								$scope.$value = $value;
								$scope.back = function(){
									$modalInstance.close();
								}
							}],
							resolve: {
								$value: function(){
									return obj;
								}
							}
						});

						mi.result.then(function(){
							eventHandler.valueVisualizationClosed();
						})
				}
				ctrl.removeOrAdd = function(removeFrom, addTo, value){
					removeFrom.splice(removeFrom.indexOf(value),1);
					addTo.push(value);
					replaceLabels();
					ctrl.rightAux = angular.copy(ctrl.rightList);
					$scope.rightsearch = '';
					eventHandler.listChange({value:value});
				}

				ctrl.addNew = function(value){
					$scope.leftsearch = '';
					ctrl.postMethod({value: value});
					ctrl.filterLeft('');
					eventHandler.newValueAdded();
				}

				const hasObjectInRight = obj => (ctrl.rightList.filter(rightObject => angular.equals(rightObject, obj)).length > 0);


				ctrl.removeDuplicates = function(){
					ctrl.leftList = ctrl.leftList.filter(obj => !hasObjectInRight(obj))
				}

        $transclude($scope, cloneEl => {
          angular.forEach(cloneEl, cl => {
						let element = angular.element(cl)[0];
						switch(element.nodeName){
							case 'LEFT-FIELD': ctrl.fields.left = element.innerHTML;
							break;
							case 'RIGHT-FIELD': ctrl.fields.right = element.innerHTML;
							break;
						}
					});
        })

				replaceLabels();
				ctrl.filterLeft('');

    }

    return {
      restrict: 'E',
      scope: {
        rightList: '=rightList',
        leftSearch: '&leftSearch',
				rightSearch: '&rightSearch',
				postMethod: '&',
				onListChange: '&?',
				onNewValueAdded: '&?',
				onValueVisualizationOpened: '&?',
				onValueVisualizationClosed: '&?',
				authorizeAdd: '=?'
      },
      bindToController: true,
      transclude: true,
      controllerAs: 'ctrl',
      controller,
      template
    }
  }


  angular.module('gumga.manytomany',[])
  .directive('gumgaManyToMany',ManyToMany)
})();
