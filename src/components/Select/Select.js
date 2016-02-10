(function (){

  Select.$inject = ['$compile', '$q']

  function Select($compile, $q){

    controller.$inject = ['$scope', '$element', '$attrs']

    function controller($scope, $element, $attrs){
      const GET_ERROR = `É necessário passar uma função no parâmetro get. <gumga-select get="foo()"></gumga-select>`,
            NGMODEL_ERROR = `É necessário passar uma variável para o parâmetro ngModel. <gumga-select ng-model="person"></gumga-select>`

      let ctrl                = this,
          supportedAttributes = ['addItem', 'get', 'modalAttributes','modalTemplateUrl', 'ngModel'],
          currentAttributes   = {}

      ctrl.asyncGet            = (value) => $q.when(ctrl.get(value))

      supportedAttributes.forEach(attr => currentAttributes[attr] = !!$attrs[attr])

      if(!currentAttributes.get)     console.error(GET_ERROR)
      if(!currentAttributes.ngModel) console.error(NGMODEL_ERROR)


      mountTemplate()


      function mountTemplate(){
        return `
        <div class="input-group">
        <input type="text" ng-model="$value" uib-typeahead="address for address in getLocation($viewValue)" class="form-control">
          <div class="input-group-btn">

          </div>
        </div>
        `
      }
    }

    let scope = { addItem: '&?', get: '&?', ngModel: '=?' }

    return {
      restrict: 'E',
      bindToController: true,
      controllerAs: 'ctrl',
      scope,
      controller
    }
  }

  angular
    .module('gumga.select', [])
    .directive('gumgaSelect', Select)

})()
