(function(){

  Info.$inject = ['$interpolate', '$uibModal']

  function Info($interpolate, $uibModal){

    return {
      restrict: 'A',
      priority: 1,
      terminal: true,
      scope: false,
      link($scope, $element, $attrs){

        const informationMessage  = $interpolate($attrs.gumgaInfo)($scope)
        const size                = $attrs.size               || 'md'
        const icon                = $attrs.icon               || 'glyphicon glyphicon-info-sign'
        const dismissButton       = $attrs.dismissButton      ? $interpolate($attrs.dismissButton)($scope)      : 'Retornar'
        const dismissButtonClass  = $attrs.dismissButtonClass ? $interpolate($attrs.dismissButtonClass)($scope) : 'btn btn-default'
        const whatToDoWhenClicked = $attrs.ngClick
        
        $element.bind('click', event => {

          const controllerAs = 'ctrl'
          
          let resolve = {
            size(){           return size},
            icon(){         return icon },
            infoMessage(){  return informationMessage },
            dismissBtn(){   return dismissButton },
            dismissClass(){ return dismissButtonClass },
          }
          
          controller.$inject = ['$scope','$uibModalInstance', 'infoMessage', 'dismissBtn', 'dismissClass']

          function controller($scope, $uibModalInstance, infoMessage, dismissBtn, dismissClass){
            let ctrl = this;

            ctrl.size               = size
            ctrl.icon               = icon
            ctrl.message            = infoMessage
            ctrl.dismissButton      = dismissBtn
            ctrl.dismissButtonClass = dismissClass
            ctrl.close              = boolean => boolean ? $uibModalInstance.close() : $uibModalInstance.dismiss()
          }

          let template = `
          <div class="gumga-info modal-body">
            <h3>
              <i class="{{ ::ctrl.icon }}"></i>
              {{ ::ctrl.message }}
            </h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="{{ ::ctrl.dismissButtonClass }}" ng-click="ctrl.close(false)">{{ ::ctrl.dismissButton }}</button>
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

  angular.module('gumga.info', [])
    .directive('gumgaInfo', Info)
})()
