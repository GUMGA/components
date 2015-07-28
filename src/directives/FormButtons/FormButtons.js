(function(){
	'use strict';
    /**
     * @ngdoc directive
     * @name gumga.core:GumgaFormButtons
     * @deprecated  See {@link $confirmDirty} instead.
     * @restrict EA
     * @element ANY
     * @scope false
     * @description O componente GumgaAlert serve para criar notificações Growl-style, e possui quatro tipos
     * de alertas: Danger, Success, Warning, Info.
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