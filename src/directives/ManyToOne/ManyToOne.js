(function(){
    'use strict';

    ManyToOne.$inject = ['$templateCache','GumgaKeyboard','$modal'];

    let baseTemplate = `
    <div class="full-width-without-padding">
      <div class="input-group">
        <input type="text" class="form-control" ng-model="valueFromTypeahead" uib-typeahead="$value as $value[field] for $value in proxySearchMethod()"/>
        <div class="input-group-btn">
          <button type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    </div>`

    function ManyToOne($templateCache,GumgaKeyboard,$modal){
        $templateCache.put('mtoItem.html', '<span bind-html-unsafe="match.label | typeaheadHighlight:query" style="cursor: pointer;"></span>');

        let template = `
        <div class="full-width-without-padding">
          <div class="form-group">
            <div ng-class="showFullView() || authorizeAdd ? 'input-group' : ''">

              <span class="input-group-addon" style="background-color: transparent; padding: 3px 12px;border-left:0" ng-show="showFullView()">
                 <button class="text-primary" style="background-color: transparent;border: 0" ng-click="halp(model)" ><i class="glyphicon glyphicon-new-window"></i></button>
              </span>
              <span class="input-group-addon" style="padding: 0 0.25%" ng-show="authorizeAdd">
                <button type="button" style="border: 0;background-color: transparent" ng-click="addNew(model)" ><i class="glyphicon glyphicon-plus"></i></button>
              </span>
            </div>
          </div>
        </div>`

        return {
            restrict : 'E',
            template: template,
            require: '^form',
            scope : {
                model:'=value',
                list: '=',
                searchMethod: '&',
                postMethod: '&addMethod',
                field: '@',
                onNewValueAdded: '&?',
                onValueVisualizationOpened: '&?',
                onValueVisualizationClosed: '&?'
            },
            link: function(scope, elm, attrs,ctrl){
                var ngModelCtrl = elm.find('input').controller('ngModel'),
                eventHandler = {
                    newValueAdded: (attrs.onNewValueAdded ? scope.onNewValueAdded : angular.noop),
                    valueVisualizationOpened: (attrs.onValueVisualizationOpened ? scope.onValueVisualizationOpened :angular.noop),
                    valueVisualizationClosed: (attrs.onValueVisualizationClosed ? scope.onValueVisualizationClosed :angular.noop)
                },
                async;
                !attrs.authorizeAdd ? scope.authorizeAdd = true : scope.authorizeAdd = JSON.parse(attrs.authorizeAdd);
                !attrs.async ? async = true : async = JSON.parse(attrs.async);
                scope.list = scope.list || [];
                function checkIfItIsString(string){
                    return ((typeof string).toUpperCase().trim()) === 'string'.toUpperCase().trim() && string.length > 1;
                }
                scope.$watch('model',function(){
                    checkIfItIsString(scope.model) ?
                    ctrl.$setValidity('GumgaManyToOne',false) : ctrl.$setValidity('GumgaManyToOne',true);
                });
                try {
                    GumgaKeyboard.bindToElement(elm.find('input')[0],'down',function(){ngModelCtrl.$setViewValue(' ')});
                } catch(e){

                }

                scope.showFullView = function(){
                    return ((typeof scope.model).toUpperCase().trim()) === 'object'.toUpperCase().trim() && scope.model != undefined;
                };

                scope.showPlus = function(){
                    return (((typeof scope.model).toUpperCase().trim()) === 'string'.toUpperCase().trim() && scope.authorizeAdd === true) ;
                };

                scope.proxySearchMethod = function(){
                  return scope.searchMethod({param: ngModelCtrl.$viewValue});
                };
                scope.addNew = function(text){
                    if(async) {
                        scope.postMethod({value: text})
                        .then(function(values){
                          scope.model = values;
                        })
                    } else {
                        scope.list.push(text);
                    }
                };
                scope.halp = function(obj){
                    var template = '';
                    template =
                    '<div class="modal-body">\n';
                    for (var key in obj) if (obj.hasOwnProperty(key) && key != '$$hashKey' && key != 'oi' && key != 'version' && key != 'password' && typeof obj[key] != 'object') {
                        template += '   <div class="form-group">\n';
                        template += '       <label><small>'+ key +'</small></label>\n';
                        template += '       <input type="text" ng-model="$value.' + key +'" disabled class="form-control"/>\n';
                        template += '   </div>\n';
                    }
                    template += '   <div class="modal-footer">\n';
                    template += '       <button type="button" class="btn btn-warning" ng-click="back()">Back</button>\n';
                    template += '   </div>\n';
                    template += '</div>\n';
                    eventHandler.valueVisualizationOpened();
                    var ManyToOneModalController = function($scope,$value,$modalInstance){
                        $scope.$value = $value;
                        $scope.back = function(){
                            $modalInstance.dismiss();
                        }
                    }
                    ManyToOneModalController.$inject = ['$scope','$value','$modalInstance'];
                    var mi = $modal.open({
                        template: template,
                        size: 'sm',
                        controller: ManyToOneModalController,
                        resolve: {
                            $value: function(){
                                return obj;
                            }
                        }
                    });
                    mi.result.then(function(){
                        eventHandler.valueVisualizationClosed();
                    })
                };
            }
        }
    }
        angular.module('gumga.directives.manytoone',['ui.bootstrap','gumga.services.keyboard'])
        .directive('gumgaManyToOne',ManyToOne);
    })();
