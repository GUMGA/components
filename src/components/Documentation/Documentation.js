(function(){

  Documentation.$inject = ['$interpolate', '$uibModal', 'GumgaRest']

  function Documentation($interpolate, $uibModal, GumgaRest){

    controller.$inject =['$scope', '$element', '$attrs']

    function controller($scope, $element, $attrs) {
      const ctrl                = this
      const parentScope         = $scope.$parent
      const Service             = new GumgaRest(ctrl.apiUrl)
      const confirmButton       = $attrs.confirmButton      ? $attrs.confirmButton      : 'Confirmar'
      const confirmButtonClass  = $attrs.confirmButtonClass ? $attrs.confirmButtonClass : 'btn btn-primary'
      const modalTitle          = $attrs.modalTitle         ? $attrs.modalTitle         : 'Documentação'

      const defineModalTemplate = isEditable => {
        if(isEditable){
          return `
          <div class="modal-header">
            <h4>{{ ::ctrl.title }}</h4>
          </div>
          <div class="modal-body">
            <form novalidate>

              <textarea  class="form-control" style="width: 100%; resize: none;" ng-model="ctrl.message" ng-blur="ctrl.afterEditing(ctrl.message)">
              </textarea>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="{{ ::ctrl.confirmButtonClass }}" ng-click="ctrl.close(ctrl.message)"> {{ ::ctrl.confirmButton }}</button>
          </div>`
        }
        return `
          <div class="modal-header">
            <h4>{{ ::ctrl.title }}</h4>
          </div>
          <div class="modal-body">
            <p>{{ ::ctrl.message }}</p>
          </div>
          `
      }

      ctrl.openModal = _ => {

        const template      = defineModalTemplate(ctrl.canEdit)
        const controllerAs  = 'ctrl'
        const backdrop      = ctrl.canEdit ? 'static' : true
        const size          = 'sm'
        const resolve = {
          value()             { return Service.extend('GET',`/${ctrl.key}`).then(data => data.data) },
          APIURLService()     { return Service },
          Title()             { return ctrl.modalTitle },
          Key()               { return ctrl.key },
          ConfirmButton()     { return confirmButton },
          ConfirmButtonClass(){ return confirmButtonClass }
        }

          controller.$inject = ['$uibModalInstance', 'value', 'APIURLService', 'Title', '$scope', 'Key', 'ConfirmButton', 'ConfirmButtonClass']

          function controller($uibModalInstance, value, APIURLService, Title, $scope, Key,  ConfirmButton, ConfirmButtonClass){
            const ctrl        = this

            ctrl.message            = value.value
            ctrl.title              = Title
            ctrl.confirmButton      = ConfirmButton
            ctrl.confirmButtonClass = ConfirmButtonClass

            ctrl.close  = model => {
              Service.extend('POST','',{ key: Key, value: model })
                .then(
                  _ => $uibModalInstance.close(),
                  _ => $scope.$broadcast(`postFailed`),
                )
            }

          }

        $uibModal.open({ template, resolve, controller, controllerAs, backdrop, size })
      }
    }

    return {
      restrict: 'E',
      scope: {
        canEdit:    '=',
        key:        '@',
        apiUrl:     '@',
        modalTitle: '@?'
      },
      bindToController: true,
      controllerAs: 'ctrl',
      controller,
      template: `
      <a ng-click="ctrl.openModal()">
        <span class="glyphicon glyphicon-info-sign gumga-documentation-info">
        </span>
      </a>
      `
    }
  }

  angular.module('gumga.documentation', [])
    .directive('gumgaDocumentation', Documentation)
})()
