(function(){
  'use strict';

  Filter.$inject = ['GumgaSearchHelper'];
  function Filter(GumgaSearchHelper){
    let template = [
      '<div class="panel panel-default">'
    , ' <div class="panel-body">'
    , '   <div class="row">'
    , '     <div class="col-md-3">'
    , '       <div class="btn-group btn-block" dropdown>'
    , '         <button type="button" class="btn btn-block btn-default" dropdown-toggle></span> <span ng-bind="query.attribute.name || \'Atributo\'"></span> <span class="caret"></span></button>'
    , '         <ul class="dropdown-menu" role="menu">'
    , '           <li ng-repeat="attr in attributes" ng-click="attributeHasChanged(attr)"><a href="#" ng-bind="attr.name"></a></li>'
    , '         </ul>'
    , '       </div>'
    , '     </div>'
    , '     <div class="col-md-3">'
    , '       <div class="btn-group btn-block" dropdown>'
    , '         <button type="button" class="btn btn-block btn-default" dropdown-toggle></span> <span ng-bind="query.hql.label || \'Condição\'"></span> <span class="caret"></span></button>'
    , '         <ul class="dropdown-menu" role="menu">'
    , '           <li ng-repeat="opt in hqlOpts" ng-click="handleHqlOption(opt)"><a href="#" ng-bind="opt.label"></a></li>'
    , '         </ul>'
    , '       </div>'
    , '     </div>'
    , '     <div class="col-md-4">'
    , '       <button ng-show="typeInput == \'boolean\'" type="button" class="btn btn-block btn-default" ng-model="query.value" btn-checkbox btn-checkbox-true="\'true\'" btn-checkbox-false="\'false\'">'
    , '         <span ng-class="{\'glyphicon glyphicon-ok\': query.value == \'true\', \'glyphicon glyphicon-remove\': query.value == \'false\'}"></span>'
    , '       </button>'
    , '       <input ng-show="typeInput == \'string\'" type="text" ng-model="query.value" class="form-control">'
    , '     </div>'
    , '     <div class="col-md-2">'
    , '       <button type="button" name="button" class="btn btn-block btn-default" ng-click="addQuery(query)" ng-disabled="query.value.length > 0 ? false : true"><span class="glyphicon glyphicon-plus"></button>'
    , '     </div>'
    , '   </div>'
    , '   <div class="row" ng-show="queries.length > 0">'
    , '     <hr />'
    , '     <div class="col-md-10">'
    , '       <gumga-advanced-label ng-repeat="query in queries" attr="{{query.attribute.name}}" hql="{{query.hql.label}}" value="query.value" index="$index" style="margin-right: 1%"></gumga-advanced-label>'
    , '     </div>'
    , '     <div class="col-md-2">'
    , '       <button type="button" name="button" class="btn btn-block btn-default" ng-click="showArray(queries)" ng-disabled="queries.length == 0"><span class="glyphicon glyphicon-search"></button>'
    , '     </div>'
    , '   </div>'
    , ' </div>'
    , '</div>'
    ];

    return {
      restrict: 'E',
      template: template.join('\n'),
      transclude: true,
      scope : {
				search: '&',
				onSearch: '&',
			},
      link: (scope, element, attrs, ctrl, transcludeFn) => {

        if (!attrs.search) throw 'Parâmetro search é obrigatório';

        scope.entityToTranslate = attrs.translateEntity;
				scope.attributes = [];
        scope.selectHQL = false;
        scope.query = {};
        scope.queries = [];
        scope.hqlOpts = [];

				var eventHandler = {
					search: attrs.onSearch ? scope.onSearch : angular.noop
				}

				scope.getAttributes = () => {
					transcludeFn((clone) => {
						angular.forEach(clone, (cloneEl) => {
							if(cloneEl.nodeName == 'ADVANCED-FIELD'){
								scope.attributes.push({
									name: cloneEl.getAttribute('name'),
									type: cloneEl.getAttribute('type')
								});
							}
						});
					});
				};
        scope.getAttributes();

        scope.attributeHasChanged = (attribute) => {
          scope.query.value = null;
					scope.query.attribute = attribute;
          if (attribute.type == 'boolean') scope.query.value = 'false';
          scope.typeInput = attribute.type;
					scope.hqlOpts = GumgaSearchHelper.getTypeListOfHQLPossibilities(attribute.type);
					scope.selectHQL = true ;
					scope.selectAttribute = false;
				};

        scope.handleHqlOption = (hq) => {
					scope.query.hql = hq;
				};

        scope.addQuery = (query) => {
					if(scope.queries.length === 0){
						scope.queries.push(query);
					} else if(scope.queries.length >= 1){
						scope.queries.splice(scope.queries.length, 1, {value: 'AND'}, query);
					}
					scope.query = {};
					// scope.typeInput = 'text';
				};

        scope.$on('deletepls', (ev,index) => {
					if (index == 0 && scope.queries.length == 1) {
						scope.queries.splice(index, 1);
					} else if (index == 0 && scope.queries.length > 2) {
						scope.queries.splice(index, 2);
					} else if (index > 0 && scope.queries.length > 2) {
						scope.queries.splice(index - 1, 2);
					}
				});

        scope.showArray = (array) => {
          console.log({param: {hql: GumgaSearchHelper.translateArrayToHQL(array),source: array}});
					scope.search({param: {hql: GumgaSearchHelper.translateArrayToHQL(array),source: array}});
					eventHandler.search();
				};

			}
    }
  }

  angular.module('gumga.directives.filter', [])
  .directive('gumgaFilter', Filter);

})();
