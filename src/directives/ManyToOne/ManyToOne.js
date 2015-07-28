(function(){
    'use strict';

    ManyToOne.$inject = ['$templateCache','GumgaKeyboard','$modal'];
    /*
        TODO[1]: Investigar erro de atraso no input.
        TODO[2]: Arrumar a margin quando não tem authorizeAdd.
     */
    function ManyToOne($templateCache,GumgaKeyboard,$modal){
        $templateCache.put('mtoItem.html',
            '<span bind-html-unsafe="match.label | typeaheadHighlight:query" style="cursor: pointer;"></span>');
        var template ='<div class="full-width-without-padding">';
        template += '   <div class="form-group">';
        template += '       <div ng-class="showFullView() || authorizeAdd ? \'input-group\' : \'\'">';
        // template += '           <input class="form-control"  ng-model="model" type="text" typeahead="$value as $value[field] for $value in searchMethod({param: model})">';
        template += '           <input class="form-control"  ng-model="model" type="text" typeahead="$value as $value[field] for $value in proxySearchMethod()">';
        template += '           <span class="input-group-addon" style="background-color: transparent; padding: 3px 12px;border-left:0" ng-show="showFullView()"> ';
        template += '               <button class="badge" style="background-color: #6ECFFF;border: 0" ng-click="halp(model)" ><i class="glyphicon glyphicon-resize-full"></i></button>';
        template += '           </span>';
        template += '           <span class="input-group-addon" style="padding: 0 0.25%" ng-show="authorizeAdd"> ';
        template += '               <button type="button" style="border: 0;background-color: transparent" ng-click="addNew(model)" ><i class="glyphicon glyphicon-plus"></i></button>';
        template += '           </span>';
        template += '       </div>';
        template += '   </div>';
        template += '</div>';
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
                scope.formCtrl = ctrl;
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
                GumgaKeyboard.bindToElement(elm.find('input')[0],'down',function(){ngModelCtrl.$setViewValue(' ')});

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
                        scope.postMethod({value: text});
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
                    var mi = $modal.open({
                        template: template,
                        size: 'sm',
                        controller: function($scope,$value,$modalInstance){
                            $scope.$value = $value;
                            $scope.back = function(){
                                $modalInstance.dismiss();
                            }
                        },
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
