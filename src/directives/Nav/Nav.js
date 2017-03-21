(function(){
  'use strict';
  Nav.$inject = ['$state','GumgaWebStorage','$uibModal','$rootScope', '$timeout'];
  function Nav($state, GumgaWebStorage, $uibModal, $rootScope, $timeout) {
    var template = [
      '<nav id="navbar">',
      ' <a href="#" class="navbar-logo">{{title | uppercase}}</a>',
      ' <span class="organization"><small>{{info.organization}}</small></span>',
      ' <div class="navbar-form navbar-left" ng-transclude></div>',
      ' <b class="pull-right">',
      '   <img ng-show="info.picture" class="avatar img-circle" src="{{info.picture}}" />',
      '   <a href ng-blur="hidePanel()" class="status-navbar" ng-click="showPanelNavBar()">',
      '     <small>{{info.name}} &nbsp;&nbsp; <i class="glyphicon glyphicon-triangle-bottom"></i> </small>',
      '   </a>',
      ' </b>',
      ' <span ng-if="multientity" ng-click="treatUrl()" class="glyphicon glyphicon-search btn pull-right"></span>',
      ' <input ng-if="multientity" type="text" id="inputSearch" ng-keyup="submitSearch($event)" ng-model="search" ng-show="inputVisible" class="navbar-input flip-right" placeholder="Search">',
      '</nav>',
      '<div class="nav-panel" ng-show="showPanelNav">',
      ' <div class="panel-body" id="navPanelBody">',
      '   <button ng-repeat="link in navlinks" ng-click="handle(link)" class="btn btn-link"><i class="{{link.glyphicon}}"> </i>{{link.text}} </button>',
      ' </div>',
      '</div>'
    ];

    var modalTemplate = [
      '<div class="modal-header">Change Password</div>',
      '<div class="modal-body change-password">' +
      '   <form name="ModalForm" novalidate>' +
      '   <label> <small>Old Password</small></label>' +
      '   <input type="password" ng-keyup="validPassword(user.newpass, user.oldpass)" ng-focus="oldPasswordInvalid=false" class="form-control" ng-model="user.oldpass" required/>' +
      '   <label class="text-danger" ng-show="oldPasswordInvalid">Esta não é sua senha antiga</label>' +
      '   <label><small> New Password</small></label>' +
      '   <input type="password" class="form-control" ng-keyup="validPassword(user.newpass, user.oldpass)" ng-model="user.newpass" required/>' +
      '   <label class="text-danger" style="width: 100%;"  ng-show="newPasswordInvalid">Por favor insira uma senha diferente da antiga.</label>' +
      '   <label><small> New Password (again)</small></label>' +
      '   <input type="password" class="form-control" ng-keyup="validPasswordConfirm(user.newpass,user.newpasscheck)" ng-model="user.newpasscheck" required/>' +
      '   <label class="text-danger" style="width: 100%;"  ng-show="newPasswordConfirm">Repita a nova senha corretamente.</label>' +
      '</div>',
      '<div class="modal-footer">' +
      '   <button class="btn btn-primary" ng-click="ok(user)" type="submit" ng-disabled="ModalForm.$invalid || !btnEnabled"> Save</button>' +
      '   <button class="btn btn-warning" ng-click="cancel()" type="button"> Cancel</button>' +
      '</div>' +
      '</form>'];
      return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template.join('\n'),
        link: function (scope, el, attrs) {

          var putUrl = attrs.putUrl;
          if(attrs.multiEntity == "true" || !attrs.multiEntity) scope.multientity = true;
          (!scope[attrs.putUrl]) ? putUrl = scope[attrs.putUrl] : angular.noop;
          scope.info = GumgaWebStorage.getSessionStorageItem('user');
          scope.navlinks = [{text: 'Change Password', glyphicon: 'glyphicon glyphicon-user', value: 'pass'}, {text: 'Logout', glyphicon: 'glyphicon glyphicon-log-out', value: 'logout'}];
          scope.inputVisible = false;
          scope.title = attrs.title || '';
          scope.treatUrl = function () {
            scope.inputVisible = !scope.inputVisible;
            $timeout(function () {
              document.getElementById('inputSearch').focus();
            },200);

          };
          scope.$on('close', function () {
            scope.showPanelNav = false;
          });
          scope.showPanelNavBar = function () {
            scope.showPanelNav = !scope.showPanelNav;
          };
          var obj = {};

          scope.submitSearch = function (event) {
            var key_code = event.keyCode;
            if (key_code === 13)
            $state.go('multientity', {'search': scope.search})
          }

          scope.hidePanel = function () {
            $timeout(function () {
              scope.showPanelNav = false;
            }, 200);
          };

          scope.handle = function (link) {
            scope.showPanelNav = !scope.showPanelNav;
            switch (link.value) {
              case 'pass':
              var modalInstance = $uibModal.open({
                template: modalTemplate.join('\n'),
                size: 'sm',
                controller: ['$scope', '$uibModalInstance', '$http', 'GumgaWebStorage',function ($scope, $uibModalInstance, $http, GumgaWebStorage) {
                  var userSession = GumgaWebStorage.getSessionStorageItem('user');
                  $scope.btnEnabled = false;
                  $scope.oldPasswordInvalid = false;
                  $scope.newPasswordConfirm = false;
                  $scope.newPasswordInvalid = false;

                  $scope.validPasswordConfirm = function (password, confimPassword){
                    if(password !== confimPassword){
                      $scope.newPasswordConfirm = true;
                    }else{
                      $scope.newPasswordConfirm = false;
                    }
                    $scope.enabledBtn();
                  }

                  $scope.validPassword = function (password, oldPassword){
                    $scope.user.newpasscheck = '';
                    if(password == oldPassword && password){
                      $scope.newPasswordInvalid = true;
                    }else{
                      $scope.newPasswordInvalid = false;
                    }
                    $scope.enabledBtn();
                  }

                  $scope.enabledBtn = function (){
                    if(!$scope.newPasswordConfirm && !$scope.newPasswordInvalid){
                      $scope.btnEnabled = true;
                    }else{
                      $scope.btnEnabled= false;
                    }
                  }

                  $scope.ok = function (user) {
                    $http.put(attrs.putUrl, {
                      user: userSession.user,
                      password: user.oldpass,
                      newPassword: user.newpass})
                      .then(function (response) {

                        if (response.data.response == 'BAD_PASSWORD') {

                          $scope.oldPasswordInvalid = true;
                        } else if (response.data.response == 'OK') {
                          $scope.$emit('successMessage', {
                            title: 'Senha alterada',
                            message: 'Sua senha foi alterada com sucesso.'
                          })
                          $uibModalInstance.close();
                        } else {
                          $uibModalInstance.close();
                        }
                      });
                    };
                    $scope.cancel = function () {
                      $uibModalInstance.dismiss();
                    };

                  }],
                  resolve: {}
                });
                modalInstance.result.then(function (selectedItem) {
                  scope.selected = selectedItem;
                });
                break;
                case 'logout':
                $state.go(attrs.state);
                break;
              }
            };
            el.find('input')
            .on('keypress', function (k) {
              if (k.keyCode == 13)
              scope.treatUrl()
            });
          }
        };
      }

      angular.module('gumga.directives.nav',['ui.bootstrap'])
      .directive('gumgaNav',Nav)
    })();
