(function(){
	'use strict';
	FormButtons.$inject = ['$state','$stateParams','$modal'];
	function FormButtons($state, $stateParams, $modal) {
		let template = `
			<div class="row">
				<div class="col-md-12">
					<div ng-class="vm.getPosition()">
						<label for="gumgakeep" ng-if="vm.continue">
							<input type="checkbox" id="gumgakeep" name="gumgakeep" ng-model="vm.shouldContinue" />
							{{::vm.keepInserting}}
						</label>
						<button type="button" ng-click="vm.returnClicked()" class="btn btn-default">
							{{::vm.returnText}}
						</button>
						<button type="button" ng-click="vm.continueProxy()" class="btn btn-primary">
							{{::vm.saveText}}
							<i class="glyphicon glyphicon-floppy-disk"></i>
						</button>
					</div>
				</div>
			</div>
		`


		controller.$inject = ['$scope', '$element', '$attrs'];

		function controller($scope, $element, $attrs) {
			let vm = this;
			if(!$attrs.submit) throw 'É necessário passar uma função para submissão de formulário <gumga-form-buttons submit="foo()"></gumga-form-buttons>'

			vm.continue 			= $scope.$eval(vm.continue);
			vm.confirmDirty		= $scope.$eval(vm.confirmDirty);
			vm.returnText			=	$attrs.returnText 				|| 'Retornar';
			vm.saveText				=	$attrs.saveText						|| 'Salvar';
			vm.keepInserting	=	$attrs.keepInsertingText	|| 'Continuar Inserindo';

			vm.getPosition		= getPosition;
			vm.returnClicked	=	returnClicked;

			function getPosition() {
				return ($attrs.position == 'left') ? 'pull-left' : 'pull-right';
			}

			function returnClicked(){
				if(vm.confirmDirty){

				}
			}

			$attrs.$observe('continue', value => (vm.continue = $scope.$eval(vm.continue)));
			$attrs.$observe('confirmDirty', value => (vm.confirmDirty = $scope.$eval(vm.confirmDirty)));
		}

		return {
			restrict: 'E',
			scope: {
				submit: '&',
				valid: '=',
				continue: '@?',
				confirmDirty: '@?'
			},
			controller,
			bindToController: true,
			controllerAs: 'vm',
			template,
			require: 'form'


		}
	}

	angular.module('gumga.formbuttons.directive',['ui.router','ui.bootstrap'])
	.directive('gumgaFormButtons',FormButtons);

})();
