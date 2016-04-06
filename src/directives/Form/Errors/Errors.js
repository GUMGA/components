(function(){
	'use strict';

	Errors.$inject = ['$compile'];

	function Errors($compile) {
		return {
			restrict: 'E',
			scope: {
				errors: '=?'
			},
			require: '?^gumgaForm',
			link: (scope, elm, attrs, gumgaFormController) => {
				let title			= attrs.title || 'Erros',
						placement	= attrs.placement || 'bottom';
				scope.errors	= {}

				function hasError(){
					return Object.keys(scope.errors).length > 0;
				}

				function flatObject(obj, newObj, str){
					for(var key in obj) if (obj.hasOwnProperty(key)){
						if(typeof obj[key] == 'object'){
							flatObject(obj[key], newObj, key);
						} else {
							newObj[str.concat(key)] = obj[key];
						}
					}
					return newObj;
				}

				scope.$on('form-changed', (ev,data) => {
					scope.errors = flatObject(gumgaFormController.getFormErrors(), {}, 'main');
					scope.hasError = hasError();
				})

				function hasIcon(){
					if(attrs.noErrorIcon && attrs.icon) return `ng-class="hasError ? '${attrs.icon}' : '${attrs.noErrorIcon}' "`;
					if(!attrs.noErrorIcon && attrs.icon) return `ng-class="hasError ? '${attrs.icon}' : 'glyphicon glyphicon-ok' "`;
					if(attrs.noErrorIcon && !attrs.icon) return `ng-class="hasError ? 'glyphicon glyphicon-info-sign' : '${attrs.noErrorIcon}' "`;
					return `ng-class="hasError ? 'glyphicon glyphicon-info-sign' : 'glyphicon glyphicon-ok' "`;
				}

				let template = `
				<script type="text/ng-template" id="templatePopover.html">
					<ol class="list-errors text-danger">
						<li ng-repeat="(key, value) in errors">{{ value }}</li>
						</ol>
				</script>
				<button popover-placement="${placement}" uib-popover-template="'templatePopover.html'" popover-title="${title}" type="button" ng-class="hasError ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success'">`
        if (attrs.hasOwnProperty('labelHidden')) {
            template += `<i ${hasIcon()}></i>`
        } else {
            template += `<i ${hasIcon()}></i> {{ hasError ? '${ attrs.label ? attrs.label : 'Lista de erros'}' : 'Formulário sem erros' }}`
        }
        template += `</button>`
				elm.append($compile(template)(scope));

			}
		}
	}
	angular.module('gumga.directives.form.errors',['ui.bootstrap'])
	.directive('gumgaErrors',Errors);
})();
