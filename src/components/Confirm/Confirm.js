(function(){

  Confirm.$inject = ['$interpolate', '$uibModal']

  function Confirm($interpolate, $uibModal){

    return {
      restrict: 'A',
      priority: 1,
      terminal: true,
      scope: false,
      link($scope, $element, $attrs){

        const confirmationMessage = $interpolate($attrs.gumgaConfirm)($scope)
        const size                = $attrs.size               || 'md'
        const icon                = $attrs.icon               || 'glyphicon glyphicon-question-sign'
        const dismissButton       = $attrs.dismissButton      ? $interpolate($attrs.dismissButton)($scope)      : 'Retornar'
        const confirmButton       = $attrs.confirmButton      ? $interpolate($attrs.confirmButton)($scope)      : 'Confirmar'
        const confirmButtonClass  = $attrs.confirmButtonClass ? $interpolate($attrs.confirmButtonClass)($scope) : 'btn btn-primary'
        const dismissButtonClass  = $attrs.dismissButtonClass ? $interpolate($attrs.dismissButtonClass)($scope) : 'btn btn-default'
        const whatToDoWhenClicked = $attrs.ngClick
        
        $element.bind('click', event => {

          const controllerAs = 'ctrl'

          let resolve = {
            size(){           return size},
            icon(){           return icon },
            confirmMessage(){ return confirmationMessage },
            dismissBtn(){     return dismissButton },
            confirmBtn(){     return confirmButton },
            dismissClass(){   return dismissButtonClass },
            confirmClass(){   return confirmButtonClass }
          }

          controller.$inject = ['$scope','$uibModalInstance', 'confirmMessage', 'dismissBtn', 'confirmBtn', 'dismissClass', 'confirmClass']

          function controller($scope, $uibModalInstance, confirmMessage, dismissBtn, confirmBtn, dismissClass, confirmClass){
            let ctrl = this;

            ctrl.size               = size
            ctrl.icon               = icon
            ctrl.message            = confirmMessage
            ctrl.dismissButton      = dismissBtn
            ctrl.confirmButton      = confirmBtn
            ctrl.dismissButtonClass = dismissClass
            ctrl.confirmButtonClass = confirmClass
            ctrl.close              = boolean => boolean ? $uibModalInstance.close() : $uibModalInstance.dismiss()
          }

          let template = `
          <div class="gumga-confirm modal-body">
            <h3>
              <i class="{{ ::ctrl.icon }}"></i>
              {{ ::ctrl.message }}
            </h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="{{ ::ctrl.dismissButtonClass }}" ng-click="ctrl.close(false)">{{ ::ctrl.dismissButton }}</button>
            <button type="button" class="{{ ::ctrl.confirmButtonClass }}" ng-click="ctrl.close(true)"> {{ ::ctrl.confirmButton }}</button>
          </div>`


          $uibModal
            .open({ controller, template, size, controllerAs, resolve, backdrop: 'static' })
            .result
            .then(
                  value =>  $scope.$eval(whatToDoWhenClicked),
                  reject => angular.noop
                )
        })
      }
    }
  }

  angular.module('gumga.confirm', [])
    .directive('gumgaConfirm', Confirm)
})()
