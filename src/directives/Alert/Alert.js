(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:GumgaAlert
	 * @deprecated  See {@link $gumgaAlert} instead.
	 * @restrict EA
	 * @element ANY
	 * @scope false
	 * @description O componente GumgaAlert serve para criar notificações Growl-style, e possui quatro tipos
	 * de alertas: Danger, Success, Warning, Info.
	 */
	Alert.$inject = ['$rootScope'];
	/*
		TODO[1]: Transformar em factory/provider.
	 */
	function Alert($rootScope){
		return {
			restrict: 'EA',
			scope: false,
			compile: function(){
				function notify(icon, title, message, type) {
					$.notify({
						icon: icon,
						title: title,
						message: message
					}, {
						type: type,
						offset: 50,
						timer: 100,
						delay: 3500,
						onShow: $rootScope.$broadcast('onNotificationShow'),
						onClose: $rootScope.$broadcast('onNotificationClose'),
						allow_dismiss: true,
						animate: {
							enter: 'animated bounceInRight',
							exit: 'animated bounceOutRight'
						},
						template: '<div data-notify="container" class="col-xs-9 col-sm-3 alert alert-{0}" role="alert">' +
						'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
						'<span data-notify="icon"></span> ' +
						'<span data-notify="title"><b>{1}</b></span><br> ' +
						'<span data-notify="message">{2}</span>' +
						'</div>'
					});
				}

				$rootScope.$on('dangerMessage', function (ev, data) {
					notify('glyphicon glyphicon-exclamation-sign', data.title, data.message, 'danger');
				});
				$rootScope.$on('successMessage', function (ev, data) {
					notify('glyphicon glyphicon-ok', data.title, data.message, 'success');
				});
				$rootScope.$on('warnigMessage', function (ev, data) {
					notify('glyphicon glyphicon-warning-sign', data.title, data.message, 'warning');
				});
				$rootScope.$on('infoMessage', function (ev, data) {
					notify('glyphicon glyphicon-info-sign', data.title, data.message, 'info');
				});
			}
		}
	}
	angular.module('gumga.directives.alert',[])
	.directive('gumgaAlert',Alert);
})();