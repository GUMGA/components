(function(){
	'use strict';

  ManyToMany.$inject = ['$q','$compile','$timeout' ]

  function ManyToMany($q, $compile, $timeout){

    let template =  `<div class="row">
                    		<div class="col-md-12">
                    				<div class="col-md-6 col-xs-6">
														<label ng-hide="ctrl.leftList.length > 0">Lista vazia</label>
                    					<label ng-if="ctrl.leftList.length > 0">Mostrando {{ctrl.leftList.length}} {{ctrl.leftList.length == 1 ? 'item' : 'itens'}}</label>
                    					<input class="form-control input-sm" placeholder="Filtrar campos" ng-change="ctrl.filterLeft(leftsearch)" ng-model="leftsearch"/>
                    					<div class="line-break"></div>
                    					<div class="panel panel-default">
                    						<div class="panel-heading heading-sm">Disponiveis</div>
                                <ul class="list-group">
                                  <li class="list-group-item heading-sm hover" ng-repeat="$value in ctrl.leftList track by $index" ng-click="ctrl.removeOrAdd(ctrl.leftList, ctrl.rightList, $value)">
                                      <label name="fieldleft"></label>
                                  </li>
                                </ul>
                               </div>
                           </div>
                           <div class="col-md-6 col-xs-6">
                             <label ng-hide="ctrl.rightList.length > 0">Lista vazia</label>
														 <label ng-if="ctrl.rightList.length > 0">Selecionado {{ctrl.rightList.length}} {{ctrl.rightList.length == 1 ? 'item' : 'itens'}}</label>
                             <input class="form-control input-sm" placeholder="Filtrar campos"/>
                             <div class="line-break"></div>
                             <div class="panel panel-default">
                               <div class="panel-heading heading-sm">Selecionados</div>
															 <ul class="list-group">
																 <li class="list-group-item heading-sm hover" ng-repeat="$value in ctrl.rightList track by $index" ng-click="ctrl.removeOrAdd(ctrl.rightList, ctrl.leftList, $value)">
																		 <label name="fieldrigth"></label>
																 </li>
															 </ul>
                             </div>
                           </div>
                        </div>
                    </div>`
    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude){
        let ctrl = this;
        ctrl.fields = {};
				ctrl.rightList = ctrl.rightList || [];
				ctrl.leftList = ctrl.leftList || [];

        ctrl.filterLeft = function(q){
          $q.when(ctrl.leftSearch({param:q}))
            .then(function(data){
              	ctrl.leftList = angular.copy(data);
								ctrl.removeDuplicates();
								replaceLabels();
						})
        }

        function replaceLabels(){
					let replaceLeft = '<span name="fieldleft"><label>'.concat(ctrl.fields.left).concat('</label><i class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
					let replaceRigth = '<span name="fieldrigth"><label>'.concat(ctrl.fields.right).concat('</label><i class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
					$timeout(()=> {
						[].slice.call(document.getElementsByName('fieldleft')).forEach((label, index) => {
							angular.element(label).replaceWith($compile(replaceLeft)(angular.element(label).scope()));
						});
						[].slice.call(document.getElementsByName('fieldrigth')).forEach((div, index) => {
							angular.element(div).replaceWith($compile(replaceRigth)(angular.element(div).scope()));
						});
					})
        }

        ctrl.filterLeft('');

				ctrl.removeOrAdd = function(removeFrom, addTo, value){
					removeFrom.splice(removeFrom.indexOf(value),1);
					addTo.push(value);
					replaceLabels();
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

    }

    return {
      restrict: 'E',
      scope: {
        rightList: '=rightList',
        leftSearch: '&leftSearch',
				rightSearch: '&rightSearch',
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
