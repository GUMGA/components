(function(){
	'use strict';

	Alert.$inject = []
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaAlert
	 * @description O service GumgaAlert é uma nova versão da directive {@link gumga.core:gumgaAlert} e é utilizado para criar
	 * notificações growl-like. Para utilizar o service, basta incluir GumgaAlert como dependência.
	 * 
	 * *Observação: Para utilização do service no config do módulo, utilizar `GumgaAlertProvider`*
	 *
	 *
	 * ## Métodos
	 *
	 * O service GumgaAlert possui quatro métodos de criação de alerta, porém todos recebem o mesmo parâmetro. Foi optado por criar quatro
	 * métodos diferentes para aumentar a legibilidade.
	 * - createWarningMessage(title,message,options)
	 * - createDangerMessage(title,message,options)
	 * - createSuccessMessage(title,message,options)
	 * - createInfomessage(title,message,options)
	 *
	 *  ### Parâmetros
	 *  - `title`: Uma string que irá conter o título da mensagem que será criada.
	 *  - `message`: Uma string que irá conter o corpo da mensagem que será criada.
	 *  - `options`: Um objeto com opções adicionais para o alerta. Os atributos que podem ser passados para este objeto são:
	 *  	<pre>
	 *   		var config = {
	 *   		 offset: 50, //Tamanho da distância entre o alerta e tela.
	 *   		 timer: 100, //Tempo que irá demorar para a mensagem aparecer após
	 *   		 delay: 3500,
	 *   		 alowDismiss:true,
	 *   		 animationEnter: 'animated bounceInRight',
	 *   		 animationExit: 'animated bounceOutRight'
	 *   		}
	 * 		</pre> *Objeto com os valores padrões do alerta*
	 * 		
	 */
	function Alert(){
		return {
			$get: function(){
				return this;
			},
			__config: {
				warn: {
					icon: 'glyphicon glyphicon-warning-sign',
					type: 'warning'
				},
				danger: {
					icon: 'glyphicon glyphicon-exclamation-sign',
					type: 'danger' 
				},
				success: {
					icon:'glyphicon glyphicon-ok',
					type: 'success'
				},
				info: {
					icon: 'glyphicon glyphicon-info-sign',
					type: 'info'
				}
			},
			_notify: function(type,title,message,options){
				var config = this.__config[type]
				,		offset = options.offset || 50
				,		timer = options.timer || 100
				,		delay = options.delay || 3500
				,		alowDismiss = options.alowDismiss || true
				,		animationEnter = options.animationEnter || 'animated bounceInRight'
				,		animationExit = options.animationExit || 'animated bounceOutRight';
				$.notify({
					icon: config.icon,
					title: title,
					message: message
				},{
					type: type,
					offset: offset,
					timer: timer,
					delay: delay,
					alow_dismiss: alowDismiss,
					animate: {
							enter: animationEnter,
							exit: animationExit
						},
					template: '<div data-notify="container" class="col-xs-9 col-sm-3 alert alert-{0}" role="alert">' +
						'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
						'<span data-notify="icon"></span> ' +
						'<span data-notify="title"><b>{1}</b></span><br> ' +
						'<span data-notify="message">{2}</span>' +
						'</div>'
				})
			},
			createWarningMessage: function(title,message,options){
				if(!options) options = {};
				this._notify('warning',title,message,options);
			},
			createDangerMessage: function(title,message,options){
				if(!options) options = {};
				this._notify('danger',title,message,options);
			},
			createSuccessMessage: function(title,message,options){
				if(!options) options = {};
				this._notify('success',title,message,options);
			},
			createInfoMessage: function(title,message,options){
				if(!options) options = {};
				this._notify('info',title,message,options);
			}
		}
	}

	angular.module('gumga.services.alert',[])
		.provider('GumgaAlert',Alert);
})();