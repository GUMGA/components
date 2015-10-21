(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:gumgaErrors
	 * @restrict E
	 * @description O componente gumgaErrors serve para mostrar todas mensagens de validações do formulário de forma agrupada.
	 *
	 * @param {String} placement Onde irá aparecer, o padrão é top, mas também aceita right, bottom e left.
	 * @param {String} icon Ícone do botão, por padrão é glyphicon glyphicon-info-sign
	 * @param {String} label Texto do botão
	 * @param {String} title Título do popover de erros
	 *
	 * @example
	 *  Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).
	 *  <pre>
	 *    <form name="myForm">
	 *      <input type="number" name="minNumber" ng-model="minNumber" gumga-min-number="20">
	 *      <gumga-errors placement="right" icon="glyphicon glyphicon-info-sign" label="Campos inválidos" title="Campos inválidos"></gumga-errors>
	 *    </form>
	 *  </pre>
	*/
	Errors.$inject = ['$compile'];
  function Errors($compile) {
    return {
      restrict: 'E',
			scope: {
				errors: '='
			},
      require: '^form',
      link: function (scope, elm, attrs, ctrl) {
				scope.errors = [];

				scope.errorsContains = function(errors, error) {
					for (var k in errors) {
						if (angular.equals(errors[k], error)) {
							return k;
						}
					}
					return false;
				}

				scope.addError = function(error) {
					if (!scope.errorsContains(scope.errors, error)) {
						scope.errors.push(error);
					}
				}

				scope.removeError = function(error) {
					// error.valid = !error.valid;
					var errorCopy = angular.copy(error);
					errorCopy.valid = !errorCopy.valid;
					var exist = scope.errorsContains(scope.errors, errorCopy);
					if (exist) {
						scope.errors.splice(exist, 1);
					}
				}
				scope.$on('$errorMessage', function(event, data) {
					if (data.valid == false) {
						scope.addError(data);
					} else {
						scope.removeError(data);
					}
				});

				var title = attrs.title || 'Erros';
				var placement = attrs.placement || 'top';
				var icon = attrs.icon || 'glyphicon glyphicon-info-sign';

				var template = [
					'<button popover-placement="'+placement+'" popover-template="\'template.html\'" popover-title="'+title+'" type="button" class="btn btn-sm btn-danger">'
				,	'<i class="'+icon+'"></i>'
				, attrs.label
				,	'</button>'
				,	'<script id="template.html" type="text/ng-template">'
				,	'<ol class="list-errors text-danger"><li ng-repeat="error in errors" >{{ error.message }}</li></ol>'
				,	'</script>'
				].join("\n");
				elm.append($compile(template)(scope));

      }
    }
  }
	angular.module('gumga.directives.form.errors',['ui.bootstrap'])
	.directive('gumgaErrors',Errors);
})();
