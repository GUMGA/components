(function(){
    'use strict';

    ManyToOne.$inject = ['$templateCache','GumgaKeyboard','$uibModal', '$compile'];

    function ManyToOne($templateCache, GumgaKeyboard, $uibModal, $compile){
        controller.$inject = ['$scope', '$element', '$attrs'];

        function controller($scope, $element, $attrs){
          let manyToOneCtrl = this,
              ngModelCtrl;

          const ERR_MSGS = {
            noValue: 'É necessário um atributo value no componente gumgaManyToOne',
            noField: 'É necessário um atributo field no componente gumgaManyToOne',
            noSearch: 'É necessário uma função de busca no componente gumgaManyToOne'
          }

          const possibleAttributes  = ['value', 'list', 'searchMethod', 'field', 'onNewValueAdded', 'onValueVisualizationOpened', 'onValueVisualizationClosed']

          const getFunctionName = string => string.split('').slice(0, string.indexOf('(')).join('')
          const getFirstParameter = string => {
            let onlyParams = string.split('').slice(string.indexOf('('), string.length).join('')
            return onlyParams.split('').slice(1, onlyParams.indexOf(',')).join('')
          }

          const getSecondParameter = string => {
            let onlyParams = string.split('').slice(string.indexOf('('), string.length).join('')
            return onlyParams.split('').slice(onlyParams.indexOf(',') +1, onlyParams.length -1).join('')
          }

          if(!$attrs.value)        console.error(ERR_MSGS.noValue)
          if(!$attrs.field)        console.error(ERR_MSGS.noField)
          if(!$attrs.searchMethod) console.error(ERR_MSGS.noSearch)
          try {
            manyToOneCtrl.valueFromTypeahead            = $scope.$eval($attrs.value)                                 || ''
            manyToOneCtrl.list                          = $scope.$eval($attrs.list)                                  || []
            manyToOneCtrl.searchMethod                  = $scope.$eval(getFunctionName($attrs.searchMethod))         || angular.noop
            manyToOneCtrl.postMethod                    = $scope.$eval(getFunctionName($attrs.postMethod))           || undefined
            manyToOneCtrl.ev                            = {}
            manyToOneCtrl.ev.onNewValueAdded            = $scope.$eval(getFunctionName($attrs.onNewValueAdded))      || angular.noop
            manyToOneCtrl.ev.onValueVisualizationOpened = $scope.$eval(getFunctionName($attrs.onValueVisualizationOpened)) || angular.noop
            manyToOneCtrl.ev.onValueVisualizationClosed = $scope.$eval(getFunctionName($attrs.onValueVisualizationClosed)) || angular.noop
          } catch(e){}

          manyToOneCtrl.field                         = $attrs.field                                               || ''
          manyToOneCtrl.modalTitle                    = $attrs.modalTitle                                          || 'Visualizador de Registro'
          manyToOneCtrl.modalFields                   = $attrs.modalFields ? $attrs.modalFields.splice(',')        :  undefined

          function mirrorAttributes(){
            const isOneOfPossibles = attribute => possibleAttributes.filter(value => attribute == value).length > 0
            return Object.keys($attrs.$attr).filter((value) => !isOneOfPossibles(value)).reduce((prev, next) => prev += `${next}="${$attrs[next]}"`, '')
          }

          const attributeValue = (value, manyToOneModel) => {
            let ngModelValue = value.split('.').slice(0, value.split('.').length -1).reduce((prev, next) => prev[next], $scope)
            ngModelValue[value.split('.').slice(-1)] = manyToOneModel
          }

          manyToOneCtrl.displayInfoButton = displayInfoButton
          manyToOneCtrl.displayPlusButton = displayPlusButton
          manyToOneCtrl.openInfo          = openInfo
          manyToOneCtrl.valueToAdd        = ''
          manyToOneCtrl.proxySearch       = (value) => manyToOneCtrl.searchMethod($scope.$eval(getFirstParameter($attrs.searchMethod)), value).then((data) => data)

          manyToOneCtrl.proxySave         = (value) => {
             manyToOneCtrl.postMethod(value, $scope.$eval(getSecondParameter($attrs.postMethod)))
             .then((data) => manyToOneCtrl.valueFromTypeahead = data.data)
          }

          function displayInfoButton(){
            return !(typeof ngModelCtrl.$$rawModelValue === 'string' || ngModelCtrl.$$rawModelValue instanceof String)
          }

          function displayPlusButton(){
            return manyToOneCtrl.postMethod
                && (typeof ngModelCtrl.$$rawModelValue === 'string' || ngModelCtrl.$$rawModelValue instanceof String)
                && ngModelCtrl.$$rawModelValue.length > 0
          }

          function openInfo(object = {}) {
            controller.$inject = ['$scope','$uibModalInstance']

            function controller($scope, $uibModalInstance){
              $scope.close = () => $uibModalInstance.close()
            }

            function mountModalBody(){
              let fields = manyToOneCtrl.modalFields ? manyToOneCtrl.modalFields : Object.keys(object)
              return fields.reduce((prev, next) => {
                return prev += `
                <div class="form-group">
                  ${ (typeof object[next] === 'string' || object[next] instanceof String) ? `<label>${next}</label>` : ' '}
                  ${ (typeof object[next] === 'string' || object[next] instanceof String) ? `<input type="text" class="form-control" value="${object[next]}" disabled />` : ' '}
                </div>`
              }, ' ')
            }
            let template = `
            <div class="modal-header">
              <h3 class="modal-title">${manyToOneCtrl.modalTitle}</h3>
            </div>
            <div class="modal-body">
              ${mountModalBody()}
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="button" ng-click="close()">Retornar</button>
            </div>`

            $uibModal.open({ controller, template })

          }

          let baseTemplate = `
          <div class="full-width-without-padding">
            <div  ng-class="manyToOneCtrl.displayInfoButton() || manyToOneCtrl.displayPlusButton() ? 'input-group' : 'form-group'">
              <input type="text" class="form-control" ng-model="manyToOneCtrl.valueFromTypeahead" uib-typeahead="$value as $value[manyToOneCtrl.field] for $value in manyToOneCtrl.proxySearch($viewValue)" ${mirrorAttributes()}   />
              <div class="input-group-btn">
                <button type="button" class="btn btn-default" ng-show="manyToOneCtrl.displayInfoButton()" ng-click="manyToOneCtrl.openInfo(manyToOneCtrl.valueFromTypeahead)">
                  <span class="glyphicon glyphicon-info-sign"></span>
                </button>
                <button type="button" class="btn btn-default" ng-show="manyToOneCtrl.displayPlusButton()" ng-click="manyToOneCtrl.proxySave(manyToOneCtrl.valueToAdd)">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
          </div>`

          let element = angular.element(baseTemplate),
              input   = element.find('input'),
              form    = $element.parent()

          while(form[0].nodeName != 'FORM') form = form.parent();

          let formController = $scope[form[0].name]
          $element.append($compile(element)($scope))
          ngModelCtrl = input.controller('ngModel')

          formController.$addControl(ngModelCtrl)

          ngModelCtrl.$validators['manyToOne'] = (modelValue, viewValue) => !(typeof modelValue === 'string' || modelValue instanceof String)
          $scope.$watch('manyToOneCtrl.valueFromTypeahead', () => attributeValue($attrs.value, manyToOneCtrl.valueFromTypeahead))
          $scope.$watch(() => ngModelCtrl.$$rawModelValue, () => (manyToOneCtrl.valueToAdd = ngModelCtrl.$$rawModelValue))
        }

        return {
            restrict : 'E',
            scope : false,
            controllerAs: 'manyToOneCtrl',
            bindToController: true,
            controller
        }
    }
        angular.module('gumga.directives.manytoone',['ui.bootstrap','gumga.services.keyboard'])
        .directive('gumgaManyToOne',ManyToOne);
    })();
