(function(){
	'use strict';

	Notification.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaNotification
	 * @description
	 */
	function Notification($http,$q){
		var token = window.sessionStorage.getItem('token');
		var url = 'http://192.168.25.201:8084/security-api/notifications';
		var eventSource;

		this.getSource = getSource;
		this.newMessages = newMessages;
		this.newMessagesCount = newMessagesCount;
		this.isViewedMessage = isViewedMessage;

		function setUrl(url) {
			url = url;
		}
		function setToken(token) {
			token = token;
		}
		function getSource() {
			if (!token) throw "Informe um token.";
			return new EventSource(url.concat('/source?gumgaToken=' + token));
		}
		function newMessages() {
			getSource().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessages);
				return data.newMessages;
			}, false);
		}
		function newMessagesCount() {
			getSource().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessagesCount);
				return data.newMessagesCount;
			}, false);
		}
		function isViewedMessage(id) {
			if (!token) throw "Informe um token.";
			return $http.get(url.concat('/viewed/?id=' + id + '&gumgaToken=' + token));
		}
	}
	angular.module('gumga.services.notification',[])
	.service('GumgaNotification',Notification);
})();
