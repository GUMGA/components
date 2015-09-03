(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name gumga.core:gumgaPassword
     * @restrict E
     * @deion
     * A directive gumgaPassword é usada para adicionar ao formulário, um campo de senha com algumas validações que podem ser configuradas.
     * também podendo escolher se irá utilizar confirmação de senha ou não
     * @param {String} value - Parâmetro obrigatório que irá conter uma variável para armazenar o valor digitado pelo usuário.
     * @param {boolean} containsNumbers - Parâmetro não obrigatório para fazer com que a senha possua números.
     * @param {boolean} containsUppercase - Parâmetro não obrigatório para fazer com que a senha possua caracteres maiúsculos.
     * @param {boolean} containsSymbols - Parâmetro não obrigatório para fazer com que a senha possua caracteres especiais.
     * @param {boolean} confirmation - Parâmetro não obrigatório que cria ou não a confirmação de senha.
     * @param {number} valueMinLength - Parâmetro não obrigatório para exigir um tamanho mínimo.
     * @param {number} valueMaxLength - Parâmetro não obrigatório para exigir um tamanho máximo.
     */

    Password.$inject = [];
    function Password() {
        return{
            restrict: 'E',
            require: '^form',
            scope: {
                value: '=',
                containsNumbers: '=',
                containsUppercase: '=',
                containsSymbols: '=',
                confirmation: '=',
                valueMinLength: '=',
                valueMaxLength: '='
            },
            template: '<div class="form-group has-{{status}} has-feedback">'
                    + ' <label>Password</label>'
                    + ' <input type="password" name="password" required="true" class="form-control" ng-model="value"/>'
                    + ' <span class="glyphicon {{status===\'error\' ? \'glyphicon-remove\' : \'glyphicon-ok\'}} form-control-feedback" aria-hidden="true"></span>'
                    + '</div>'
                    + '<div ng-show="confirmation" class="form-group has-{{statusConfirm}} has-feedback">'
                    + ' <label>Confirm Password</label>'
                    + ' <input type="password" name="ConfirmPassword" required="{{requiredConfirm}}" class="form-control" ng-change="validateConfirm(confirm)" ng-model="confirm"/>'
                    + ' <span class="glyphicon {{statusConfirm===\'error\' ? \'glyphicon-remove\' : \'glyphicon-ok\'}} form-control-feedback" aria-hidden="true"></span>'
                    + '</div>',
            link: function (scope, elem, attrs,form){
                scope.requiredConfirm = false;
                scope.status = 'error';
                scope.statusConfirm = 'error';
                if (!scope.valueRequired && typeof scope.valueRequired != "boolean") {
                    scope.valueRequired = false;
                }
                if (!scope.containsNumbers && typeof scope.containsNumbers != "boolean") {
                    scope.containsNumbers = false;
                }
                if(!scope.containsUppercase && typeof scope.containsUppercase != "boolean"){
                    scope.containsUppercase = false;
                }
                if(!scope.containsSymbols && typeof scope.containsSymbols != "boolean"){
                    scope.containsSymbols = false;
                }
                if(!scope.confirmation && typeof scope.confirmation != "boolean"){
                    scope.confirmation = false;
                }
                if(!scope.valueMinLength && typeof scope.valueMinLength != "number"){
                    scope.valueMinLength = 3;
                }
                if(!scope.valueMaxLength && typeof scope.valueMaxLength != "number"){
                    scope.valueMaxLength = 10;
                }
                if(scope.valueMinLength >= scope.valueMaxLength){
                    throw 'O tamanho mínimo da senha tem que ser menor que o valor máximo.';
                }
                if(scope.confirmation){
                    scope.requiredConfirm = true;
                }

                scope.$watch('value', function (data){
                    scope.validate(data);
                });


                scope.validate = function (str) {
                  console.log()
                    if(str && isNumeric(str, scope.containsNumbers) && isSymbols(str,scope.containsSymbols) && isUpperCase(str,scope.containsUppercase) && str.length >= scope.valueMinLength &&str.length <=scope.valueMaxLength) {
                        scope.status = 'success'
                        delete form.$error.pattern;
                    }else{
                        form.$error.pattern = true
                        scope.status = 'error';
                    }
                };
                scope.validateConfirm = function (str) {
                    if(scope.confirmation){
                        str && str === scope.value && scope.status==='success' ? scope.statusConfirm = 'success' : scope.statusConfirm = 'error';
                    }
                };
            }
        };
    }

    function isNumeric(str, bln) {
        if (bln) {
            return /\d/.test(str)
        }
        return true;
    }

    function isUpperCase(char, bln) {
        if (bln) {
            return /[A-Z]/.test(char);
        }
        return true;
    }

    function isSymbols(str,bln){
        if(bln){
            return /[!@#$%^&*()_+=\[{\]};:<>|./?,-]/.test(str);
        }
        return true;
    }

    angular.module('gumga.directives.password', [])
            .directive('gumgaPassword', Password);
})();
