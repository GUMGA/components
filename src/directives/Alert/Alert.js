(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:gumgaAlert
	 * @restrict EA
	 * @element ANY
	 * @description O componente gumgaAlert serve para criar notificações growl-like e é baseada em eventos.
	 * Para o funcionamento da directive, é necessário incluí-la apenas uma vez no seu código html (de preferência no index.html),
	 * para que os listeners sejam adicionados(Atualmente, na nova versão isto não é mais necessário, ver {@link gumga.core:GumgaAlert}). 
	 *
	 * @example
	 * ## Para que o alerta seja realizado, utilize um dos eventos:
	 * <pre>
	 * 	$scope.$emit('dangerMessage',{title: 'Error' ,message: 'Error 404'});
	 * 	$scope.$emit('successMessage',{title: 'Parabéns!' ,message: 'Sua solicitação foi aceita com sucesso!'});
	 *  $scope.$emit('warningMessage',{title: 'Cuidado!' ,message: 'A área que você está entrando é restrita.'});
   * 	$scope.$emit('infoMessage',{title: 'Salvar' ,message: 'Para salvar, entre em contato com o administrador.'});
	 * </pre>
	 *  Para ver um exemplo em funcionamento, clique [aqui](http://embed.plnkr.co/wdlI7U4nQf9kNhGlyCfU/)
	 */
	Alert.$inject = ['$rootScope'];
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
				$rootScope.$on('warningMessage', function (ev, data) {
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