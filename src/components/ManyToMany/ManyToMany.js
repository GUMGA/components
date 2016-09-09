(function () {
  'use strict';


  ManyToMany.$inject = ['$q', '$compile', '$timeout', '$uibModal']

  function ManyToMany($q, $compile, $timeout, $uibModal) {

    let template = `
    <div class="row">
      <div class="col-md-6 col-xs-6">
        <label ng-hide="ctrl.leftListAux.length > 0">{{ctrl.textLeftEmpty}}</label>
        <label ng-show="ctrl.leftListAux.length > 0" id="textinfoleft"></label>
        <div ng-class="leftsearch && ctrl.leftListAux.length == 0 && ctrl.authorizeAdd ? 'input-group' : ''">
          <input class="form-control input-sm" placeholder="{{ctrl.textLeftPlaceholder}}" ng-change="ctrl.filterLeft(leftsearch)" ng-model="leftsearch"/>
          <div ng-click="ctrl.addNew(leftsearch)" ng-show="leftsearch && ctrl.leftListAux.length == 0 && ctrl.authorizeAdd" class="input-group-addon hover">
            <i class="glyphicon glyphicon-plus"></i>
          </div>
        </div>
        <div class="line-break"></div>
        <div class="panel panel-default">
          <div class="panel-heading ">{{ctrl.textHeadingLeft}}</div>
          <ul class="list-group" style="height: {{ctrl.boxHeight}};max-height:{{ctrl.boxHeight}};overflow: auto;">
            <li class="list-group-item hover" ng-repeat="$value in ctrl.leftListAux track by $index" ng-click="ctrl.removeOrAdd(ctrl.leftListAux, ctrl.rightList, $value, $index, $event)">
              <span name="fieldleft"></span>
            </li>
          </ul>
          <div class="panel-footer hover" style="text-align: center;" ng-click="ctrl.moveAllItems(ctrl.leftListAux, ctrl.rightList, 'right')" ng-disabled="ctrl.leftListAux.length == 0">
            {{ctrl.textMoveallLeft}}
            <span class="glyphicon glyphicon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-6">
        <label ng-hide="ctrl.rightList.length > 0">{{ctrl.textRightEmpty}}</label>
        <label ng-show="ctrl.rightList.length > 0" id="textinforight"></label>
        <input class="form-control input-sm" ng-disabled="!ctrl.rightSearchField" placeholder="{{ctrl.textRightPlaceholder}}" ng-change="ctrl.filterRight(rightsearch)" ng-model="rightsearch"/>
        <div class="line-break"></div>
        <div class="panel panel-default">
          <div class="panel-heading ">{{ctrl.textHeadingRight}}</div>
          <ul class="list-group" ng-cloak style="height: {{ctrl.boxHeight}};max-height:{{ctrl.boxHeight}};overflow: auto;">
            <li class="list-group-item hover" ng-repeat="$value in ctrl.rightAux track by $index" ng-click="ctrl.removeOrAdd(ctrl.rightList, ctrl.leftListAux, $value, $index)">
              <span name="fieldright">{{$value}}</span>
            </li>
          </ul>
          <div class="panel-footer hover" style="text-align: center;" ng-click="ctrl.moveAllItems(ctrl.rightList, ctrl.leftListAux, 'left')" ng-disabled="ctrl.rightAux.length == 0">
            <span class="glyphicon glyphicon-arrow-left"></span> {{ctrl.textMoveallRight}}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" ng-show="ctrl.hasInvalid">
        <p class="alert alert-danger">{{ ctrl.validateMessage }}</p>
      </div>
    </div>`
    controller.$inject = ['$scope', '$element', '$attrs', '$transclude']

    function controller($scope, $element, $attrs, $transclude) {
      let ctrl = this;
      ctrl.fields = {};
      if (!$attrs.authorizeAdd) ctrl.authorizeAdd = true;
      ctrl.modalFields = $attrs.modalFields || '';
      ctrl.boxHeight = $attrs.boxHeight || '298px';
      ctrl.textHeadingLeft = $attrs.textHeadingLeft || 'Available';
      ctrl.textHeadingRight = $attrs.textHeadingRight || 'Selected';
      ctrl.textMoveallLeft = $attrs.textMoveallLeft || 'Move all items';
      ctrl.textMoveallRight = $attrs.textMoveallRight || 'Move all items';
      ctrl.textLeftEmpty = $attrs.textLeftEmpty || 'Empty List';
      ctrl.textRightEmpty = $attrs.textRightEmpty || 'Empty List';
      ctrl.textLeftPlaceholder = $attrs.textLeftPlaceholder || 'Filter';
      ctrl.textRightPlaceholder = $attrs.textRightPlaceholder || 'Filter';
      ctrl.validateMessage = $attrs.validateMessage || 'Invalid item';
      ctrl.hasInvalid = false;
      ctrl.textLeft = $attrs.textLeft || 'Showing {{$value}} {{$value > 1 ? \'items\': \'item\'}}';
      ctrl.textRight = $attrs.textRight || 'Showing {{$value}} {{$value > 1 ? \'items\': \'item\'}}';
      ctrl.rightList = ctrl.rightList || [];
      ctrl.rightAux = angular.copy(ctrl.rightList);
      ctrl.leftList = ctrl.leftList || [];
      ctrl.rightSearchField = $attrs.rightSearchField || null;
      let eventHandler = {
        listChange: ($attrs.onListChange ? ctrl.onListChange : angular.noop),
        validateItem: ($attrs.validateItem ? ctrl.validateItem : () => { return true }),
        newValueAdded: ($attrs.onNewValueAdded ? ctrl.onNewValueAdded : angular.noop),
        valueVisualizationOpened: ($attrs.onValueVisualizationOpened ? ctrl.onValueVisualizationOpened : angular.noop),
        valueVisualizationClosed: ($attrs.onValueVisualizationClosed ? ctrl.onValueVisualizationClosed : angular.noop)
      };

      ctrl.filterLeft = function (q) {
        ctrl.leftSearch({ param: q });
      }

      $scope.$watch('ctrl.leftList', function (data) {
        replaceLabels();
        ctrl.removeDuplicates();
      })

      $scope.$watch('ctrl.rightList', function (data) {
        ctrl.rightAux = angular.copy(ctrl.rightList);
        replaceLabels();
      }, true)

      ctrl.filterRight = function (param) {
        if (ctrl.rightSearchField) ctrl.rightAux = ctrl.rightList.filter(obj => obj[ctrl.rightSearchField].toLowerCase().indexOf(param.toLowerCase()) > -1);
        ctrl.removeDuplicates();
        replaceLabels();
      }

      ctrl.moveAllItems = function (fromList, toList, position) {
        let validList = fromList.filter(value => {
          return eventHandler.validateItem({ value: value })
        })
        if (fromList.length > validList.length) ctrl.hasInvalid = true;
        if (position == "left") ctrl.leftList = toList.concat(validList);
        if (position == "right") ctrl.rightList = toList.concat(validList);
        fromList.splice(0, fromList.length);
        ctrl.rightAux = angular.copy(ctrl.rightList);
        if (position == "right") ctrl.filterLeft('');
        ctrl.removeDuplicates();
        replaceLabels();
        $scope.rightsearch = '';
        $scope.leftsearch = '';
      }

      function replaceLabels() {
        let replaceLeft = '<span name="fieldleft"><span >'.concat(ctrl.fields.left).concat('</span><i ng-click="ctrl.openModal($event, $value)" class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
        let replaceRight = '<span name="fieldright"><span>'.concat(ctrl.fields.right).concat('</span><i ng-click="ctrl.openModal($event, $value)" class="pull-right glyphicon glyphicon-exclamation-sign hover-icon-blue"></i></span>');
        $timeout(() => {
          [].slice.call(document.getElementsByName('fieldleft')).forEach((label, index) => {
            angular.element(label).replaceWith($compile(replaceLeft)(angular.element(label).scope()));
          });
          [].slice.call(document.getElementsByName('fieldright')).forEach((div, index) => {
            angular.element(div).replaceWith($compile(replaceRight)(angular.element(div).scope()));
          });
        })
      }

      function hasKeyInModalFields(key) {
        return ctrl.modalFields.replace(/\s/g, '').split(',').filter(obj => {
          return obj == key;
        }).length > 0;
      }

      ctrl.openModal = function (event, obj) {
        event.stopImmediatePropagation();
        ctrl.template =
        '<div class="modal-body">\n';
        for (var key in obj) if (obj.hasOwnProperty(key) && key != '$$hashKey' && key != 'oi' && key != 'version') {
          if (hasKeyInModalFields(key) || !ctrl.modalFields) {
            ctrl.template += '  <div class="form-group">\n';
            ctrl.template += '    <label><small>' + key + '</small></label>\n';
            ctrl.template += '    <input type="text" ng-model="$value.' + key + '" disabled class="form-control"/>\n';
            ctrl.template += '  </div>\n';
          }
        }
        ctrl.template += '   <div class="modal-footer">\n';
        ctrl.template += '       <button type="button" class="btn btn-warning" ng-click="back()">Back</button>\n';
        ctrl.template += '   </div>\n';
        ctrl.template += '</div>\n';

        eventHandler.valueVisualizationOpened();
        var mi = $uibModal.open({
          template: ctrl.template,
          size: 'sm',
          controller: ['$scope', '$value', '$uibModalInstance', function ($scope, $value, $uibModalInstance) {
            $scope.$value = $value;
            $scope.back = function () {
              $uibModalInstance.close();
            }
          }],
          resolve: {
            $value: function () {
              return obj;
            }
          }
        });

        mi.result.then(function () {
          eventHandler.valueVisualizationClosed();
        })
      }
      ctrl.removeOrAdd = function (removeFrom, addTo, value, index, event) {
        if (eventHandler.validateItem({ value: value })) {
          removeFrom.splice(index, 1);
          addTo.push(value);
          replaceLabels();
          ctrl.removeDuplicates();
          ctrl.rightAux = angular.copy(ctrl.rightList);
          $scope.rightsearch = '';
          eventHandler.listChange({ value: value });
        } else {
          event.target.classList.toggle('invalid')
          setTimeout(() => {
            event.target.classList.toggle('invalid')
          }, 1000)
          ctrl.hasInvalid = true;
        }
      }

      ctrl.addNew = function (value) {
        $scope.leftsearch = '';
        ctrl.postMethod({ value: value });
        ctrl.filterLeft('');
        eventHandler.newValueAdded();
      }

      function checkErrors() {
        let errorTexts = [];
        if (!ctrl.fields.left || !ctrl.fields.right) {
          errorTexts.push('You have\'nt provided the content to GumgaManyToMany directive.');
        }
        if (!$attrs.leftSearch) errorTexts.push('You need to enter the parameter left-search.');
        if (!$attrs.rightList) errorTexts.push('You need to enter the parameter right-list.');
        errorTexts.forEach(function (txt) {
          console.error(txt);
        });
      }

      const hasObjectInRight = obj => (ctrl.rightList.filter(rightObject => angular.equals(rightObject, obj)).length > 0);


      ctrl.removeDuplicates = function () {
        ctrl.leftListAux = ctrl.leftList.filter(obj => !hasObjectInRight(obj))
      }

      $transclude($scope, cloneEl => {
        angular.forEach(cloneEl, cl => {
          let element = angular.element(cl)[0];
          switch (element.nodeName) {
            case 'LEFT-FIELD': ctrl.fields.left = element.innerHTML;
              break;
            case 'RIGHT-FIELD': ctrl.fields.right = element.innerHTML;
              break;
          }
        });
      })

      function escapeRegExp(str) {
				    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      }

      function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
      }

      $timeout(() => {
        let elementLeft = angular.element(document.getElementById('textinfoleft'));
        elementLeft.replaceWith($compile('<label ng-show="ctrl.leftListAux.length > 0">' + replaceAll(ctrl.textLeft, '$value', 'ctrl.leftListAux.length') + '</label>')(elementLeft.scope()));
        let elementRight = angular.element(document.getElementById('textinforight'));
        elementRight.replaceWith($compile('<label ng-show="ctrl.rightList.length > 0">' + replaceAll(ctrl.textRight, '$value', 'ctrl.rightAux.length') + '</label>')(elementRight.scope()));
      })

      checkErrors();
      replaceLabels();
      ctrl.filterLeft('');
    }

    return {
      restrict: 'E',
      scope: {
        rightList: '=rightList',
        leftList: '=leftList',
        leftSearch: '&leftSearch',
        rightSearch: '&rightSearch',
        postMethod: '&',
        validateItem: '&?',
        onListChange: '&?',
        onNewValueAdded: '&?',
        onValueVisualizationOpened: '&?',
        onValueVisualizationClosed: '&?',
        authorizeAdd: '=?'
      },
      bindToController: true,
      transclude: true,
      controllerAs: 'ctrl',
      controller,
      template
    }
  }


  angular.module('gumga.manytomany', ['ui.bootstrap'])
    .directive('gumgaManyToMany', ManyToMany)
})();
