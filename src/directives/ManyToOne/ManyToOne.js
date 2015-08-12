(function(){
    'use strict';

    ManyToOne.$inject = ['$templateCache','GumgaKeyboard','$modal'];
    /**
     * @ngdoc directive
     * @name gumga.core:gumgaManyToOne
     * @restrict E
     * @description
     *  A directive gumgaManyToOne pode ser usada para quando o programador precise de um select que filtre uma lista assíncronamente.
     *  Ela também permite adicionar um registro caso a busca retorne uma lista vazia e permite também visualizar os atributos do registro selecionado.
     *  ---
     *  #Exemplo básico de utilização do GumgaManyToOne
     *  O exemplo desse componente pode ser encontrado [aqui](http://embed.plnkr.co/NYL3gItVsWLFcGxt5itz/).
     *
     * @param {Object} value Parâmetro obrigatório que irá conter uma variável que será o registro escolhido na lista.
     * @param {Array} list Parâmetro obrigatório que irá conter uma lista dos registros que foram buscados.
     * @param {Function} search-method Parâmetro obrigatório que irá conter uma função que fará a busca na lista assíncronamente. `search-method="getSearch(param)"`
     * @param {Function} post-method Parâmetro obrigatório que irá conter uma função que dependendo do parâmetro `async`, chamará a função async com o parâmetro
     * `post-method="post(value)"` e caso o parâmetro async não esteja presente ou seja falso, fará um push na lista.
     * @param {String} field Parâmetro obrigatório que irá conter o atributo do registro que está sendo procurado e o que estará na lista.
     * @param {Boolean} authorize-add Parâmetro não obrigatório que irá conter uma variável que possuirá um booleano que irá fazer o controle para mostrar o botão de adicionar um registro caso a busca não
     * tenha retornado nenhum registro
     * @param {Btava veoolean} async Parâmetro não obrigatório que irá dizer caso componente fará um post chamando a função passada ou um push na lista. Por default, o valor é
     * @param {Function} on-new-value-added Parâmetro não obrigatório que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário adicionar um novo valor.
     * @param {Function} on-value-visualization-opened Parâmetro não obrigatório que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver aberto o modal
     * para visualização de dados
     * @param {Function} on-value-visualization-closed Parâmetro não obrigatório que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal
     * para visualização de dados
     */



    function ManyToOne($templateCache,GumgaKeyboard,$modal){
        $templateCache.put('mtoItem.html',
            '<span bind-html-unsafe="match.label | typeaheadHighlight:query" style="cursor: pointer;"></span>');
        var template ='<div class="full-width-without-padding">';
        template += '   <div class="form-group">';
        template += '       <div ng-class="showFullView() || authorizeAdd ? \'input-group\' : \'\'">';
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
