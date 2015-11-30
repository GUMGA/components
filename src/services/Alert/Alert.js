(function(){
	'use strict';

	Alert.$inject = []
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
					z_index: 1500,
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
