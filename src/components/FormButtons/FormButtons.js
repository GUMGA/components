(function(){
	'use strict';
	FormButtons.$inject = ['$state','$stateParams','$uibModal','$interpolate'];

	function FormButtons($state, $stateParams, $uibModal, $interpolate) {
		const template = `
			<div class="row">
				<div class="col-md-12">
					<div ng-class="vm.getPosition()">
						<label for="gumgakeep" ng-if="vm.continue">
							<input type="checkbox" id="gumgakeep" name="gumgakeep" ng-model="vm.shouldContinue" ng-true-value="true" ng-false-value="false" />
							{{::vm.keepInsertingText}}
						</label>
						<button type="button" ng-click="vm.submit()" ng-disabled="!vm.valid" class="btn btn-primary form-buttons-margin" >
							{{::vm.saveText}}
						</button>
						<button type="button" ng-click="vm.returnClicked()" class="btn btn-default form-buttons-margin" ng-class="vm.reverseOrder ? 'pull-left' : 'pull-right'">
							{{::vm.returnText}}
						</button>
					</div>
				</div>
			</div>
		`

		controller.$inject = ['$scope', '$element', '$attrs'];

		function controller($scope, $element, $attrs) {
			let vm = this;
			if(!$attrs.submit) throw 'É necessário passar uma função para submissão de formulário <gumga-form-buttons submit="foo()"></gumga-form-buttons>'

			const modalTemplate= `
				<div class="modal-body">
					<h3> Deseja sair da tela?</h3>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" ng-click="ctrl.dismiss()">Não</button>
					<button type="button" class="btn btn-primary" ng-click="ctrl.close()">Sim</button>
				</div>
			`;

			vm.continue 		 = $scope.$eval(vm.continue);
			vm.confirmDirty		 = $scope.$eval(vm.confirmDirty);
			vm.valid			 = $attrs.valid ? vm.valid : true;
            vm.saveText          = ($attrs.saveText)      ? $interpolate($attrs.saveText)($scope)      : 'Salvar';
            vm.returnText        = ($attrs.returnText)    ? $interpolate($attrs.returnText)($scope)    : 'Cancelar';
            vm.keepInsertingText = ($attrs.keepInsertingText) ? $interpolate($attrs.keepInsertingText)($scope) : 'Continuar Inserindo';
			vm.stateToReturn	 = $attrs.back || ($state.current !== '' ? $state.current.name.split('.')[0].concat('.list') : null);

			vm.getPosition		 = getPosition;
			vm.returnClicked	 =	returnClicked;

			function getPosition() {
				return ($attrs.position == 'left') ? 'pull-left' : 'pull-right';
			}

			function returnClicked(){
				if(vm.confirmDirty){

					ModalController.$inject = ['$modalInstance'];

					function ModalController($uibModalInstance){
						let ctrl = this;

						ctrl.dismiss	= dismiss;
						ctrl.close		=	close;

						function close(){
							$uibModalInstance.close(true);
						}

						function dismiss(){
							$uibModalInstance.close(false);
						}
					}

					$uibModal.open({
						template: modalTemplate,
						animate: false,
						controller: ModalController,
						controllerAs: 'ctrl'
					})
					.result.then((data) => {
						if(data) $state.go(vm.stateToReturn);
					})
				} else {
					 $state.go(vm.stateToReturn);
				}
			}

			$attrs.$observe('continue', value => (vm.continue = $scope.$eval(vm.continue)));
			$attrs.$observe('confirmDirty', value => (vm.confirmDirty = $scope.$eval(vm.confirmDirty)));
			$scope.$on('data-sent', value => {
				if(!vm.shouldContinue) $state.go(vm.stateToReturn);
			});
		}

		return {
			restrict: 'E',
			scope: {
				submit: '&?',
				valid: '=?',
				continue: '@?',
				confirmDirty: '@?',
				reverseOrder: '=?'
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
