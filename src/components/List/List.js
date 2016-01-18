(function(){

  List.$inject = ['$compile', 'listCreator']

  function List($compile, listCreator){

    controller.$inject = ['$scope', '$element', '$attrs']

    function controller($scope, $element, $attrs){
      let ctrl = this

      const errorMessages = {
        noData: 'O componente gumgaList necessita de um atributo data, que irá conter os dados que serão visualizados.',
        noConfig: 'O componente gumgaList necessita de um atributo config, que irá conter a configuração necessária.',
        noColumns:  'O componente gumgaList necessita que, no objeto de configuração, exista um atributo columns.'
      }

      // Funções utilitárias e configurações default.
      const hasAttr             = string  => !!$attrs[string],
            hasConfig           = string  => !!(ctrl.config && ctrl.config[string]),
            defaultCssClass     = 'table ',
            defaultSelection    = 'single',
            defaultItemsPerPage = [],
            defaultSortedColumn = null

      function guaranteeColumns(columns = ' ', columnsConfig = []){
        return columns.split(',').map(rawColumn => {
          let column        = rawColumn.trim(),
              configuration = columnsConfig.filter(value => value.name == column)[0] || { name: column},
              title         = configuration.title       || (column.charAt(0).toUpperCase() + column.slice(1)),
              size          = configuration.size        ||  ' ',
              name          = configuration.name        ||  column,
              content       = configuration.content     ||  '{{$value.' + column + '}}',
              sortField     = configuration.sortField   ||  null,
              conditional   = configuration.conditional || angular.noop
          return { title, size, name, content, sortField, conditional }
        })
      }

      // Garantindo que existam todos os atributos que podem ser passados via elemento.
      ctrl.data           = ctrl.data   || []
      ctrl.config         = ctrl.config || {}
      ctrl.sort           = hasAttr('sort')           ? ctrl.sort                                   : angular.noop
      ctrl.class          = hasAttr('class')          ? defaultCssClass.concat($attrs.class || ' ') : defaultCssClass
      ctrl.onClick        = hasAttr('onClick')        ? ctrl.onClick                                : angular.noop
      ctrl.onDoubleClick  = hasAttr('onDoubleClick')  ? ctrl.onDoubleClick                          : angular.noop
      ctrl.onSort         = hasAttr('onSort')         ? ctrl.onSort                                 : angular.noop

      // Garantindo que existam todas as configurações necessárias no objeto.
      ctrl.config.checkbox      = !!ctrl.config.checkbox
      ctrl.config.selection     = hasConfig('selection')      ? ctrl.config.selection         : defaultSelection
      ctrl.config.itemsPerPage  = hasConfig('itemsPerPage')   ? ctrl.config.itemsPerPage      : defaultItemsPerPage
      ctrl.config.sortDefault   = hasConfig('sortDefault')    ? ctrl.config.sortDefault       : defaultSortedColumn
      ctrl.config.conditional   = hasConfig('conditional')    ? ctrl.config.conditional       : angular.noop
      ctrl.config.columnsConfig = guaranteeColumns(ctrl.config.columns, ctrl.config.columnsConfig)

      // Tratamento de erros do componente.
      if(!hasAttr('data'))           console.error(errorMessages.noData)
      if(!hasAttr('configuration'))  console.error(errorMessages.noConfig)
      if(!hasConfig('columns'))      console.error(errorMessages.noColumns)
      // Variáveis e funções utilizadas pelo componente durante tempo de execução.
      ctrl.selectedValues       = []
      ctrl.selectedMap          = {}
      ctrl.activeSorted         = { column: null, direction: null }

      ctrl.conditional          = conditional
      ctrl.conditionalTableCell = conditionalTableCell

      ctrl.doSort               = doSort
      ctrl.doubleClick          = doubleClick
      ctrl.select               = select
      ctrl.selectAll            = selectAll

      if(ctrl.config.sortDefault != null) ctrl.doSort(ctrl.config.sortDefault)

      $scope.$parent.selectedValues = ctrl.selectedValues

      $scope.$watch('ctrl.data', () => updateMap(ctrl.data), true)

      $scope.$watch('ctrl.selectedValues', (newVal = [], oldVal = []) => updateSelected(newVal, newVal.length - oldVal.length >= 0, oldVal), true)

      function findEqualInMap(obj = {}){
        const auxObj = ctrl.selectedMap
        for(var key in auxObj) if(auxObj.hasOwnProperty(key) && angular.equals(obj, auxObj[key].value)) return auxObj[key]
        return false
      }

      function findEqualInSelected(obj = {}) {
        return ctrl.selectedValues.filter(val => angular.equals(obj.value, val)).length == 0
      }

      function updateMap(newVal = []){
        ctrl.selectedMap = {};
        newVal.forEach((value, index) => (ctrl.selectedMap[index] = { checkbox: false, value }))
        updateSelectedValues()
      }

      function updateSelected(selectedValues, wasAdded, oldSelectedValues){
        if(selectedValues.length > 1 && ctrl.config.selection == 'single'){
          selectedValues = selectedValues.filter(value => !angular.equals(oldSelectedValues[0], value))
          uncheckSelectedMap()
        }
        if(wasAdded){
          selectedValues.forEach(val => {
            const mapObject = findEqualInMap(val)
            if (mapObject && !mapObject.checkbox) mapObject.checkbox = true
          })
        } else {
          Object.keys(ctrl.selectedMap).forEach(value => {
            if(ctrl.selectedMap[value].checkbox && findEqualInSelected(ctrl.selectedMap[value]))
              ctrl.selectedMap[value].checkbox = false
          })
        }
        updateSelectedValues()
      }

      function updateSelectedValues(){
        let selected  = Object.keys(ctrl.selectedMap)
                          .filter(val => ctrl.selectedMap[val].checkbox)
                          .map(val => ctrl.selectedMap[val].value)
        $scope.$parent.selectedValues = selected
        ctrl.selectedValues           = selected
      }

      function uncheckSelectedMap(){
        Object.keys(ctrl.selectedMap).forEach(value => {
          if(ctrl.selectedMap[value].checkbox)  ctrl.selectedMap[value].checkbox = !ctrl.selectedMap[value].checkbox
        })
      }

      function conditional(value){
        let obj = ctrl.config.conditional(value);
        let trueValue, falseValue
        for(let key in obj){
          obj[key] === true ? trueValue = key : falseValue = key
        }

        if(trueValue) return '\"'.concat(trueValue).concat('\"')
        return '\'\''
      }


      function conditionalTableCell(value,ordering){
        let columnToGetTheConditional = ctrl.config.columnsConfig.filter(val => val.name == ordering)[0]

        if(columnToGetTheConditional){
          let obj = columnToGetTheConditional.conditional(value), trueValue, falseValue

          for(var key in obj){
            if(obj[key] === true){
              trueValue = key
            } else {
              falseValue = key
            }
          }
          return '\"'.concat(trueValue).concat('\"')
        }
        return '\'\''
      }

      function doSort(sortField){
        ctrl.activeSorted.column = sortField
        ctrl.activeSorted.direction = ctrl.activeSorted.direction == 'asc' ? 'desc' : 'asc'
        ctrl.sort({field: ctrl.activeSorted.column, dir: ctrl.activeSorted.direction})
        ctrl.onSort({field: ctrl.activeSorted.column, dir: ctrl.activeSorted.direction})
      }

      function doubleClick($value){
        ctrl.onDoubleClick({ $value })
      }

      function select(index, event = { target: {} }){
        ctrl.onClick({ $value: ctrl.selectedMap[index].value })
        if(event.target.name == '$checkbox' && ctrl.config.selection == 'single') uncheckSelectedMap()
        if(event.target.name == '$checkbox' && ctrl.config.selection == 'multi') ctrl.selectedMap[index].checkbox = !ctrl.selectedMap[index].checkbox
        if(ctrl.checkAll) ctrl.checkAll = false
        if(ctrl.config.selection == 'single' && !ctrl.selectedMap[index].checkbox) uncheckSelectedMap()
        ctrl.selectedMap[index].checkbox = !ctrl.selectedMap[index].checkbox
        updateSelectedValues()
      }

      function selectAll(boolean){
        Object.keys(ctrl.selectedMap).forEach(value => ctrl.selectedMap[value].checkbox = boolean)
        updateSelectedValues()
      }

      // Compilação do componente na tela.
      try {
        const element = angular.element(listCreator.mountTable(ctrl.config, ctrl.class))
        $element.append($compile(element)($scope))
      } catch(err){}

    }

    return {
      restrict: 'E',
      scope: {
        'sort': '&?',
        'data': '=',
        'selectedValues': '=?',
        'onClick': '&?',
        'onDoubleClick': '&?',
        'onSort': '&?',
        'config': '=configuration'
      },
      bindToController: true,
      controllerAs: 'ctrl',
      controller
    }
  }

  angular.module('gumga.list', ['gumga.list.creator'])
    .directive('gumgaList', List)

})()
