(function(){
  'use strict';

  Filter.$inject = ['GumgaSearchHelper'];
  function Filter(GumgaSearchHelper){
    let template = `
    <div style="display: inline-block">
      <button type="button" class="btn btn-default" ng-click="showFilter = !showFilter">
        Adicionar
        <span class="caret"></span>
      </button>
      <div style="position: relative; width: auto;" ng-show="showFilter">
        <form class="form-inline">
          <div id="gumga-filter" class="panel panel-default" style="min-width: 500px; position: absolute; z-index: 1000">
            <div class="panel-body">
              <div class="row">
                <!--<div class="col-md-3" style="padding-right: 0; width: auto;">-->
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="btn-group btn-block" dropdown is-open="attributes.isopen">
                      <button type="button" class="btn btn-default" dropdown-toggle ng-disabled="hqlOpts.isopen">
                        <span ng-show="query.attribute">
                        {{query.attribute.translate | gumgaTranslate:entityToTranslate}}
                        </span>
                        <span ng-show="!query.attribute">
                        Atributos
                        </span>
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu" role="menu">
                        <li ng-repeat="attr in attributes" ng-click="attributeHasChanged(attr)">
                          <a gumga-translate-tag="{{entityToTranslate.concat('.').concat(attr.translate)}}"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--<div class="col-md-3" style="padding-left: 1%;width: auto;padding-right: 0.5%;">-->
                  <div class="form-group">
                    <div class="btn-group btn-block" dropdown is-open="hqlOpts.isopen">
                      <button type="button" class="btn btn-block btn-default" dropdown-toggle style="width: auto;" ng-disabled="!query.attribute || attributes.isopen"></span> <span ng-bind="query.hql.label || 'Condição'"></span> <span class="caret"></span></button>
                      <ul class="dropdown-menu" role="menu">
                        <li ng-repeat="opt in hqlOpts" ng-click="handleHqlOption(opt)"><a ng-bind="opt.label"></a></li>
                      </ul>
                    </div>
                  </div>
                  <!--<div class="col-md-3" style="width: auto;padding-left: 0;padding-right: 0;">-->
                  <div class="form-group">
                    <div class="radio" ng-show="typeInput == 'boolean' && boolean.trueValue || boolean.falseValue">
                      <label ng-show="boolean.trueValue">
                        <input type="radio" ng-model="query.value" ng-value="'true'" ng-show="boolean.trueValue"> {{boolean.trueValue}}
                      </label>
                      <label ng-show="boolean.falseValue">
                        <input type="radio" ng-model="query.value" ng-value="'false'" ng-show="boolean.falseValue"> {{boolean.falseValue}}
                      </label>
                    </div>
                    <span ng-show="typeInput == 'boolean' && !boolean.trueValue && !boolean.falseValue">
                      <button ng-show="typeInput == 'boolean'" type="button" class="btn btn-block btn-default" ng-model="query.value" btn-checkbox btn-checkbox-true="'true'" btn-checkbox-false="'false'">
                        <span ng-class="{'glyphicon glyphicon-ok': query.value == 'true', 'glyphicon glyphicon-remove': query.value == 'false'}"></span>
                      </button>
                    </span>
                    <input ng-show="typeInput == 'string'" type="text" ng-model="query.value" class="form-control" ng-keyup="canISend($event)"/>
                    <select ng-show="typeInput == 'array'"  class="form-control" ng-model="query.value" ng-options="item for item in query.attribute.data"></select>
                  </div>
                  <!--<div class="col-md-3" style="width: auto;">-->
                  <div class="form-group">
                    <button type="button" name="button" class="btn btn-block btn-default" ng-click="addQuery(query)" ng-disabled="!query.value || !query.hql || !query.attribute">
                      <span class="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row" ng-if="queries.length > 0">
                <hr />
                <div class="col-md-12">
                  <gumga-advanced-label ng-repeat="query in queries" attr="{{query.attribute.name}}" translate="{{query.attribute.translate | gumgaTranslate:entityToTranslate}}" hql="{{query.hql.label}}" value="query.value" index="$index" style="margin-right: 1%;margin-top: 1%"></gumga-advanced-label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    <div>
    `;

    return {
      restrict: 'E',
      template: template,
      transclude: true,
      scope : {
        hqlHolder: '=data'
			},
      link: (scope, element, attrs, ctrl, transcludeFn) => {
        scope.entityToTranslate = attrs.translateEntity;
				scope.attributes = [];
        scope.selectHQL = false;
        scope.query = {};
        scope.queries = [];
        scope.hqlOpts = [];

        const id = 'gumga-filter';
        let elm = document.querySelector('#' + id);

				scope.getAttributes = () => {
					transcludeFn((clone) => {
						angular.forEach(clone, (cloneEl) => {
							if(cloneEl.nodeName == 'ADVANCED-FIELD'){
                let attribute = {
                  name: cloneEl.getAttribute('name'),
                  type: cloneEl.getAttribute('type'),
                  translate: cloneEl.getAttribute('translate') || cloneEl.getAttribute('name')
                }
                switch (attribute.type) {
                  case 'array': {
                    attribute.data = scope.$parent[cloneEl.getAttribute('data')] || [];
                    attribute.arrayItemContent = cloneEl.getAttribute('array-item-content');
                    break;
                  }
                  case 'boolean': {
                    attribute.boolean = {
                      trueValue: cloneEl.getAttribute('true-value'),
                      falseValue: cloneEl.getAttribute('false-value')
                    };
                    break;
                  }
                }
                // if(cloneEl.getAttribute('type').trim().toLowerCase() == 'array'){
                //   attribute.data = scope.$parent[cloneEl.getAttribute('data')] || [];
                //   attribute.arrayItemContent	= cloneEl.getAttribute('array-item-content');
                // }
                scope.attributes.push(attribute);
							}
						});
					});
				};
        scope.getAttributes();

        scope.attributeHasChanged = (attribute) => {
          scope.query.value = null;
					scope.query.attribute = attribute;
          scope.boolean = attribute.boolean;
          if (attribute.type == 'boolean') scope.query.value = 'false';
          scope.typeInput = attribute.type;
					scope.hqlOpts = GumgaSearchHelper.getTypeListOfHQLPossibilities(attribute.type);
					scope.selectHQL = true;
					scope.selectAttribute = false;
				};

        scope.handleHqlOption = (hq) => {
					scope.query.hql = hq;
				};

        let isValidQuery = () => { return (!scope.query.value || !scope.query.hql || !scope.query.attribute) ? false : true; }

        scope.addQuery = (query) => {
          if (!isValidQuery()) {
            if (elm.classList) {
              elm.classList.add('shake');
              setTimeout(function () {
                elm.classList.remove('shake');
              }, 1000);
            }
          } else {
            if(scope.queries.length === 0){
  						scope.queries.push(query);
  					} else if(scope.queries.length >= 1){
  						scope.queries.splice(scope.queries.length, 1, {value: 'AND'}, query);
  					}
            scope.hqlHolder = {hql: GumgaSearchHelper.translateArrayToHQL(scope.queries),source: scope.queries};
  					scope.query = {};
  					scope.typeInput = 'text';
          }
				};

        scope.$on('deletepls', (ev,index) => {
					if (index == 0 && scope.queries.length == 1) {
						scope.queries.splice(index, 1);
					} else if (index == 0 && scope.queries.length > 2) {
						scope.queries.splice(index, 2);
					} else if (index > 0 && scope.queries.length > 2) {
						scope.queries.splice(index - 1, 2);
					}
          scope.hqlHolder = {hql: GumgaSearchHelper.translateArrayToHQL(scope.queries),source: scope.queries};
				});

        scope.$on('clearfilter', (ev,index) => {
          scope.hqlHolder = {};
          scope.queries = [];
        });

        scope.attributes.forEach((value) => {
  				if(value.type == 'array'){
  					value.data = value.data.map((item) => {
  							return item[value.arrayItemContent];
  					})
  				}
  			})

        scope.canISend = (e) =>  {
          if (e.keyCode == 13){
            scope.addQuery(scope.query);
          }
        }

        document.addEventListener('click', (e) => {
          let isElement = 0;
          angular.forEach(e.path, (node) => {
            if (node.nodeName == id.toUpperCase()) isElement++
          });
          if (!isElement) {
            scope.addQuery(scope.query);
            scope.$apply();
          }
        });
			}
    }
  }

  angular.module('gumga.directives.filter', ['gumga.translate.filter.filter'])
  .directive('gumgaFilter', Filter);

})();
