(function(){
	'use strict';
    /**
     * @ngdoc directive
     * @name gumga.core:gumgaFormButtons
     * @restrict E
     * @description O componente gumgaFormButtons pode ser utilizado para quando necessite de botões para o formulário,
     * tanto de continuar inserindo, de salvar e retroceder.
     *
     *  @param {Function} submit Parâmetro obrigatório que contém uma função que será executada quando o botão de continuar for clicado.
     *  @param {boolean} valid Parâmetro obrigatório que irá conter um valor booleano para validar caso o formulário é válido para liberar o botão de salvar.
     *  @param {Object} continue Object que deverá conter um atributo booleano chamado `value`, para controlar caso continuará inserindo ou não. Essa 
     *  opção aparecerá apenas quando o objeto $stateParams(pertencente ao ui-router) não possuir um id, ou seja, caso esteja numa tela de inserção.
     *  @param {boolean} confirm-dirty Parâmetro não obrigatório que irá conter um booleano para indicar caso deseje ter uma confirmação de saída do formulário
     *  quando este foi alterado alguma vez.
     */
	FormButtons.$inject = ['$state','$stateParams','$modal','$rootScope'];
    function FormButtons($state, $stateParams,$modal,$rootScope) {
        return {
            restrict: 'E',
            scope: {
                do: '&submit',
                valid: '=',
                continue: '=?',
                confirmDirty: '=?'
            },
            template:
            '<div class="full-width-without-margin">'+
            '   <scope></scope>'+
            '   <div ng-class="getPosition()">' +
            '       <label id="continuarInserindo" ng-if="continue" >'+
            '           <input type="checkbox" name="continuar" ng-model="continue.value"/>' +
            '           <span>Continuar Inserindo</span>'+
            '       </label>' +
            '       <button class="btn btn-warning" style="margin-right: 0.8em" ng-click="back()" type="button"><i class="glyphicon glyphicon-floppy-remove"></i> Back</button>' +
            '       <button class="btn btn-primary" style="margin-right: 0" ng-click="do()" ng-disabled="!valid" type="button"><i class="glyphicon glyphicon-floppy-saved"></i> Save</button>' +
            '   </div>'+
            '<div>',
            require: '^form',
            link: function (scope, elm, attrs, ctrl) {
                if(!attrs.confirDirty) scope.confirmDirty = true;
                if(!$stateParams.id) scope.inNew = true;
                if(!attrs.continue) scope.continue = false;

                scope.getPosition = function () {
                    if (attrs.position == 'left') {
                        return 'pull-left';
                    }
                    return 'pull-right';
                };

                scope.back = function () {
                    if(scope.confirmDirty && ctrl.$dirty){
                        var modal = $modal.open({
                            template:
                            '<div>'+
                            '   <section class="modal-body">' +
                            '       <h4>Deseja sair sem salvar as alterações?</h4>' +
                            '   </section>'+
                            '   <div class="modal-footer">'+
                            '       <button class="btn btn-default" ng-click="handleClose(false)">Não</button>' +
                            '       <button class="btn btn-default" ng-click="handleClose(true)">Sim</button>' +
                            '   </div>'+
                            '</div>',
                            backdrop: false,
                            keyboard: false,
                            size: 'sm',
                            controller: function($scope,$modalInstance,$state,$rootScope){
                                $scope.handleClose = function(_boolean){
                                    _boolean ? $modalInstance.close(true) : $modalInstance.close(false);
                                };  
                                if($state){
                                    $scope.currentState =$state.current.name;
                                    $rootScope.$on('$stateChangeStart',
                                        function(event, toState, toParams, fromState, fromParams){
                                            $modalInstance.dismiss();
                                        })
                                }
                            }
                        });
                        modal.result.then(function(shouldIGo){
                            if(shouldIGo){
                                $state.go(attrs.back);
                                return 0;
                            }
                        })
                        } else {
                            $state.go(attrs.back);
                        }
                };

            }
        } 
    }

angular.module('gumga.directives.formbuttons',['ui.bootstrap','ui.router'])
.directive('gumgaFormButtons',FormButtons);

})();