(function(){
    'use strict';

    ManyToOne.$inject = ['$templateCache','GumgaKeyboard','$uibModal', '$compile'];

    function ManyToOne($templateCache, GumgaKeyboard, $uibModal, $compile){
        controller.$inject = ['$scope', '$element', '$attrs'];

        function controller($scope, $element, $attrs){
          let manyToOneCtrl = this

          const ERR_MSGS = {
            noValue: 'É necessário um atributo value no componente gumgaManyToOne',
            noField: 'É necessário um atributo field no componente gumgaManyToOne',
            noSearch: 'É necessário uma função de busca no componente gumgaManyToOne'
          }

          const possibleAttributes  = ['value', 'list', 'searchMethod', 'field', 'onNewValueAdded', 'onValueVisualizationOpened', 'onValueVisualizationClosed']

          const getFunctionName = string => string.split('').slice(0, string.indexOf('(')).join('')

          if(!$attrs.value) console.error(ERR_MSGS.noValue)
          if(!$attrs.field) console.error(ERR_MSGS.noField)
          if(!$attrs.searchMethod) console.error(ERR_MSGS.noSearch)

          try {
            manyToOneCtrl.valueFromTypeahead            = $scope[$attrs.value]                                       || ''
            manyToOneCtrl.list                          = $scope[$attrs.list]                                        || []
            manyToOneCtrl.searchMethod                  = $scope[getFunctionName($attrs.searchMethod)]               || angular.noop
            manyToOneCtrl.postMethod                    = $scope[getFunctionName($attrs.postMethod)]                 || undefined
            manyToOneCtrl.field                         = $attrs.field                                               || ''
            manyToOneCtrl.modalTitle                    = $attrs.modalTitle                                          || 'Visualizador de Registro'
            manyToOneCtrl.modalFields                   = $attrs.modalFields ? $attrs.modalFields.splice(',')        :  undefined
            manyToOneCtrl.modalButtonLabel              = $attrs.modalButtonLabel                                    || 'Retornar'
            manyToOneCtrl.ev                            = {}
            manyToOneCtrl.ev.onNewValueAdded            = $scope[getFunctionName($attrs.onNewValueAdded)]            || angular.noop
            manyToOneCtrl.ev.onValueVisualizationOpened = $scope[getFunctionName($attrs.onValueVisualizationOpened)] || angular.noop
            manyToOneCtrl.ev.onValueVisualizationClosed = $scope[getFunctionName($attrs.onValueVisualizationClosed)] || angular.noop
          } catch(e){}

          function mirrorAttributes(){
            const isOneOfPossibles = attribute => possibleAttributes.filter(value => attribute == value).length > 0
            return Object.keys($attrs.$attr).filter((value) => !isOneOfPossibles(value)).reduce((prev, next) => prev += `${next}="${$attrs[next]}"`, '')
          }

          manyToOneCtrl.displayInfoButton = displayInfoButton
          manyToOneCtrl.displayPlusButton = displayPlusButton
          manyToOneCtrl.openInfo          = openInfo

          function displayInfoButton(){
            return !(typeof manyToOneCtrl.valueFromTypeahead === 'string' || manyToOneCtrl.valueFromTypeahead instanceof String)
          }

          function displayPlusButton(){
            return manyToOneCtrl.postMethod
                && (typeof manyToOneCtrl.valueFromTypeahead === 'string' || manyToOneCtrl.valueFromTypeahead instanceof String)
                && manyToOneCtrl.valueFromTypeahead.length > 0
          }

          function openInfo(object = {}) {
            controller.$inject = ['$uibModalInstance']

            function controller($uibModalInstance){

            }

            function mountModalBody(){
              let fields = manyToOneCtrl.modalFields ? manyToOneCtrl.modalFields : Object.keys(object)
              return fields.reduce((prev, next) => {
                return prev += `
                <div class="form-group">
                  <label for="exampleInputEmail1">${next}</label>
                  <input type="text" class="form-control" value="${object[next]}" disabled />
                </div>`
              })
            }

            let template = `
            <div class="modal-header">
              <h3 class="modal-title">${manyToOneCtrl.modalTitle}</h3>
            </div>
            <div class="modal-body">
              ${mountModalBody()}
              Selected: <b>{{ selected.item }}</b>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="button" ng-click="ok()">OK</button>
              <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
            </div>`
            $uibModal.open({ controller, template })
          }


          let baseTemplate = `
          <div class="full-width-without-padding">
            <div  ng-class="manyToOneCtrl.displayInfoButton() || manyToOneCtrl.displayPlusButton() ? 'input-group' : 'form-group'">
              <input type="text" class="form-control" name="ManyToOne_{{Math.floor(Math.random() * 1000)}}" ng-model="manyToOneCtrl.valueFromTypeahead" uib-typeahead="$value as $value.description for $value in manyToOneCtrl.searchMethod($viewValue)" ${mirrorAttributes()}   />
              <div class="input-group-btn">
                <button type="button" class="btn btn-default" ng-show="manyToOneCtrl.displayInfoButton()" ng-click="manyToOneCtrl.openInfo(manyToOneCtrl.valueFromTypeahead)">
                  <span class="glyphicon glyphicon-info-sign"></span>
                </button>
                <button type="button" class="btn btn-default" ng-show="manyToOneCtrl.displayPlusButton()" ng-click="manyToOneCtrl.postMethod(manyToOneCtrl.valueFromTypeahead)">
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
          $element.replaceWith($compile(element)($scope))

          formController.$addControl(input.controller('ngModel'))
        }

        return {
            restrict : 'E',
            require: '^form',
            scope : false,
            controllerAs: 'manyToOneCtrl',
            bindToController: true,
            controller

        }
    }
        angular.module('gumga.directives.manytoone',['ui.bootstrap','gumga.services.keyboard'])
        .directive('gumgaManyToOne',ManyToOne);
    })();
    // link: function(scope, elm, attrs, ctrl){

        // var ngModelCtrl = elm.find('input').controller('ngModel'),
        // eventHandler = {
        //     newValueAdded: (attrs.onNewValueAdded ? scope.onNewValueAdded : angular.noop),
        //     valueVisualizationOpened: (attrs.onValueVisualizationOpened ? scope.onValueVisualizationOpened :angular.noop),
        //     valueVisualizationClosed: (attrs.onValueVisualizationClosed ? scope.onValueVisualizationClosed :angular.noop)
        // },
        // async;
        // !attrs.authorizeAdd ? scope.authorizeAdd = true : scope.authorizeAdd = JSON.parse(attrs.authorizeAdd);
        // !attrs.async ? async = true : async = JSON.parse(attrs.async);
        // scope.list = scope.list || [];
        // function checkIfItIsString(string){
        //     return ((typeof string).toUpperCase().trim()) === 'string'.toUpperCase().trim() && string.length > 1;
        // }
        // scope.$watch('model',function(){
        //     checkIfItIsString(scope.model) ?
        //     ctrl.$setValidity('GumgaManyToOne',false) : ctrl.$setValidity('GumgaManyToOne',true);
        // });
        // try {
        //     GumgaKeyboard.bindToElement(elm.find('input')[0],'down',function(){ngModelCtrl.$setViewValue(' ')});
        // } catch(e){
        //
        // }
        //
        // scope.showFullView = function(){
        //     return ((typeof scope.model).toUpperCase().trim()) === 'object'.toUpperCase().trim() && scope.model != undefined;
        // };
        //
        // scope.showPlus = function(){
        //     return (((typeof scope.model).toUpperCase().trim()) === 'string'.toUpperCase().trim() && scope.authorizeAdd === true) ;
        // };
        //
        // scope.proxySearchMethod = function(){
        //   return scope.searchMethod({param: ngModelCtrl.$viewValue});
        // };
        // scope.addNew = function(text){
        //     if(async) {
        //         scope.postMethod({value: text})
        //         .then(function(values){
        //           scope.model = values;
        //         })
        //     } else {
        //         scope.list.push(text);
        //     }
        // };
        // scope.halp = function(obj){
        //     var template = '';
        //     template =
        //     '<div class="modal-body">\n';
        //     for (var key in obj) if (obj.hasOwnProperty(key) && key != '$$hashKey' && key != 'oi' && key != 'version' && key != 'password' && typeof obj[key] != 'object') {
        //         template += '   <div class="form-group">\n';
        //         template += '       <label><small>'+ key +'</small></label>\n';
        //         template += '       <input type="text" ng-model="$value.' + key +'" disabled class="form-control"/>\n';
        //         template += '   </div>\n';
        //     }
        //     template += '   <div class="modal-footer">\n';
        //     template += '       <button type="button" class="btn btn-warning" ng-click="back()">Back</button>\n';
        //     template += '   </div>\n';
        //     template += '</div>\n';
        //     eventHandler.valueVisualizationOpened();
        //     var ManyToOneModalController = function($scope,$value,$modalInstance){
        //         $scope.$value = $value;
        //         $scope.back = function(){
        //             $modalInstance.dismiss();
        //         }
        //     }
        //     ManyToOneModalController.$inject = ['$scope','$value','$modalInstance'];
        //     var mi = $modal.open({
        //         template: template,
        //         size: 'sm',
        //         controller: ManyToOneModalController,
        //         resolve: {
        //             $value: function(){
        //                 return obj;
        //             }
        //         }
        //     });
        //     mi.result.then(function(){
        //         eventHandler.valueVisualizationClosed();
        //     })
        // };
    // }
