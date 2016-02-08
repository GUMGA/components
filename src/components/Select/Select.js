(function (){

  Select.$inject = ['$compile']

  function Select($compile){

    const restrict          = 'E',
          bindToController  = true,
          controllerAs      = 'ctrl',
          scope             = { addItem: '&?', get: '&?' }



    controller.$inject = ['$scope', '$element', '$attrs']

    function controller($scope, $element, $attrs){
      const hasAttr       = (str) => !!$attrs[str],
            supportedTags = ['addItem', 'get', 'modalAttributes','modalTemplateUrl']

      let ctrl = this








    }

    return { restrict, bindToController, controllerAs, scope, controller }
  }

  angular
    .module('gumga.select', [])
    .directive('gumgaSelect', Select)

})()
